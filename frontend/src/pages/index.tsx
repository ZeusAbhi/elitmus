import { useAuth } from "@/context/authContext"

export default function Home() {
  const { user, login, logout } = useAuth()
  return (
    <main>
      Test
    </main>
  )
}
