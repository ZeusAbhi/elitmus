import { prisma } from "./server";
import { User } from "@prisma/client";
import { Request, Response } from "express"
import { stringHash } from "./hashFunct";

export const getProgress = async (req: Request, res: Response) => {
  const user: User = (req as any).user;
  return res.json({
    completed: user.endAt !== null,
    progress: user.endAt || 0,
  })
}

export const updateProgress = async (req: Request, res: Response) => {
  const { puzzleNum, answer } = req.body;
  if (!puzzleNum || !answer) {
    return res.status(400).json({ error: "Missing puzzleNum or answer" })
  }
  if (isNaN(Number(puzzleNum))) {
    return res.status(400).json({ error: "Invalid puzzleNum" })
  }

  const puzzle = await prisma.puzzle.findFirst({
    where: {
      id: Number(puzzleNum)
    }
  })

  if (!puzzle) {
    return res.status(404).json({ error: "Puzzle not found" })
  }
  if (puzzle.solution === answer.toLowerCase().trim()) {
    return res.status(200).json({ key: puzzle.key })
  }
  return res.status(200).json({ key: stringHash(answer) })
}

export const finalAnswer = async (req: Request, res: Response) => {
  const user: User = (req as any).user;
  if (user.endAt !== null) {
    return res.status(400).json({ error: "Already completed" })
  }
  const { answer } = req.body;
  if (!answer) {
    return res.status(400).json({ error: "Missing answer" })
  }
  const puzzles = await prisma.puzzle.findMany({
    select: {
      key: true
    },
    orderBy: {
      id: 'asc'
    }
  })
  const puzzleKeys = puzzles.map(puzzle => puzzle.key)
  const finalAnswer = puzzleKeys.join('');
  if (finalAnswer !== answer) {
    return res.status(400).json({ error: "Wrong answer" })
  } else {
    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        totalTime: Number((((new Date()).getTime() - user.createdAt.getTime()) / 1000).toFixed(0)),
        endAt: new Date()
      }
    })
    return res.status(200).json({ success: true })
  }
}


export const adminPanelGetProgress = async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (!user.isAdmin) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  const { userId, username, page } = req.query;
  const limit = 10;
  const queryObj: any = {};
  let skip = 0;
  try {
    if (userId && typeof userId === 'string') {
      queryObj.id = Number(userId);
    }
    if (username && typeof username === 'string') {
      queryObj.username = username;
    }
    if (page && typeof page === 'string') {
      skip = (Number(page) - 1) * limit;
    }
  } catch (e) {
    return res.status(400).json({ error: 'Invalid query' })
  }
  const progress = await prisma.user.findMany({
    where: queryObj,
    orderBy: {
      createdAt: 'desc'
    },
    select: {
      id: true,
      username: true,
      totalTime: true,
      createdAt: true,
      endAt: true,
    },
    skip,
    take: limit,
  })
  const count = await prisma.user.count({
    where: queryObj
  })
  return res.json({
    page: Number(page) || 1,
    progress,
    count: Math.ceil(count / limit)
  })
}
