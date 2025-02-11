import { Prisma } from "@prisma/client";

export type Category = Prisma.CategoryGetPayload<{}>;
export type CreateCategory = Prisma.CategoryUncheckedCreateInput;

export type CategoryWithProducts = Prisma.CategoryGetPayload<{
    include: {
        products: true;
    };
}>;
