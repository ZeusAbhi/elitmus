import HintContainer from "@/components/HintContainer"
import PuzzleContainer from "@/components/PuzzleContainer"

export default function PuzzleOne() {
  return <PuzzleContainer puzzleNum={4}>
    <div className="font-mono">
      You arrive early to the meeting room, but as you're setting the computer in the meeting room, you realize that you can't remember the password to log in.
      <br />
      No need to worry, its the CEO's first name, without any spaces or special characters.
      <br />
      <br />
      Can you decipher the password and successfully log in before the meeting starts? Time is running out!
    </div>
    <div className="border-slate-200 border rounded-md p-4 font-mono mt-4" >
      <HintContainer content="You've seen it on this website somewhere." />
      <HintContainer content="Look closer at the home page" />
      <HintContainer content="Your CEO is John Doe" title="Answer" />
    </div>
  </PuzzleContainer>
}
