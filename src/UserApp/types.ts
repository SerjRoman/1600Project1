import { Prisma } from "@prisma/client"

export type IUser = Prisma.UserGetPayload<{}>
export type IUserCreate = Prisma.UserUncheckedCreateInput

export interface IAuthOk {
    status: "ok",
    user: IUser
}
