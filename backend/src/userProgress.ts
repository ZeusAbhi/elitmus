import { RequestWithUser } from "./auth"
import { Response } from "express"
import { prisma } from "./server";

export const getProgress = async (req: RequestWithUser, res: Response) => {
  const user = req.user;
  const progress = await prisma.userProgress.findMany({
    where: {
      userId: user.id
    }
  })
  return res.json(progress)
}

export const updateProgress = async (req: RequestWithUser, res: Response) => {
  const user = req.user;
  const { puzzleNum } = req.body;
  if (!puzzleNum || typeof puzzleNum !== 'number' || puzzleNum < 1 || puzzleNum > 5) {
    return res.status(400).json({ error: 'Invalid puzzleNum' })
  }
  const currentProgress = await prisma.userProgress.findFirst({
    where: {
      userId: user.id,
      puzzleNum
    }
  })
  if (!currentProgress) {
    return res.status(404).json({ error: 'Progress not found' })
  }
  if (currentProgress.success) {
    // already finished this puzzle
    return res.status(400).json({ error: 'Already finished this puzzle' })
  }
  const updatedProgress = await prisma.userProgress.update({
    where: {
      id: currentProgress.id
    },
    data: {
      success: true,
      endTime: new Date(),
      totalTime: (new Date().getTime() - currentProgress.startTime.getTime())
    }
  })
  // start next puzzle
  if (puzzleNum < 5) {
    await prisma.userProgress.create({
      data: {
        userId: user.id,
        success: false,
        puzzleNum: puzzleNum + 1,
        startTime: new Date(),
      }
    })
  }
  return res.json(updatedProgress)
}

export const adminPanelGetProgress = async (req: RequestWithUser, res: Response) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  const { userId, puzzleNum, page } = req.query;
  const limit = 10;
  const queryObj: any = {};
  let skip = 0;
  try {
    if (userId && typeof userId === 'string') {
      queryObj.userId = Number(userId);
    }
    if (puzzleNum && typeof puzzleNum === 'string') {
      queryObj.puzzleNum = Number(puzzleNum);
    }
    if (page && typeof page === 'string') {
      skip = (Number(page) - 1) * limit;
    }
  } catch (e) {
    return res.status(400).json({ error: 'Invalid query' })
  }
  const progress = await prisma.userProgress.findMany({
    where: queryObj,
    orderBy: {
      startTime: 'desc'
    },
    skip,
    take: limit
  })
  return res.json(progress)
}
