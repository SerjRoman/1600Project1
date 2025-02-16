import { Prisma } from "@prisma/client"

export type IProduct = Prisma.ProductGetPayload<{}>
export type ICreateProduct = Prisma.ProductUncheckedCreateInput

