import PuzzleContainer from "@/components/PuzzleContainer"
import { useAuth } from "@/context/authContext"

export default function PuzzleOne() {
  const { user, userProgress, logout, refetchUserProgress } = useAuth()
  return <PuzzleContainer puzzleNum={3}>

  </PuzzleContainer>
}