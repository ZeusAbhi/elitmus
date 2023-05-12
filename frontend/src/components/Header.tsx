import { useAuth } from "@/context/authContext"
import Link from "next/link"

export default function Header() {
  const { user, logout } = useAuth()
  return (
    <header className="flex flex-row md:px-4 px-2 bg-blue-800 text-white py-3 m-2 rounded-md shadow-md shadow-gray-400">
      <div className="flex flex-1 items-center">
        <Link href="/">
          <h1 className="text-xl font-semibold">Puzzle Hunt</h1>
        </Link>
      </div>

      <div className="flex flex-row gap-2 flex-grow-0 items-center">
        {user ? (
          <>
            <Link href="/dashboard">
              <div className="px-2 py-2 bg-blue-900/40 shadow-sm shadow-blue-900 rounded-md border-blue-900 border">{user.username}'s Dashboard</div>
            </Link>
            <div className="cursor-pointer font-semibold" onClick={logout}>Logout</div>
          </>
        ) : (
          <Link href="/login">
            <div className="px-2 py-2 bg-blue-900/40 shadow-sm shadow-blue-900 rounded-md border-blue-900 border">
              Login
            </div>
          </Link>
        )}
      </div>

    </header>
  )
}
