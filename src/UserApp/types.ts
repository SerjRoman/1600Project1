import { Prisma } from "@prisma/client"

export type User = Prisma.UserGetPayload<{}>
export type UserCreate = Prisma.UserUncheckedCreateInput
