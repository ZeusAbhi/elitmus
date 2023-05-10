import { createContext, ReactNode, useContext, useEffect, useState, } from "react";
import jwt from "jwt-decode";
import { env } from "@/env.mjs"

type User = {
  username: string;
  token: string;
};

type AuthContextValue = {
  user: User | null;
  error: string | null;
  login: (username: string, password: string) => void;
  logout: () => void;
  register: (username: string, password: string) => void;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  error: null,
  login: () => { },
  logout: () => { },
  register: () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Pass in the username, password and type of user to login.
   *
   * user object can be accessed from the `useAuth` hook's user property
   */
  const login = (username: string, password: string) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };
    try {
      fetch(`${env.NEXT_PUBLIC_BACKENDURL}/user/login`, requestOptions)
        .then((response) => response.json())
        .then((resData) => {
          if (!resData.token) {
            if (resData.error) setError(resData.error);
            else setError("Request Failed, please try again");
          } else if (resData.token) {
            if (typeof Storage !== "undefined") {
              localStorage.setItem("token", resData.token);
            }
            setUser({
              username: resData.username,
              token: resData.token,
            });
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
    try {
      const user = localStorage.getItem("user");
      if (!user) return;
      const { token } = JSON.parse(user);
      const parsedToken: any = jwt(token);
      if (parsedToken.exp < Date.now() / 1000) {
        logout();
        return;
      }
    } catch (err) {
      setError("Your past login data is corrupted, please login again");
      logout();
    }
  }, []);

  /**
   * Register a new user.
   *
   * It will also log the user in if the request is successful
   * and update the user object returned from the `useAuth` hook
   */
  const register = (username: string, password: string) => {
    // TODO: data validation
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };
    try {
      fetch(`${env.NEXT_PUBLIC_BACKENDURL}/user/register`, requestOptions)
        .then((response) => response.json())
        .then((resData) => {
          if (!resData.token) {
            if (resData.error) setError(resData.error);
            else setError("Request Failed, please try again");
          } else if (resData.token) {
            if (typeof Storage !== "undefined") {
              localStorage.setItem("token", resData.token);
            }
            setUser({
              username: resData.username,
              token: resData.token,
            });
            setError(null);
          } else {
            setError("Request Failed, please try again");
          }
        });
    } catch (err) {
      setError("Request Failed, please try again");
    }
  };

  const authContextValue = {
    user,
    error,
    login,
    logout,
    register,
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
