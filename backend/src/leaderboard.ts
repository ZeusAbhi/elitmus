import { prisma } from "./server"
import { Request, Response } from "express"

const leaderBoardForPuzzle = async (puzzleNum: number) => {
  const leaderboard = await prisma.userProgress.findMany({
    where: {
      puzzleNum,
      success: true
    },
    orderBy: {
      totalTime: 'asc'
    },
    take: 10
  })
  const result: Array<{ username: string, userId: number, totalTime: number }> = []
  for (const entry of leaderboard) {
    const user = await prisma.user.findFirst({
      where: {
        id: entry.userId
      }
    })
    result.push({
      username: user!.username,
      userId: user!.id,
      totalTime: entry.totalTime!
    })
  }
  return result
}

export const topTen = async (req: Request, res: Response) => {
  const leaderboard: {
    [key: number]: {
      username: string,
      userId: number,
      totalTime: number
    }[]
  } = {}
  const numPuzzles = await prisma.puzzle.count()
  for (let i = 1; i <= numPuzzles; i++) {
    leaderboard[i] = await leaderBoardForPuzzle(i)
  }
  return res.json(leaderboard)
}
