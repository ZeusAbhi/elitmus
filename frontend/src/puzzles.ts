export type Puzzle = {
  id: number;
  number: number;
  heading: string;
  shortDescription: string;
  // longDescription: string;
}
export const puzzles: Puzzle[] = [
  {
    id: 1,
    number: 1,
    heading: "Welcome To The Company!",
    shortDescription: "Welcome to your first day as a manager in our company!\
        Your boss, the CEO, has sent you a welcome email with a hidden message.\
        Can you find it to access the password?",
    // 
  },
  {
    id: 2,
    number: 2,
    heading: "The E-Mail Mixup!",
    shortDescription: "As a new manager in the company, you need to stay on top of communication with clients and team members. However, it seems like there's been a mix-up in one of your recent email conversations with a client. Can you figure out what went wrong and resolve the issue?"
    // longDescription: "Your assistant informs you that one of your clients, Jane,\
    // has sent an email expressing frustration with the company. She claims that she\
    // received an email from your team with an incorrect attachment, which led to a delay\
    // in her project. However, when you check your sent emails, you notice that you did not send\
    // any email to Jane that day. You quickly realize that your team member, Sarah, must have\
    // sent the email by mistake, using your email address instead of her own. Now, you must\
    // decide the best course of action to resolve the issue and ensure that Jane is satisfied\
    // with the outcome. You can either: A) ask Sarah to email Jane with a corrected attachment\
    // and apologize for the mistake, or B) take it upon yourself to email Jane directly,\
    // apologize for the mistake, and offer a discount on future services as a gesture of goodwill.",
  },
  {
    id: 3,
    number: 3,
    heading: "The new intern!",
    shortDescription: "You've been working hard to build your team, and now you've been tasked\
    with helping a new intern get up to speed They are eager to learn, and have completed\
    their first task. However, you notice that they have made a mistake in their code. Can you\
    help them fix it?",
  },
  {
    id: 4,
    number: 4,
    heading: "Meet the Investors!",
    shortDescription: "The CEO has just called you in to join him for a meeting with some potential investors.\
    As a good manager, you'll have to make sure that the meeting goes smoothly and that the investors\
    are impressed with your company. Can you step up to the challenge?"
  },
  {
    id: 5,
    number: 5,
    heading: "A Reward?",
    shortDescription: "You've been working hard all week, and your efforts haven't gone unnoticed by the CEO.\
    To reward your dedication, the CEO has hidden a gift card somewhere on the company's website. The only clue\
    you have is that the gift card is hidden in plain sight."
  }
]

