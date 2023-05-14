import { app, prisma } from "./server"
import { login, register, validateToken } from "./auth"
import { adminPanelGetProgress, finalAnswer, getProgress, updateProgress } from "./userProgress"
import { topTen } from "./leaderboard"

app.get('/hello', async (req, res) => {
  res.json({ hello: 'world' })
})

app.post('/users/register', register)
app.post('/users/login', login)

app.get('/users/progress', validateToken, getProgress)
app.post('/users/progress', validateToken, updateProgress)
app.post('/users/finalAnswer', validateToken, finalAnswer)

app.get('/leaderboard', topTen)
app.get('/admin/progress', validateToken, adminPanelGetProgress)
