import HintContainer from "@/components/HintContainer"
import PuzzleContainer from "@/components/PuzzleContainer"

export default function PuzzleOne(props: any) {
  return <PuzzleContainer puzzleNum={5}>
    <div className="border-slate-200 border rounded-md p-4 font-mono mt-4" >
      <HintContainer content="The key on this very page" />
      <HintContainer content="Look at the page source" />
      <HintContainer content="Look inside __NEXT_DATA__" />
      <HintContainer content="flag{1_4m_4_b0t}" title="Answer" />
    </div>
  </PuzzleContainer>
}

export function getStaticProps() {
  return {
    props: {
      flag: "flag{1_4m_4_b0t}"
    }
  }
}
