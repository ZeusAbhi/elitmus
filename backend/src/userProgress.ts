import { prisma } from "./server";
import { User } from "@prisma/client";
import { Request, Response } from "express"

export const getProgress = async (req: Request, res: Response) => {
  const user: User = (req as any).user;
  const progress = await prisma.userProgress.findMany({
    where: {
      userId: user.id
    }
  })
  return res.json(progress)
}

export const updateProgress = async (req: Request, res: Response) => {
  const user: User = (req as any).user;
  const { puzzleNum, status, answer } = req.body;
  if (!puzzleNum || !status) {
    return res.status(400).json({ error: "Missing fields" })
  }
  if (isNaN(Number(puzzleNum))) {
    return res.status(400).json({ error: "Invalid puzzle number" })
  }
  if (status !== "answer" && status !== "start") {
    return res.status(400).json({ error: "Invalid status" })
  }
  if (status === "answer" && !answer) {
    return res.status(400).json({ error: "Missing answer" })
  }

  const puzzle = await prisma.puzzle.findFirst({
    where: {
      id: Number(puzzleNum)
    }
  })
  if (!puzzle) {
    return res.status(404).json({ error: "Puzzle not found" })
  }
  const progress = await prisma.userProgress.findFirst({
    where: {
      userId: user.id,
      puzzleNum: Number(puzzleNum)
    }
  })

  if (!progress && status === "answer") {
    return res.status(400).json({ error: "You have not started this puzzle yet" })
  }
  if (progress && progress.success === true) {
    return res.status(400).json({ error: "You have already solved this puzzle" })
  }
  if (progress && status === "start") {
    return res.status(400).json({ error: "You have already started this puzzle" })
  }
  if (progress && progress.success === false && status === "answer") {
    // compare answer
    if (puzzle.solution !== answer.trim().toLowerCase()) {
      return res.status(400).json({ error: "Incorrect answer" })
    }
    await prisma.userProgress.update({
      where: {
        id: progress.id
      },
      data: {
        success: true,
        endTime: new Date(),
        totalTime: Number(((new Date().getTime() - progress.startTime.getTime()) / 1000).toFixed(0))
      }
    })
    return res.json({ success: true })
  }
  if (!progress && status === "start") {
    await prisma.userProgress.create({
      data: {
        userId: user.id,
        puzzleNum: Number(puzzleNum),
        startTime: new Date(),
        success: false
      }
    })
    return res.json({ success: true })
  }
  return res.status(400).json({ error: "Invalid request" })
}

export const adminPanelGetProgress = async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (!user.isAdmin) {
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
    take: limit,
  })
  const count = await prisma.userProgress.count({
    where: queryObj
  })
  return res.json({
    page: Number(page) || 1,
    progress,
    count: Math.ceil(count / limit)
  })
}
