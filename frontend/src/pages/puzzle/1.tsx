// Finally, welcome to the company! I hope you enjoy the work you do here. Remember to always be on time, and to be
// respectful to your coworkers. Sometimes, you may have to work overtime, but that's okay!, Together, we can make this.
// Don't forget to take breaks and have fun! As you can see, the company is growing quickly, and we need to hire more people to keep up with the demand. You'll
// be tasked with a lot of things, but You'll do great!

import PuzzleContainer from "@/components/PuzzleContainer"
import { useAuth } from "@/context/authContext"

export default function PuzzleOne() {
  const { user, userProgress, logout, refetchUserProgress } = useAuth()
  return <PuzzleContainer puzzleNum={1}>

  </PuzzleContainer>
}
