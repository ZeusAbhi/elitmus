import Image from "next/image"
import m1 from "./chatAssets/m1.svg"
import m2 from "./chatAssets/m2.svg"
import f1 from "./chatAssets/f1.svg"
import f2 from "./chatAssets/f2.svg"

const availableAvatars = {
  m1,
  m2,
  f1,
  f2
} as const;
type avatar = keyof typeof availableAvatars;
export const ChatBubble = ({ person, message, lr }: { person: avatar, message: string, lr: "left" | "right" }) => {
  return <div className="flex">
    <div className={`flex w-full gap-2 ${lr === "left" ? "flex-row" : "flex-row-reverse"}`}>
      <Image src={availableAvatars[person]} alt="icon" className="w-12 h-12" />
      <div className={`flex-1 rounded-md font-light px-2 py-2 ${lr === "left" ? "bg-teal-700 text-white" : "bg-slate-200 text-right"}`}>
        {message}
      </div>
    </div>

  </div>
}
