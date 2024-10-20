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



async function getAllProducts(max?: number){
    try {
        const products = await client.product.findMany()
        return products
    }catch (err){
        if (err instanceof Prisma.PrismaClientKnownRequestError){
            if (err.code === "P2002"){
                console.log(err.message)
                throw err
            }else if ( err.code === "P2003"){

            }
        }
    }
}



async function createProduct(data: Prisma.ProductCreateInput){
    const products = await client.product.create({
        data: data
    })
    return products
} 





const productRepository = {
    getProductById, 
    getAllProducts,
    createProduct 
}

export default productRepository
