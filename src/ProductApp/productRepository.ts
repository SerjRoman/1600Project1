import { client, getErrorMessage } from "../client/prismaClient"
import { Prisma } from "@prisma/client"




async function getProductById(id: number) {
    try {
        const product = await client.product.findUnique({
            where: {
                id: id
            },
            include: {
                Category: true
            }
        })
        return product
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            const errorMessage = getErrorMessage(err.code)
            console.log(errorMessage)
            return errorMessage
        }
        console.log(err)
        return "error"
    }
}

async function getAllProducts() {
    try {
        return await client.product.findMany({
            include: {
                Category: true
            }
        })
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            const errorMessage = getErrorMessage(err.code)
            console.log(errorMessage)
            return errorMessage
        }
        console.log(err)
        return "error"
    }
}



async function createProduct(data: Prisma.ProductUncheckedCreateInput) {
    try {
        return await client.product.create({ data })
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            const errorMessage = getErrorMessage(err.code)
            console.log(errorMessage)
            return errorMessage
        }
        console.log(err)
        return "error"
    }
}


const productRepository = {
    getProductById,
    getAllProducts,
    createProduct
}

export default productRepository