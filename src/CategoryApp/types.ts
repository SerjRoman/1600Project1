
import { Prisma } from "@prisma/client"

export type ICategory = Prisma.CategoryGetPayload<{}>
export type ICategoryCreate = Prisma.CategoryUncheckedCreateInput
