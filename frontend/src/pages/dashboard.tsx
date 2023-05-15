import PuzzleCard from "@/components/PuzzleCard"
import { useAuth } from "@/context/authContext"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { puzzles } from "@/puzzles"
import { Spinner } from "@/components/Spinner"
import { env } from "@/env.mjs"
import Confetti from "react-confetti"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { useWindowSize } from "react-use"
import Head from "next/head"

export default function Dashboard() {
  const { user, userProgress, logout, refetchUserProgress } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [submitErr, setSubmitErr] = useState<string | null>(null)
  const { width, height } = useWindowSize()
  const [parentRef, _] = useAutoAnimate();
  const [expanded, setExpanded] = useState(false)
  const [parentRef2, __] = useAutoAnimate()

  useEffect(() => {
    let t: NodeJS.Timeout;
    if (!user) {
      t = setTimeout(() => {
        router.push('/login')
      }, 2000)
    } else {
      setLoading(true)
      refetchUserProgress(user).then(() => {
        setLoading(false)
      }).catch((err) => {
        setLoading(false)
        logout();
      })
    }
    return () => {
      if (!t) return;
      clearTimeout(t)
    }
  }, [user])


  if (!user || !userProgress) {
    return <>
      <Head>
        <title>Dashboard | Puzzle Hunt</title>
        <meta name="description" content="Puzzle Hunt for eLitmus Summer Internship" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col h-screen w-full items-center justify-center">
        <p>Please login.<br /> </p>
        <p>Redirecting to login page...</p>
      </div>
    </>
  }
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitErr(null)
    setSubmitLoading(true)
    fetch(`${env.NEXT_PUBLIC_BACKENDURL}/users/finalAnswer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({
        answer: e.currentTarget.answer.value
      })
    }).then(async (res) => {
      const data = await res.json();
      if (data.error) {
        setSubmitErr(data.error)
        setSubmitLoading(false)
      } else if (data.success) {
        refetchUserProgress(user)
        setSubmitLoading(false)
      } else {
        setSubmitLoading(false)
      }
    })
  }

  return <div ref={parentRef2}>
    <Head>
      <title>Dashboard | Puzzle Hunt</title>
      <meta name="description" content="Puzzle Hunt for eLitmus Summer Internship" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <ul className="animation-sq">
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
    </ul>
    {
      loading ? (<div className="flex h-screen w-full items-center justify-center">
        <div>
          <p>Loading...</p>
          <Spinner />
        </div>
      </div>) : (<div>
        <h1 className="mt-4 mx-2 text-2xl break-words mb-8">Welcome <b>{user.username}</b></h1>
        <div className="flex flex-col justify-center mx-2 gap-4 mb-4 items-center">
          {userProgress.completed && (<div className="fixed h-screen w-screen -z-10 top-0">
            <Confetti
              width={width}
              height={height}
            />
          </div>
          )}
          {
            puzzles.map((puzzle) => <PuzzleCard key={puzzle.id} puzzle={{
              ...puzzle,
            }} />
            )
          }
        </div>
      </div>
      )}

    <div ref={parentRef} className="mx-2">
      <div onClick={() => { setExpanded(!expanded) }} className="bg-teal-700 max-w-sm text-center mx-auto w-full py-2 gap-2 px-2 rounded-md text-white cursor-pointer mb-2">
        {expanded ? "Hide" : "Show"}
      </div>

      {expanded && <div className="max-w-sm mx-auto w-full py-4 gap-2 flex flex-col">
        {submitErr && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{submitErr}</span>
        </div>
        }
        {userProgress.completed ? <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">Congratulations! You have completed all the puzzles!</span>
        </div> : (
          <form className="flex flex-col gap-2 mx-2" onSubmit={submitHandler}>
            <label htmlFor="answer" className="text-sm font-bold">Final Answer</label>
            <label htmlFor="answer" className="text-sm font-bold">(This is the concatenation of the keys from all puzzles)</label>
            <input type="text" name="answer" id="answer" className="outline-none border border-slate-200 rounded-md p-2" />
            <button type="submit" className="bg-teal-700 text-white rounded-md p-2 hover:bg-teal-800 disabled:bg-slate-200 disabled:text-slate-300 disabled:cursor-not-allowed">
              {submitLoading ? <Spinner /> : 'Submit'}
            </button>
          </form>
        )
        }
      </div>
      }
    </div>
  </div>
}
// Your assistant informs you that one of your clients, Jane, has sent an email expressing frustration with the company. She claims that she received an email from your team with an incorrect attachment, which led to a delay in her project. However, when you check your sent emails, you notice that you did not send any email to Jane that day. You quickly realize that your team member, Sarah, must have sent the email by mistake, using your email address instead of her own. Now, you must decide the best course of action to resolve the issue and ensure that Jane is satisfied with the outcome. You can either: A) ask Sarah to email Jane with a corrected attachment and apologize for the mistake, or B) take it upon yourself to email Jane directly, apologize for the mistake, and offer a discount on future services as a gesture of goodwill.
