import type { Puzzle } from "@/puzzles";

type PuzzleCardType = Puzzle & { active: boolean }

export default function PuzzleCard({ puzzle }: { puzzle: PuzzleCardType }) {
  return (
    <div className={`${puzzle.active ? "bg-blue-100/50 border-gray-300 hover:bg-blue-100/80" : "bg-gray-100/50 border-gray-300 hover:bg-gray-100/80"} transition-colors lg:w-4/5 w-full flex flex-col px-2 py-4 border rounded-md`}>
      <div className="font-thin text-sm text-neutral-800" aria-hidden>
        {puzzle.number}
      </div>
      <div className="font-bold text-xl text-black" aria-label="Puzzle Title">
        {puzzle.heading}
      </div>
      <div className="text-neutral-800 font-light" aria-label="Puzzle Description">
        {puzzle.shortDescription}
      </div>
    </div>
  )
}

