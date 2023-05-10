import { app, prisma } from "./server"

app.get('/hello', async (req, res) => {
  res.json({ hello: 'world' })
})

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

