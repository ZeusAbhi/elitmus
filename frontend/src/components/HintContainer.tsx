import { useAutoAnimate } from "@formkit/auto-animate/react"
import { useState } from "react"

const HintContainer = ({ content, title }: { content: string, title?: string }) => {
  const [showHint, setShowHint] = useState(false)
  const [parentRef, _] = useAutoAnimate()
  return (
    <div className={`flex flex-col gap-2 rounded-md p-4 font-mono`} ref={parentRef} >
      <div
        className="bg-teal-700 text-white rounded-md p-2 hover:bg-teal-800 cursor-pointer"
        onClick={() => setShowHint(!showHint)}>
        {showHint ? "Hide" : "Show"} {title ? title : "Hint"}
      </div>
      {showHint && <div>{content}</div>}
    </div>
  )
}
export default HintContainer
