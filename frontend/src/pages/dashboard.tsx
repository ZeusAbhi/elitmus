import PuzzleCard from "@/components/PuzzleCard"
import { useAuth } from "@/context/authContext"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { puzzles } from "@/puzzles"
import { Spinner } from "@/components/Spinner"

export default function Dashboard() {
  const { user, userProgress, logout, refetchUserProgress } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let t: any;
    if (!user) {
      t = setTimeout(() => {
        router.push('/login')
      }, 2000)
    } else {
      setLoading(true)
      refetchUserProgress().then(() => {
        setLoading(false)
      }).catch(() => {
        setLoading(false)
        logout();
      })
    }
    return () => {
      clearTimeout(t)
    }
  }, [user])


  if (loading || !userProgress || !user) {
    if (!user) {
      return <div className="flex flex-col h-screen w-full items-center justify-center">
        <p>Please login.<br /> </p>
        <p className="animate-pulse">Redirecting to login page...</p>
      </div>
    }
    return <div className="flex h-screen w-full items-center justify-center">
      <div>
        <p>Loading...</p>
        <Spinner />
      </div>
    </div>
  }


  return <div>
    <h1 className="mt-8 mx-2 text-2xl break-words mb-4">Welcome <b>{user.username}</b></h1>
    <div className="flex flex-col justify-center mx-2 gap-4 mb-4">
      {
        puzzles.map((puzzle) => <PuzzleCard puzzle={{
          ...puzzle,
          active: userProgress[puzzle.id - 1]?.success
        }} />
        )
      }
    </div>
  </div>
}
// Your assistant informs you that one of your clients, Jane, has sent an email expressing frustration with the company. She claims that she received an email from your team with an incorrect attachment, which led to a delay in her project. However, when you check your sent emails, you notice that you did not send any email to Jane that day. You quickly realize that your team member, Sarah, must have sent the email by mistake, using your email address instead of her own. Now, you must decide the best course of action to resolve the issue and ensure that Jane is satisfied with the outcome. You can either: A) ask Sarah to email Jane with a corrected attachment and apologize for the mistake, or B) take it upon yourself to email Jane directly, apologize for the mistake, and offer a discount on future services as a gesture of goodwill.
