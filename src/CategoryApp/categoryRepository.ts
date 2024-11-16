import { client } from "../client/prismaClient";
import { Prisma } from "@prisma/client";

async function createCategory(data: Prisma.CategoryCreateInput) {
    try {
        const category = await client.category.create({
            data: data
        });
        return category;
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2002" || err.code === "P2003" || err.code === "P2007" || err.code === "P2014") {
                console.log(err.message);
                throw err;
            }
        }
        throw err; // Re-throw if it's not a known Prisma error
    }
}

async function getCategoryById(id: number) {
    try {
        const category = await client.category.findUnique({
            where: {
                id: id
            }
        });
        return category;
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2002" || err.code === "P2003" || err.code === "P2007" || err.code === "P2014") {
                console.log(err.message);
                throw err;
            }
        }
        throw err; // Re-throw if it's not a known Prisma error
    }
}

async function getAllCategories() {
    try {
        const categories = await client.category.findMany();
        return categories;
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2002" || err.code === "P2003" || err.code === "P2007" || err.code === "P2014") {
                console.log(err.message);
                throw err;
            }
        }
        throw err; // Re-throw if it's not a known Prisma error
    }
}

export { createCategory, getCategoryById, getAllCategories };
