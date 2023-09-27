import { useAuth } from "@/context/authContext";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

export default function Home() {
  const { user } = useAuth();
  return (
    <main>
      <Head>
        <title>Puzzle Hunt</title>
        <meta name="description" content="Puzzle Hunt for eLitmus Summer Internship" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center z-10 py-4 min-h-screen justify-center ">
        <h1 className="text-xl font-bold text-center">Welcome to the </h1>
        <div className="text-4xl sm:text-6xl md:text-8xl font-black text-transparent bg-woow">Puzzle Hunt!</div>
        <p className="text-center text-xl font-light">This is a Treasure Hunt made for the E-Litmus Assignment Round | eLitmus Summer Intern <br />
          by <a href="https://www.linkedin.com/in/abhinav-tushar-36149521b/" className="text-teal-700 hover:text-teal-800">Abhinav Tushar</a> aka me :).</p>
        <div className="flex flex-col items-center justify-center mt-4 gap-2">
          {user && <Link href="/dashboard" className="cursor-pointer bg-slate-900 px-7 py-2 rounded-md transition-colors text-white hover:bg-slate-800">Dashboard</Link>}
          <Link href="/login" className="cursor-pointer bg-purple-900 px-4 py-2 rounded-md text-white transition-colors hover:bg-purple-800">Start the Hunt</Link>
          <Link href="/leaderboard" className="cursor-pointer">Leaderboard</Link>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row min-h-screen justify-around items-center mx-2 gap-2">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-2xl font-bold text-center">Rules</h1>
          <ul className="flex flex-col gap-2">
            <li>There are 5 parts in total.</li>
            <li>Each part is a puzzle that can be solved indiviually.</li>
            <li>Each part also has a couple of hints.</li>
            <li>If you can not figure the answer out on your own, you can see the answer</li>
            <li>The time starts as soon as you register.</li>
            <li>Solve the puzzles, and obtain the key from each of them</li>
            <li>The server will respond with an incorrect key if the answer is wrong.</li>
            <li>Concatenate all the keys together (1 2 3 =&gt; 123) to get the final key</li>
            <li>Submit this final key at the dashboard to stop your time</li>
            <li>Your final score is the total time taken to solve the final puzzle</li>
          </ul>
        </div>
        <Image alt="screenshot" src="/images/dash.png" className="rounded-md p-2 border border-slate-200" width={500} height={500} />
      </div>
      <div className="flex flex-col min-h-screen justify-around items-center mx-2">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-center">Join the startup!</h1>
          <h2 className="text-center text-xl font-bold">Meet the CEO </h2>
          <p className="text-center text-xl font-light">John Doe is the CEO of a startup that is trying to make a name for itself in the world of tech. </p>
          <p className="text-center text-xl font-light">Join in and you will definitely have fun as each day brings a new challenge.</p>
        </div>
      </div>
    </main >
  )
}
