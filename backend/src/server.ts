import { Prisma, PrismaClient } from "@prisma/client"
import express from "express"

const prisma = new PrismaClient()
const app = express();
app.use(express.json())

export const PORT = process.env.PORT || 8080

app.listen(3000, () =>
  console.log('Live on port: ' + PORT + ' 🚀')
)
export { app, prisma }
