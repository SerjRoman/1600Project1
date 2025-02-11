import categoryRepository  from "./categoryRepository"
import { Prisma } from "@prisma/client"
import { IError, IOk ,IOkWithData} from "../types/types"
import { createCategory, Category, CategoryWithProducts} from "./types"







async function getAllCategories(): Promise<IOkWithData<Category[]> | IError>{
    const res = await categoryRepository.getAllCategories()
    if (typeof(res) === "string"){
        return {status: "error", message: res}
    }
    return {
        status : "ok",
        data : res
    }
}

async function getCategoryById(id:number): Promise<IOkWithData<Category> | IError> {
    const res = await categoryRepository.getCategoryById(id)
    if (res === null) {
        return {
            status : "error",
            message : "Category is not found"
        }
    }
    if (typeof(res)  === "string") {
        return {status: "error", message: res}
    }
    return {
        status : "ok",
        data : res
    }
    
}

async function createCategory(product: createCategory): Promise<IOk | IError> {
    const res = await categoryRepository.createCategory(product)

    if (typeof(res) === "string"){
        return {status: "error", message: res}
    }

    return {
        status : "ok",
        message : "Successfuly created a category"
    }
}



async function getCategoryWithProducts(id: number): Promise<IOkWithData<CategoryWithProducts>  | IError> {
    const res = await categoryRepository.getCategoryWithProducts(id)
    if (res === null) {
        return {
            status : "error",
            message : "Category(include product) is not found"
        }
    }
    if (typeof(res)  === "string") {
        return {status: "error", message: res}
    }
    return {
        status : "ok",
        data : res
    }
}


const categoryService = {
    getAllCategories,
    getCategoryById,
    createCategory,
    getCategoryWithProducts
}

export default categoryService