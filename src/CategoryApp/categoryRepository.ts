import { client } from "../client/prismaClient"
import { Prisma } from "@prisma/client"


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



async function createCategory(data: Prisma.CategoryCreateInput){
    
    try {
        const category = await client.category.create({
            data: data
        })
        return category
    } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError){
                const errorMessage = getErrorMessage(err.code)
                console.log(errorMessage)
                return errorMessage
            }
            console.log(err)
            return "Unexpected error"
        }}
    


async function getCategoryById(id: number){
    try {
        const category = await client.category.findUnique({
            where : {
                id : id
            }
        })
        return category
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
async function getAllCategories(){
    try {
        const categories = await client.category.findMany()
        return categories
    } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError){
                const errorMessage = getErrorMessage(err.code)
                console.log(errorMessage)
                return errorMessage
            }
            console.log(err)
            return "Unexpected error"
        }}

async function getCategoryWithProducts(id: number){
    try {
        const category= await client.category.findUnique({
            where : {
                id : id
            },
            include: {
                products: true
            }
        })
        return category
    } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError){
                const errorMessage = getErrorMessage(err.code)
                console.log(errorMessage)
                return errorMessage
            }
            console.log(err)
            return "Unexpected error"
        }}



const categoryRepository = {
    createCategory, 
    getCategoryById,
    getAllCategories,
    getCategoryWithProducts
}

export default categoryRepository