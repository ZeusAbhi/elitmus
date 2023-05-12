import type { Puzzle } from "@/puzzles";
import Link from "next/link";

type PuzzleCardType = Puzzle & { active: boolean }

export default function PuzzleCard({ puzzle }: { puzzle: PuzzleCardType }) {
  return (
    <div className={`${puzzle.active ? "bg-green-100/50 border-green-300 hover:bg-green-100/80" : "bg-gray-100/50 border-blue-200 hover:bg-gray-100/80"} transition-colors md:w-4/5 w-full flex px-2 py-4 border rounded-md sm:items-center border-dashed flex-col sm:flex-row`}>
      <div className="flex flex-col flex-1">
        <div className="font-thin text-sm text-neutral-800" aria-hidden>
          {puzzle.number}
        </div>
        <div className="font-bold text-xl text-black" aria-label="Puzzle Title">
          {puzzle.heading}
        </div>
        <div className="sm:w-10/12 text-justify text-neutral-800 font-light" aria-label="Puzzle Description">
          {puzzle.shortDescription}
        </div>
      </div>
      <Link href={`/puzzle/${puzzle.id}`}>
        <div className={`${puzzle.active ? "bg-green-400 hover:bg-green-500" : "bg-blue-400 hover:bg-blue-500"} transition-colors p-2 text-white font-mono font-bold rounded-md mt-2 sm:mt-0`}>
          Go
        </div>
      </Link>
    </div>
  )
}

