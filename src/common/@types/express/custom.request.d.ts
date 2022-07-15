import { User } from '@prisma/client'

declare module '@types/express-serve-static-core' {
  interface Request {
    attributes: {
      userId?: string
    }
  }
}