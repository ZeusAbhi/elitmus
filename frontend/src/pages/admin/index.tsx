import { useAuth } from "@/context/authContext"
import { useEffect, useState } from "react"
import { env } from "@/env.mjs"
import type { Progress } from "@/components/LeaderBoardTable"
import LeaderBoardTable from "@/components/LeaderBoardTable"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import Head from "next/head"

const createQuery = (username: string, page: number) => {
  let query = `${env.NEXT_PUBLIC_BACKENDURL}/admin/progress?`
  if (username && username !== '') {
    query += `username=${username}`
  }
  if (username && username !== '' && page) {
    query += '&'
  }
  if (page) {
    query += `page=${page}`
  }
  return query
}

export default function AdminPanel() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [page, setPage] = useState(1)
  const [error, setError] = useState<String | null>(null)
  const [data, setData] = useState<Progress | null>(null)
  const [parentRef, _] = useAutoAnimate()
  const [parentRef2, __] = useAutoAnimate()
  const [expanded, setExpanded] = useState(false)

  const fetchData = async () => {
    if (!user) return;
    if (user.username !== 'admin') return;
    setLoading(true)
    fetch(createQuery(username, page), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    }).then(async (res) => {
      try {
        const resjson = await res.json();
        if (resjson.error) {
          setError(resjson.error)
          setLoading(false)
        } else {
          setData(resjson)
          setLoading(false)
        }
      } catch (err) {
        setLoading(false)
        setError("Something went wrong")
      }
    })
  }

  useEffect(() => {
    fetchData()
  }, [user])

  if (user?.username !== 'admin') {
    return <>
      <Head>
        <title>Unauthorised | Puzzle Hunt</title>
        <meta name="description" content="Puzzle Hunt for eLitmus Summer Internship" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Access Denied</div>
    </>
  }
  if (!user) {
    return <>
      <Head>
        <title>Admin Panel | Puzzle Hunt</title>
        <meta name="description" content="Puzzle Hunt for eLitmus Summer Internship" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Loading Your User Data...</div>
    </>
  }

  return (
    <>
      <Head>
        <title>Admin Panel | Puzzle Hunt</title>
        <meta name="description" content="Puzzle Hunt for eLitmus Summer Internship" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center">
        <h1 className="my-4 font-bold text-2xl">Admin Panel</h1>

        <div className="px-2 w-full" ref={parentRef2}>
          <div onClick={() => { setExpanded(!expanded) }} className="bg-teal-700 max-w-sm text-center mx-auto w-full py-2 gap-2 px-2 rounded-md text-white cursor-pointer mb-2">
            {expanded ? "Hide" : "Show"} Options
          </div>
          {expanded && <div className="max-w-sm mx-auto w-full py-4 gap-2 flex flex-col">
            <form onSubmit={(e) => {
              e.preventDefault()
              fetchData()
            }} className="flex flex-col gap-2">
              <div className="flex justify-between items-center gap-2">
                <label htmlFor="username" className="text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 px-4 py-2 border border-gray-300 outline-none rounded-md"
                />
              </div>
              <div className="flex justify-between items-center gap-2">
                <label htmlFor="page" className="text-gray-700">
                  Page
                </label>
                <input
                  type="number"
                  id="page"
                  value={page}
                  onChange={(e) => setPage(Number(e.target.value))}
                  className="mt-1 px-4 py-2 border border-gray-300 outline-none rounded-md"
                />
              </div>
              <button
                type="submit"
                className="bg-slate-700 hover:bg-slate-900 transition-colors text-white font-bold py-2 px-4 rounded-md"
              >
                Submit
              </button>
            </form>
          </div>
          }
        </div>

        <p className="my-4 text-lg">This is the progress of each user, sorted by their time of registeration</p>
        {error && (
          <div className="my-4 text-red-500">{error}</div>
        )}
        <div className="flex flex-col items-center w-full" ref={parentRef}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            data && (
              <div className="w-full flex flex-col items-center">
                <div className="overflow-x-scroll max-w-full">
                  <div className="w-max">
                    <LeaderBoardTable page={data?.page} progress={data?.progress || []} count={data?.count || 0} />
                  </div>
                </div>
              </div>
            )
          )}
          {!loading && data?.progress.length === 0 && (
            <div>No Data</div>
          )}
        </div>
      </div>
    </>
  )
}
