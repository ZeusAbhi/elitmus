import { useAuth } from "@/context/authContext"
import { useRouter } from "next/router"
import { ReactNode, useEffect, useState } from "react"
import { Spinner } from "./Spinner"
import { puzzles } from "@/puzzles"
import { env } from "@/env.mjs"
import Link from "next/link"

const PuzzleContainer = ({ children, puzzleNum }: { children: ReactNode, puzzleNum: number }) => {
  const { user, userProgress } = useAuth()
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const [response, setResponse] = useState<number | null>(null)
  const router = useRouter()

  // redirects handler
  useEffect(() => {
    let t: NodeJS.Timeout;
    if (!user || !userProgress) {
      t = setTimeout(() => {
        router.push('/login')
      }, 2000)
    }

    return () => {
      if (!t) return;
      clearTimeout(t)
    }
  }, [router, user, userProgress])

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
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr(null)
    setResponse(null)
    setLoading(true)
    fetch(`${env.NEXT_PUBLIC_BACKENDURL}/users/progress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({
        puzzleNum,
        answer: e.currentTarget.answer.value
      })
    }).then(async (res) => {
      const data = await res.json();
      if (data.error) {
        setErr(data.error)
      } else if (data.key) {
        setResponse(data.key)
      } else {
        setErr('Something went wrong. Please try again later')
      }
      setLoading(false)
    }).catch((err) => {
      setErr(err.message)
      setLoading(false)
    })
  }

  return (
    <div className="flex flex-col items-center z-10 bg-whoosh py-4">
      <div className="lg:max-w-xl md:max-w-lg max-w-sm w-full mx-2 flex flex-col text-justify my-2 gap-2 bg-white bg-opacity-5 backdrop-blur-sm sm:p-4 p-2 rounded-md border border-slate-200 hover:border-slate-300">
        {(err) && (
          <div className="flex flex-col bg-amber-700 mx-2 rounded-md px-2 text-white font-light items-center text-center text-sm p-2">
            {err}
          </div>
        )}
        {(response) && (
          <div className="flex flex-col bg-teal-700 mx-2 rounded-md px-2 text-white font-light items-center text-center text-sm p-2">
            Server responded with key <b>{response}</b>
          </div>
        )}
        <p className="text-center inline-block font-light text-sm">{puzzleNum}</p>
        <h1 className="text-2xl font-bold text-center"> {puzzles[puzzleNum - 1].heading}</h1>
        <div>
          <div className="mb-4"> {puzzles[puzzleNum - 1].shortDescription}</div>
          {children}
        </div>
        <form onSubmit={submitHandler} className="flex flex-col gap-2">
          <label htmlFor="answer" className="text-sm font-bold mx-auto">Get the key</label>
          <input type="text" name="answer" id="answer" className="border border-slate-200 rounded-md p-2 focus:outline-none" />
          <button type="submit" disabled={loading} className="bg-teal-700 text-white rounded-md p-2 hover:bg-teal-800 disabled:bg-slate-200 disabled:text-slate-300 disabled:cursor-not-allowed">
            {loading ? <Spinner /> : 'Submit'}
          </button>
        </form>
        <Link href="/dashboard">
          <button className="w-full rounded-md p-2 hover:bg-slate-800 bg-black text-white transition-colors">
            Go Back
          </button>
        </Link>
      </div>
    </div>
  )
}

export default PuzzleContainer
