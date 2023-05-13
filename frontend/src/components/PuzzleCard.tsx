import type { Puzzle } from "@/puzzles";
import Link from "next/link";

type PuzzleCardType = Puzzle & { active: boolean }

export default function PuzzleCard({ puzzle }: { puzzle: PuzzleCardType }) {
  return (
    <div className={`${puzzle.active ? "bg-teal-700/10 border-teal-700 hover:bg-teal-700/20" : "bg-slate-100/50 border-slate-400 hover:bg-slate-200/80"} transition-colors md:w-4/5 w-full flex px-2 py-4 border rounded-md border-dashed flex-col`}>
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
        <div className={`${puzzle.active ? "bg-teal-900 hover:bg-teal-950" : "bg-slate-600 hover:bg-slate-700"} cursor-pointer transition-colors p-2 text-white font-mono font-bold rounded-md mt-2`}>
          {puzzle.active ? "Completed" : "Go"}
        </div>
      </Link>
    </div>
  )
}

