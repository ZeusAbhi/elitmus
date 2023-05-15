import { NextFunction, Request, Response } from 'express'
import { prisma } from "./server"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const login = async (req: Request, res: Response) => {
  let { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ error: 'Missing username or password' })
  }
  if (typeof username !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ error: 'Invalid username or password' })
  }
  username = username.toLowerCase();
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
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "secret", {
    expiresIn: "7d"
  })
  return res.json({ token, username: user.username })
}

export const register = async (req: Request, res: Response) => {
  try {
    let { username, email, password } = req.body
    if (!username || !password || !email) {
      return res.status(400).json({ error: 'Missing username or password' })
    }
    if (typeof username !== 'string' || typeof password !== 'string' || typeof email !== 'string') {
      return res.status(400).json({ error: 'Invalid username or password' })
    }
    username = username.toLowerCase();
    email = email.toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword
      }
    })
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "secret", {
      expiresIn: "7d"
    })
    return res.json({ token, username: user.username })
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
