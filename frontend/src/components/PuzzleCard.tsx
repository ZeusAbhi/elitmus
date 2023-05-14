import type { Puzzle } from "@/puzzles";
import Link from "next/link";

type PuzzleCardType = Puzzle

export default function PuzzleCard({ puzzle }: { puzzle: PuzzleCardType }) {
  return (
    <div className={`bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-100/80 transition-colors duration-200 md:w-4/5 w-full flex px-2 py-4 border rounded-md flex-col`}>
      <div className="font-thin text-sm text-neutral-800" aria-hidden>
        {puzzle.number}
      </div>
      <div className="font-bold text-xl text-black" aria-label="Puzzle Title">
        {puzzle.heading}
      </div>
      <div className="sm:w-10/12 text-justify text-neutral-800 font-light" aria-label="Puzzle Description">
        {puzzle.shortDescription}
      </div>
      <Link href={`/puzzle/${puzzle.id}`}>
        <div className={`bg-slate-600 after:content-[''] overflow-hidden after:opacity-0 isolate relative after:absolute after:-z-10 after:inset-0 after:bg-gradient-to-br after:from-purple-900 after:to-blue-900 cursor-pointer hover:after:opacity-75 after:transition-all p-2 text-white font-mono font-bold rounded-md mt-2`}>
          Go
        </div>
      </Link>
    </div>
  )
}

