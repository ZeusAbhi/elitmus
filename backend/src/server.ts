import { Prisma, PrismaClient } from "@prisma/client"
import cors from "cors"
import express from "express"

const prisma = new PrismaClient()
const app = express();
app.use(cors())
app.use(express.json())

export const PORT = process.env.PORT || 8080

app.listen(PORT, () =>
  console.log('Live on port: ' + PORT + ' 🚀')
)
export { app, prisma }
