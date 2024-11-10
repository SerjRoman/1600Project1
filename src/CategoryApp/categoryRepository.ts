import { client } from "../client/prismaClient"
import { Prisma } from "@prisma/client"

async function createCategory(data: Prisma.CategoryCreateInput){
    
    try {
        const category = await client.category.create({
            data: data
        })
        return category
    } catch(err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError){
            if (err.code === "P2002"){
                console.log(err.message)
                throw err
            } else if ( err.code === "P2003"){
                console.log(err.message)
                throw err
            } else if ( err.code === "P2007"){
                console.log(err.message)
                throw err
            } else if ( err.code === "P2014"){
                console.log(err.message)
                throw err
            }
    }
    
}}
    


async function getCategoryById(id: number){
    try {
        const category = await client.category.findUnique({
            where : {
                id : id
            }
        })
        return category
    } catch(err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError){
            if (err.code === "P2002"){
                console.log(err.message)
                throw err
            } else if ( err.code === "P2003"){
                console.log(err.message)
                throw err
            } else if ( err.code === "P2007"){
                console.log(err.message)
                throw err
            } else if ( err.code === "P2014"){
                console.log(err.message)
                throw err
            }
        }
    }
}
async function getAllCategories(){
    try {
        const categories = await client.category.findMany()
        return categories
    } catch(err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError){
            if (err.code === "P2002"){
                console.log(err.message)
                throw err
            } else if ( err.code === "P2003"){
                console.log(err.message)
                throw err
            } else if ( err.code === "P2007"){
                console.log(err.message)
                throw err
            } else if ( err.code === "P2014"){
                console.log(err.message)
                throw err
            }
    }
}}

async function getAllCategoriesWithProducts(id: number){
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
    } catch(err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError){
            if (err.code === "P2002"){
                console.log(err.message)
                throw err
            } else if ( err.code === "P2003"){
                console.log(err.message)
                throw err
            } else if ( err.code === "P2007"){
                console.log(err.message)
                throw err
            } else if ( err.code === "P2014"){
                console.log(err.message)
                throw err
            }
    }
}}



const categoryRepository = {
    createCategory, 
    getCategoryById,
    getAllCategories,
    getAllCategoriesWithProducts
}

export default categoryRepository