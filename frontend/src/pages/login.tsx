import { useAuth } from "@/context/authContext"
import { useRouter } from "next/router"
import { useState } from "react";

export default function Login() {
  const { user, error, login, register } = useAuth();
  const router = useRouter()
  if (user) {
    setTimeout(() => {
      router.push('/dashboard')
    }, 2000)
    return <div className="text-bold flex items-center justify-center">
      <div>
        You are logged in.
        <br />
        Redirecting to dashboard.
      </div>
    </div>
  }

  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState<{
    username: string;
    password: string;

  }>({
    username: "",
    password: "",
  });
  const [registerForm, setRegisterForm] = useState<{
    password: string;
    username: string;
  }>({
    password: "",
    username: "",
  });

  const handleTabChange = (tab: "login" | "register") => {
    setActiveTab(tab);
  };

  const handleLoginInputChange = (e: any) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleRegisterInputChange = (e: any) => {
    const { name, value } = e.target;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const handleLoginSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    login(loginForm.username, loginForm.password).then(() => {
      setLoading(false);
    });
  };

  const handleRegisterSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true)
    register(registerForm.username, registerForm.password).then(() => {
      setLoading(false)
    });
  };

  return (
    <div className="z-10 inset-0 overflow-y-auto bg-gray-100 backdrop-brightness-90 text-gray-600" >
      {error && <div className="bg-red-500 text-white flex justify-center break-words text-center">{error}</div>}
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full bg-white bg max-w-sm p-6 rounded-lg shadow-md">
          <div className="gap-2 mb-4 flex flex-col items-center">
            <div className="w-full px-2 flex">
            </div>
            <ul className="flex flex-1 w-full">
              <li
                className={`flex-1 py-1 text-center cursor-pointer ${activeTab === "login" ? "text-blue-500 bg-gray-100" : ""
                  }`}
                onClick={() => handleTabChange("login")}
              >
                Login
              </li>
              <li
                className={`flex-1 py-1 text-center cursor-pointer ${activeTab === "register" ? "text-blue-500 bg-gray-100" : ""
                  }`}
                onClick={() => handleTabChange("register")}
              >
                Register
              </li>
            </ul>
          </div>
          {activeTab === "login" ? (
            <form onSubmit={handleLoginSubmit} className="text-black">
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="w-full mb-2 p-2 rounded-md focus:outline-none"
                value={loginForm.username}
                onChange={handleLoginInputChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full mb-2 p-2 rounded-md focus:outline-none"
                value={loginForm.password}
                onChange={handleLoginInputChange}
              />
              <button
                type="submit"
                className={`w-full py-2 px-4 text-white ${loading ? "bg-gray-500 hover:bg-gray-600" : "bg-blue-500 hover:bg-blue-600"} rounded-md focus:outline-none`}
                disabled={loading}
              >
                {loading ? <Spinner /> : "Login"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="text-black">
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="w-full mb-2 p-2 rounded-md focus:outline-none"
                value={registerForm.username}
                onChange={handleRegisterInputChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full mb-2 p-2 rounded-md focus:outline-none"
                value={registerForm.password}
                onChange={handleRegisterInputChange}
              />
              <button
                type="submit"
                className={`w-full py-2 px-4 text-white ${loading ? "bg-gray-500 hover:bg-gray-600" : "bg-blue-500 hover:bg-blue-600"} rounded-md focus:outline-none`}
                disabled={loading}
              >
                {loading ? <Spinner /> : "Register"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div >
  );
}

const Spinner = () => {
  return <div className="animate-spin rounded-full h-6 w-6 mx-auto">
    <svg className="w-full h-full text-gray-900" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
    </svg>
  </div>
}
