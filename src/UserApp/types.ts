interface IAuthOk{
    status: "ok",
    user: {
        id: number,
        username: string,
        email: string,
        password: string,
    }
}

interface IAuthError{
    status:"error",
    message: string,
}

interface IUserData{
    username: string,
    email: string,
    password: string
}

import { Prisma } from "@prisma/client"

export type User = Prisma.UserGetPayload<{}>
export type UserProduct = Prisma.UserUncheckedCreateInput
