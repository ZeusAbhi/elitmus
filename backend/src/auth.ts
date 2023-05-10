import { NextFunction, Request, Response } from 'express'
import { prisma } from "./server"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { User } from '@prisma/client'

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ error: 'Missing username or password' })
  }
  if (typeof username !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ error: 'Invalid username or password' })
  }
  const user = await prisma.user.findUnique({
    where: {
      username
    },
  })
  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }
  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) {
    return res.status(401).json({ error: 'Password does not match' })
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "secret")
  const userProgress = await prisma.userProgress.findFirst({
    where: {
      userId: user.id,
      success: false,
    }
  })
  return res.json({ token, username: user.username, puzzleNum: userProgress?.puzzleNum || 6 })
}

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ error: 'Missing username or password' })
    }
    if (typeof username !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ error: 'Invalid username or password' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword
      }
    })
    // start puzzle 1
    await prisma.userProgress.create({
      data: {
        userId: user.id,
        success: false,
        puzzleNum: 1,
        startTime: new Date(),
      }
    })
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "secret")
    return res.json({ token, username: user.username, puzzleNum: 1 })
  } catch (err) {
    return res.status(400).json({ error: 'Username already exists' })
  }
}


export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Missing token' })
  }
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) {
    return res.status(401).json({ error: 'Missing token' })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret")
    const user = await prisma.user.findUnique({
      where: {
        id: (decoded as any).id
      }
    })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    (req as any).user = user
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
