import { Prisma } from "@prisma/client"

export type Product = Prisma.ProductGetPayload<{}>
export type CreateProduct = Prisma.ProductUncheckedCreateInput


