import { useAuth } from "@/context/authContext"
import { useRouter } from "next/router"
import { ReactNode, useEffect, useState } from "react"
import { Spinner } from "./Spinner"
import { env } from "@/env.mjs"
import { puzzles } from "@/puzzles"
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import Link from "next/link"

const PuzzleContainer = ({ children, puzzleNum }: { children: ReactNode, puzzleNum: number }) => {
  const { user, userProgress, refetchUserProgress } = useAuth()
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<String | null>(null);
  const router = useRouter()
  const { width, height } = useWindowSize()


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
    if (!userProgress[puzzleNum - 1]) {
      if (puzzleNum === 1 && !userProgress[0]) {
        startPuzzle(1)
      } else if (userProgress[puzzleNum - 2]?.success) {
        // req to start
        startPuzzle(puzzleNum)
      } else {
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)
        return () => {
          if (!t) return;
          clearTimeout(t)
        }
      }
    }

    return () => {
      if (!t) return;
      clearTimeout(t)
    }
  }, [router, user, userProgress])

  const startPuzzle = (puzzleNum: number) => {
    setLoading(true)
    try {
      fetch(`${env.NEXT_PUBLIC_BACKENDURL}/users/progress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user?.token}`
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
    if (puzzleNum !== 1) {
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
    <div className="flex flex-col items-center">
      {alreadySolved && <Confetti width={width} height={height} />}
      <div className="lg:max-w-lg md:max-w-md max-w-sm mx-2 flex flex-col text-justify my-2 gap-2 bg-white sm:p-4 p-2 rounded-md border border-slate-200 hover:border-slate-300">
        {(alreadySolved || err) && (
          <div className="flex flex-col bg-teal-700 mx-2 rounded-md px-2 text-white font-light items-center text-center text-sm p-2">
            {err || "Puzzle Solved!"}
          </div>
        )}
        <p className="text-center inline-block font-light text-sm">{puzzleNum}</p>
        <h1 className="text-2xl font-bold text-center"> {puzzles[puzzleNum - 1].heading}</h1>
        <div>
          <div className="mb-2"> {puzzles[puzzleNum - 1].shortDescription}</div>
          {children}
        </div>
        <form className="flex flex-col gap-2" onSubmit={(e) => {
          e.preventDefault()
          setErr(null)
          const formData = new FormData(e.target as HTMLFormElement)
          const answer = formData.get("answer") as string
          if (!answer) return;
          setLoading(true)
          fetch(`${env.NEXT_PUBLIC_BACKENDURL}/users/progress`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify({
              puzzleNum: puzzleNum,
              status: "answer",
              answer: answer
            })
          }).then(async (res) => {
            const data = await res.json();
            if (data.error) setErr(data.error);
            refetchUserProgress().then(() => {
              setLoading(false)
            })
          }).catch((err) => {
            setErr(err.message)
            setLoading(false)
          })
        }}>
          <label htmlFor="answer" className="text-sm font-bold">Answer</label>
          <input type="text" name="answer" id="answer" className="border border-slate-200 rounded-md p-2" />
          <button type="submit" className="bg-teal-700 text-white rounded-md p-2 hover:bg-teal-800 disabled:bg-slate-200 disabled:text-slate-300 disabled:cursor-not-allowed">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default PuzzleContainer
