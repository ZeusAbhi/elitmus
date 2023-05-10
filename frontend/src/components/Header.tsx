import { useAuth } from "@/context/authContext"
import Link from "next/link"

export default function Header() {
  const { user, logout } = useAuth()
  return (
    <header className="flex flex-row px-2 bg-purple-100 text-purple-800 py-3 border-b border-purple-300">
      <div className="flex flex-1">
        <Link href="/">
          <h1 className="text-xl font-semibold">Puzzle Hunt</h1>
        </Link>
      </div>

      <div className="flex flex-row gap-2 flex-grow-0">
        {user ? (
          <>
            <div>{user.username}</div>
            <div className="cursor-pointer font-semibold" onClick={logout}>Logout</div>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>

    </header>
  )
}
