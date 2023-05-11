import { useAuth } from "@/context/authContext"
import Link from "next/link"

export default function Header() {
  const { user, logout } = useAuth()
  return (
    <header className="flex flex-row px-2 bg-blue-100/50 text-blue-800 py-3 border-b border-blue-300">
      <div className="flex flex-1 items-center">
        <Link href="/">
          <h1 className="text-xl font-semibold">Puzzle Hunt</h1>
        </Link>
      </div>

      <div className="flex flex-row gap-2 flex-grow-0 items-center">
        {user ? (
          <>
            <div className="px-2 py-2 bg-blue-200 rounded-md">{user.username}</div>
            <div className="cursor-pointer font-semibold" onClick={logout}>Logout</div>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>

    </header>
  )
}
