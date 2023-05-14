import PuzzleContainer from "@/components/PuzzleContainer"
import HintContainer from "@/components/HintContainer"
import { ChatBubble } from "@/components/chatBubble"

export default function PuzzleOne() {
  return <PuzzleContainer puzzleNum={2}>
    <div className="font-mono">
      Your assistant has just recieved a call from one of your clients complaining about a mistake from your team.
      <br />
      Here is how the conversation went
    </div>
    <div className="flex flex-col gap-4 mx-2 my-4">
      <ChatBubble message="Hello Jane, thank you for taking the time to speak with me today. My assistant told me you received an incorrect attachment in an email from our team. Is that correct?" person="m1" lr="left" />
      <ChatBubble message="Yes, that's right. It was the wrong document, and it caused a lot of problems for our team." person="f1" lr="right" />
      <ChatBubble message="I'm sorry to hear that. We take these kinds of mistakes very seriously. Can you tell me more about what happened and how it affected your project?" person="m1" lr="left" />
      <ChatBubble message="Well, the document we received was related to a different project entirely. We didn't realize it at first, so we spent a lot of time reviewing and analyzing it before we realized our mistake. That set us back several days, and we had to rush to catch up." person="f1" lr="right" />
      <ChatBubble message="I see. That's definitely not acceptable, and I apologize again for the inconvenience this caused you" person="m1" lr="left" />
      <ChatBubble message="I will look into this and make sure that such a mistake will not be repeated." person="m1" lr="left" />
      <ChatBubble message="Would it be alright with you if I check in with my team and get back to you in a couple of minutes?" person="m1" lr="left" />
      <ChatBubble message="Yes, that would be fine. Thank you." person="f1" lr="right" />
    </div>
    <div className="font-mono">
      However, when you check your sent emails, you notice that you did not send
      any email to Jane that day. You quickly realize that your team member, Sarah, must have
      sent the email by mistake, using your email address instead of her own. Now, you must
      decide the best course of action to resolve the issue and ensure that Jane is satisfied
      with the outcome. You can either:
      <br />
      <br />
      A) Ask Sarah to email Jane with a corrected attachment and apologize for the mistake, and offer a discount on future services as a gesture of goodwill.
      <br />
      <br />
      B) Take it upon yourself to email Jane directly, apologize for the mistake, and offer a discount on future services as a gesture of goodwill.
      <br />
      <br />
      What would be the decision you make? Give the answer as a single alphabet either A or B.
    </div>
    <div className="border-slate-200 border rounded-md p-4 font-mono mt-4" >
      <HintContainer content="Think about what would be the best learning experience" />
      <HintContainer content="It should be A as that would help the juniors learn and also make sure they see you in a position of leadership and as someone that will cover for them" title="Answer" />
    </div>
  </PuzzleContainer>
}
