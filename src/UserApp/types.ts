import { Prisma } from "@prisma/client"

export type User = Prisma.UserGetPayload<{
    select: {
        username: true, 
        email: true, 
        id: true,
        role: true
    }
}>
export type UserCreate = Prisma.UserUncheckedCreateInput

