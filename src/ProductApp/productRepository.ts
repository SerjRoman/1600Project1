import { client } from "../client/prismaClient"
import { Prisma } from "@prisma/client"
import { IProductOk } from "./types"
import { IError } from "../types/types"



async function getProductById(id: number) {
    try{ 
        const product = await client.product.findUnique({
            where: {
                id: id
            }
        })
        return product 
    }catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError){
            const errorMessage = getErrorMessage(err.code)
            console.log(errorMessage)
            return errorMessage
        }
        console.log(err)
        return "Unexpected error"}
}

function getErrorMessage(errorCode : string): string{
    if (errorCode === "P2002"){
        return "Given non unique value"
    }else if (errorCode === "P2003"){
        return 'Field is not found'
    }else if (errorCode === "P2007"){
        return 'Data validation error'
    }else if (errorCode === "P2014"){
        return 'Error in relations'
    }
    return "Error code is undefined " + errorCode
    
}

async function getAllProducts() {
    try {
        return await client.product.findMany()
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError){
            const errorMessage = getErrorMessage(err.code)
            console.log(errorMessage)
            return errorMessage
        }
        console.log(err)
        return "Unexpected error"
    }
}



async function createProduct(data: Prisma.ProductUncheckedCreateInput){
    try{
        return await client.product.create({ data })
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError){
            const errorMessage = getErrorMessage(err.code)
            console.log(errorMessage)
            return errorMessage
        }
        console.log(err)
        return "Unexpected error"}
} 


const productRepository = {
    getProductById, 
    getAllProducts,
    createProduct 
}

export default productRepository
