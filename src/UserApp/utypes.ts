import { Prisma } from "@prisma/client"


export interface IUserData {
    username: string
    email: string
    password: string
}

export interface IAuthOk {
    status: "ok"
    user: IUser 
}

export interface IUser {
    id: number
    username: string
    email: string
    password: string
}
