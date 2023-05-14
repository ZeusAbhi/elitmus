import HintContainer from "@/components/HintContainer"
import PuzzleContainer from "@/components/PuzzleContainer"

export default function PuzzleOne() {
  return <PuzzleContainer puzzleNum={3}>
    <div className="font-mono">
      The startup has been growing quickly,
      and the CEO has been hiring more and more people to keep up with the demand.
      You've been tasked with helping out the new interns.
      <br />
      Review this peice of code and help the interns fix the bug.
      <br />
      <br />
      You would not want to be the one to fix it but just point them in the right direction by telling them what line the bug is in.
    </div>
    <div className="border-slate-200 border rounded-md p-4 font-mono mt-4 bg-gray-900 text-white overflow-x-scroll" >
      <div className="w-max">
        <div className="pr-2 text-slate-400 inline-block">1</div>
        <div className="inline-block font-bold">function getLargestNumbers(array) {`{`}</div>
        <br />

        <div className="pr-2 text-slate-400 inline-block">2</div>
        <div className="ml-2 inline-block">let largestNumbers = [];</div>
        <br />


        <div className="pr-2 text-slate-400 inline-block">3</div>
        <div className="ml-2 inline-block">for (let i = 0; i &lt; array.length; i++) {`{`}</div>
        <br />

        <div className="pr-2 text-slate-400 inline-block">4</div>
        <div className="ml-4 inline-block">let currentLargest = 0;</div>
        <br />

        <div className="pr-2 text-slate-400 inline-block">5</div>
        <div className="ml-4 inline-block">for (let j = 0; j &lt; array[i].length; j++) {`{`}</div>
        <br />


        <div className="pr-2 text-slate-400 inline-block">6</div>
        <div className="ml-6 inline-block">if (array[i][j] &gt; currentLargest) {`{`}</div>
        <br />

        <div className="pr-2 text-slate-400 inline-block">7</div>
        <div className="ml-8 inline-block">currentLargest = array[i][j];</div>
        <br />

        <div className="pr-2 text-slate-400 inline-block">8</div>
        <div className="ml-6 inline-block">{`}`}</div>
        <br />

        <div className="pr-2 text-slate-400 inline-block">9</div>
        <div className="ml-4 inline-block">{`}`}</div>
        <br />

        <div className="pr-2 text-slate-400 inline-block">10</div>
        <div className="ml-4 inline-block">largestNumbers.push(currentLargest);</div>
        <br />

        <div className="pr-2 text-slate-400 inline-block">11</div>
        <div className="ml-2 inline-block">{`}`}</div>
        <br />

        <div className="pr-2 text-slate-400 inline-block">12</div>
        <div className="ml-2 inline-block">return largestNumbers;</div>
        <br />

        <div className="pr-2 text-slate-400 inline-block">13</div>
        <div className="ml-0 inline-block">{`}`}</div>
      </div>
    </div>

    <div className="border-slate-200 border rounded-md p-4 font-mono mt-4" >
      <HintContainer content="The number is between 1 and 5" />
      <HintContainer content="Think negative numbers" />
      <HintContainer content="The number is 4" title={"Answer"} />
    </div>

  </PuzzleContainer>
}
