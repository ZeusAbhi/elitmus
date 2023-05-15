import Head from "next/head";

export default function PageNotFound() {
  return (
    <>
      <Head>
        <title>404 | Puzzle Hunt</title>
      </Head>
      <div className="flex flex-col items-center justify-center z-10 bg-whoosh py-4 min-h-screen">
        <div className="text-4xl font-bold">404</div>
        <div className="text-2xl font-bold">Page Not Found 🧐</div>
      </div>
    </>
  )
}
