import { useAuth } from "@/context/authContext"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useAutoAnimate } from "@formkit/auto-animate/react"

export default function Header() {
  const { user, logout } = useAuth()
  const [expanded, setExpanded] = useState(false)
  const router = useRouter()
  const [parentRef, _enableAnims] = useAutoAnimate()
  useEffect(() => {
    setExpanded(false)
  }, [router])
  return (
    <>
      <header className="hidden sm:flex flex-row md:px-4 px-2 bg-gradient-to-br from-purple-900 to-blue-900 text-white py-3 m-2 rounded-md shadow-md shadow-slate-300">
        <div className="flex flex-1 items-center">
          <Link href="/">
            <h1 className="text-xl font-semibold">Puzzle Hunt</h1>
          </Link>
        </div>

        <div className="flex flex-row gap-2 flex-grow-0 items-center">
          {user ? (
            <>
              <Link href="/dashboard">
                <div className="px-2 py-2 bg-slate-100 hover:bg-slate-200 transition-colors rounded-md text-slate-800">{user.username + "'"}s Dashboard</div>
              </Link>
              {user.username === "admin" && <Link href="/admin">
                <div className="cursor-pointer font-semibold mx-4">Admin Panel</div>
              </Link>
              }
              <div className="cursor-pointer font-semibold" onClick={logout}>Logout</div>
            </>
          ) : (
            <Link href="/login">
              <div className="px-2 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md border-blue-900 border">
                Login
              </div>
            </Link>
          )}
        </div>
      </header>
      <header ref={parentRef} className="flex flex-col gap-2 sm:hidden bg-gradient-to-br from-purple-900 to-blue-900 text-white py-3 m-2 shadow-md shadow-gray-400 rounded-md">
        <div className="flex gap-2 flex-row h-full px-2">
          <span className="cursor-pointer" onClick={() => {
            setExpanded(!expanded)
          }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-7 w-7">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </span>
          <Link href="/">
            <h1 className="text-xl font-semibold">Puzzle Hunt</h1>
          </Link>
        </div>
        {expanded && (
          <div className="flex flex-col gap-2 h-full px-2 pt-2">
            {user ? (
              <>
                <Link href="/dashboard">
                  <div className="cursor-pointer pl-2">{user.username + "'"}s Dashboard</div>
                </Link>
                {user.username === "admin" && <Link href="/admin">
                  <div className="cursor-pointer pl-2">Admin Panel</div>
                </Link>}
                <div className="cursor-pointer pl-2" onClick={logout}>Logout</div>
              </>
            ) : (
              <Link href="/login">
                <div className="cursor-pointer pl-2">
                  Login
                </div>
              </Link>
            )}
          </div>
        )}
      </header>
    </>
  )
}
