import { Prisma } from "@prisma/client"

export type ProductWithCategory = Prisma.ProductGetPayload<{include: {Category: true}}>
export type CreateProduct = Prisma.ProductUncheckedCreateInput

