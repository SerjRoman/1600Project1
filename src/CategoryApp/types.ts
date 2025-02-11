
import { Prisma } from "@prisma/client"

export type ICategory = Prisma.CategoryGetPayload<{}>
export type ICategoryCreate = Prisma.CategoryUncheckedCreateInput

export interface ICategoryOk {
  status: "ok",
  category: ICategory[]
}


export interface ICategoryScalar {
  status: "ok",
  category: ICategory
}
