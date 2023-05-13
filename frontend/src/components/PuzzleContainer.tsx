import { useAuth } from "@/context/authContext"
import { useRouter } from "next/router"
import { ReactNode, useEffect, useState } from "react"
import { Spinner } from "./Spinner"
import { env } from "@/env.mjs"

const PuzzleContainer = ({ children, puzzleNum }: { children: ReactNode, puzzleNum: number }) => {
  const { user, userProgress, refetchUserProgress } = useAuth()
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  // redirects handler
  useEffect(() => {
    let t: NodeJS.Timeout;
    if (!user || !userProgress) {
      t = setTimeout(() => {
        router.push('/login')
      }, 2000)
      return () => {
        if (!t) return;
        clearTimeout(t)
      }
    }

    if (!(userProgress[puzzleNum - 1] || userProgress[puzzleNum - 2]?.success)) {
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
      return () => {
        if (!t) return;
        clearTimeout(t)
      }
    }

    return () => {
      if (!t) return;
      clearTimeout(t)
    }
  }, [router, user, userProgress])

  useEffect(() => {
    if (!userProgress || !user) return;
    if (!userProgress[puzzleNum - 2]?.success) return;
    if (!userProgress[puzzleNum - 1] && userProgress[puzzleNum - 2].success) {
      setLoading(true)
      try {
        fetch(`${env.NEXT_PUBLIC_BACKENDURL}/users/progress`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`
          },
          body: JSON.stringify({
            puzzleNum: puzzleNum,
            status: "start"
          })
        }).then(() => {
          refetchUserProgress().then(() => {
            setLoading(false)
          })
        })
      } catch (err) {
        console.log(err)
        setLoading(false)
      }
    }
  }, [user])

  if (!user || !userProgress) {
    return <div className="h-screen w-full text-bold flex items-center justify-center">
      <div>
        <p>
          You are not logged in.
          <br />
          Redirecting to login page.
        </p>
        <Spinner />
      </div>
    </div>
  }

  if (!(userProgress[puzzleNum - 1] || userProgress[puzzleNum - 2]?.success)) {
    return <div className="h-screen w-full text-bold flex items-center justify-center">
      <div>
        <p>
          You have not unlocked this puzzle yet.
          <br />
          Redirecting to dashboard.
        </p>
        <Spinner />
      </div>
    </div>
  }

  if (loading) {
    return <div className="h-screen w-full text-bold flex items-center justify-center">
      <div>
        <p>
          Loading...
        </p>
        <Spinner />
      </div>
    </div>
  }
  const alreadySolved = userProgress[puzzleNum - 1]?.success
  return (
    <div className="flex flex-col">
      {alreadySolved && (
        <div className="bg-teal-500 ">
          You have already solved this puzzle. You will not be able to submit again.
        </div>
      )}
      {children}
    </div>
  )
}

export default PuzzleContainer
