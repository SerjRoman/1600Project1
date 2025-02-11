import { Prisma } from "@prisma/client"
export type Category = Prisma.CategoryGetPayload<{}>


export interface ICategorysOk{
    status: "ok",
    category: Category[]
}

export interface ICategoryOk{
    status: "ok",
    category: Category
}