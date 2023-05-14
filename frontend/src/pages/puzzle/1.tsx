import HintContainer from "@/components/HintContainer"
import PuzzleContainer from "@/components/PuzzleContainer"

export default function PuzzleOne() {
  return <PuzzleContainer puzzleNum={1}>
    <div className="border-slate-200 border rounded-md p-4 font-mono mt-4 bg-white" >
      <div className="font-bold">subject: welcome to the company!</div>
      <br />
      Finally, welcome to the company! I hope you enjoy the work you do here. Remember to always be on time, and to be
      respectful to your coworkers. Sometimes, you may have to work overtime, but that's okay!, Together, we can make this.
      Don't forget to take breaks and have fun! As you can see, the company is growing quickly, and we need to hire more people to keep up with the demand. You'll
      be tasked with a lot of things, but you'll do great!
      <br />
      <br />
      <div className="font-bold">- <span className="text-teal-700">CEO</span></div>
    </div>
    <div className="border-slate-200 border rounded-md p-4 font-mono mt-4" >
      <HintContainer content="The answer is a combination of some of the characters in the email" />
      <HintContainer content="The characters required stick out" />
      <HintContainer content="Come on the characters are SCREAMING at you" />
      <HintContainer content="Its the capital characters, 'FIRSTDAY'" title={"Answer"} />
    </div>
  </PuzzleContainer>
}

