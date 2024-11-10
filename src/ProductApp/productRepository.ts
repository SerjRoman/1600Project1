import { client } from "../client/prismaClient"
import { Prisma } from "@prisma/client"



async function getProductById(id: number){
    const product = await client.product.findUnique({
        where: {
            id: id
        }
    })
    return product
}



async function getAllProducts(max?: number, category?: string) {
    try {
        return await client.product.findMany({ take: max, where: { Category: { name: category } } })
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError){
            if (err.code === "P2002"){
                console.log(err.message)
                throw err
            } else if ( err.code === "P2003"){

            }
        }
    }
}



async function createProduct(data: Prisma.ProductUncheckedCreateInput){
    return await client.product.create({ data })
} 


const productRepository = {
    getProductById, 
    getAllProducts,
    createProduct 
}

export default productRepository
