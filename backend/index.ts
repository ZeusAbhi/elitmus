import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const leaderboard = prisma.user.aggregate({
  select: {
    userId: { _count: true },
    totalTime: {
      sum: {
        endTime: {
          minus: "startTime"
        }
      }
    }
  },
  orderBy: {
    totalTime: "asc"
  }
});

console.log(leaderboard);
