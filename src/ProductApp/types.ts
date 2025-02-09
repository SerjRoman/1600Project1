import { Prisma } from "@prisma/client"

export type Product = Prisma.ProductGetPayload<{}>
export type CreateProduct = Prisma.ProductUncheckedCreateInput


export interface IProductOk{
    status: "ok",
    data: Product
}

export interface IProductsOk{
    status: "ok",
    data: Product[]
}

