import { client } from "../client/prismaClient";
import { Prisma } from "@prisma/client";

async function getProductById(id: number) {
    try {
        const product = await client.product.findUnique({
            where: {
                id: id
            }
        });
        if (!product) {
            throw new Error(`Product with id ${id} not found`);
        }
        return product;
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            console.log(err.message);
            throw err;
        }
        throw err; // Re-throw if it's not a known Prisma error
    }
}

async function getAllProducts(max?: number, category?: string) {
    try {
        return await client.product.findMany({ take: max, where: { Category: { name: category } } });
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2002" || err.code === "P2003") {
                console.log(err.message);
                throw err;
            }
        }
        throw err; // Re-throw if it's not a known Prisma error
    }
}

async function createProduct(data: Prisma.ProductUncheckedCreateInput) {
    try {
        return await client.product.create({ data });
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            console.log(err.message);
            throw err;
        }
        throw err; // Re-throw if it's not a known Prisma error
    }
}

const productRepository = {
    getProductById,
    getAllProducts,
    createProduct
};

export default productRepository;
