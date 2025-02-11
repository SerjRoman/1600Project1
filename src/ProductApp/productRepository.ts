import { client, getErrorMessage } from "../client/prismaClient"
import { Prisma } from "@prisma/client"




async function getProductById(id: number) {
    try {
        const product = await client.product.findUnique({
            where: {
                id: id
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
        return "unexpected error"
    }
}

async function getAllProducts() {
    try {
        return await client.product.findMany()
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            const errorMessage = getErrorMessage(err.code)
            console.log(errorMessage)
            return errorMessage
        }
        console.log(err)
        return "Unexpected error"
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
        return "Unexpected error"
    }
}


const productRepository = {
    getProductById,
    getAllProducts,
    createProduct
}

export default productRepository
