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
    heading: "Welcome To The Startup!",
    shortDescription: "Welcome to your first day as a developer in our startup!\
        Your boss, the CEO, has sent you a welcome email with a hidden message.\
        Can you find it to access the password?",
    // 
  },
  {
    id: 2,
    number: 2,
    heading: "The E-Mail Mixup!",
    shortDescription: "As a new developer in the startup, you need to stay on top of communication with clients and team members. However, it seems like there's been a mix-up in one of your recent email conversations with a client. Can you figure out what went wrong and resolve the issue?"
  },
  {
    id: 3,
    number: 3,
    heading: "The New Intern!",
    shortDescription: "You've been working hard to build your team, and now you've been tasked\
    with helping a new intern get up to speed They are eager to learn, and have completed\
    their first task. However, you notice that they have made a mistake in their code. Can you\
    help them fix it?",
  },
  {
    id: 4,
    number: 4,
    heading: "The Investors Are Coming!",
    shortDescription: "The CEO has just called you in to join him for a meeting with some potential investors.\
    As a good developer, you'll have to make sure that the meeting goes smoothly and that the investors\
    are impressed with your startup. Can you step up to the challenge?"
  },
  {
    id: 5,
    number: 5,
    heading: "A Reward?",
    shortDescription: "You've been working hard all week, and your efforts haven't gone unnoticed by the CEO.\
    To reward your dedication, the CEO has given you one last challenge, with a big prize at the end. The only clue\
    you have is that the final clue is hidden in plain sight."
  }
]

