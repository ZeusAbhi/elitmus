import { createContext, ReactNode, useContext, useEffect, useState, } from "react";
import jwt from "jwt-decode";
import { env } from "@/env.mjs"

type User = {
  username: string;
  token: string;
};
type UserProgress = {
  id: number,
  userId: number,
  puzzleNum: number,
  success: boolean,
  startTime: Date,
  endTime: Date | null,
  totalTime: number | null,
  createdAt: Date
}[];

type AuthContextValue = {
  user: User | null;
  userProgress: UserProgress | null;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, password: string) => Promise<void>;
  refetchUserProgress: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  userProgress: null,
  error: null,
  login: async () => { },
  logout: () => { },
  register: async () => { },
  refetchUserProgress: async () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userProgress, setUserProgress] = useState<[] | null>(null)

  /**
   * Pass in the username, password and type of user to login.
   *
   * user object can be accessed from the `useAuth` hook's user property
   */
  const login = async (username: string, password: string) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };
    try {
      await fetch(`${env.NEXT_PUBLIC_BACKENDURL}/users/login`, requestOptions)
        .then((response) => response.json())
        .then((resData) => {
          if (!resData.token) {
            if (resData.error) setError(resData.error);
            else setError("Request Failed, please try again");
          } else if (resData.token) {
            const usr = {
              username: resData.username,
              token: resData.token,
            }
            if (typeof Storage !== "undefined") {
              localStorage.setItem("user", JSON.stringify(usr));
            }
            setUser(usr);
            setError(null);
          } else {
            setError("Request Failed, please try again");
          }
        });
    } catch (err) {
      setError("Request Failed, please try again");
    }
  };

  /**
   * Remove the user object from local storage
   * and update the user object returned from the `useAuth` hook
   */
  const logout = () => {
    if (typeof Storage !== "undefined") {
      localStorage.removeItem("user");
    }
    setUser(null);
  };

  // get data from token
  useEffect(() => {
    if (typeof Storage === "undefined") return;
    if (user) {
      refetchUserProgress();
      return;
    }
    try {
      const user = localStorage.getItem("user");
      if (!user) return;
      const userObj = JSON.parse(user);
      const token = userObj.token;
      const parsedToken: any = jwt(token);
      if (parsedToken.exp < Date.now() / 1000) {
        logout();
        return;
      }
      setUser(userObj);
      // this will also ensure that the token is correct
      refetchUserProgress();
    } catch (err) {
      setError("Your past login data is corrupted, please login again");
      logout();
    }
  }, [user]);



  /**
   * Register a new user.
   *
   * It will also log the user in if the request is successful
   * and update the user object returned from the `useAuth` hook
   */
  const register = async (username: string, password: string) => {
    // TODO: data validation
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };
    try {
      await fetch(`${env.NEXT_PUBLIC_BACKENDURL}/users/register`, requestOptions)
        .then((response) => response.json())
        .then((resData) => {
          if (!resData.token) {
            if (resData.error) setError(resData.error);
            else setError("Request Failed, please try again");
          } else if (resData.token) {
            const usr = {
              username: resData.username,
              token: resData.token,
            }
            setUser(usr);
            if (typeof Storage !== "undefined") {
              localStorage.setItem("user", JSON.stringify(usr));
            }
            setError(null);
          } else {
            setError("Request Failed, please try again");
          }
        });
    } catch (err) {
      setError("Request Failed, please try again");
    }
  };

  /**
  * Update the user's progress from the backend
  * and update the userProgress object returned from the `useAuth` hook
  */
  const refetchUserProgress = async () => {
    if (!user) return;
    await fetch(`${env.NEXT_PUBLIC_BACKENDURL}/users/progress`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      }
    }).then(res => res.json()).then(res => {
      if (res.error) {
        setError(res.error)
        logout()
      } else {
        setUserProgress(res)
      }
    }).catch(_err => {
      setError("Login Failed, please try again");
      logout();
    })
  }

  const authContextValue = {
    user,
    userProgress,
    error,
    login,
    logout,
    register,
    refetchUserProgress
  };

  return (
    <AuthContext.Provider value={authContextValue} >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * example usage: -
  ```
  const { user, error, login, logout, register } = useAuth();
  ```
 * user has the user's data if they are authenticated
 * else it is null. Login, logout and register are functions.
 * If anything has an error(login failed, register failed, etc),
 * the error propery will be updated with the error message
 */
export const useAuth = () => {
  const authContext = useContext(AuthContext);
  return authContext;
};
