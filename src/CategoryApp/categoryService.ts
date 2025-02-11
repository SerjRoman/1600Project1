import categoryRepository  from "./categoryRepository"
import { Prisma } from "@prisma/client"
import { IError, IOk ,IOkWithData} from "../types/types"

export type Category = Prisma.CategoryGetPayload<{}>





async function getAllCategories(): Promise<IOkWithData<Category[]> | IError> {
    const category = await categoryRepository.getAllCategories()
    if (!category){
        return{status: "error", message: "vsekapec"}
    }
    return {status:"ok", data: category}
}

async function getCategoryById(id:number): Promise<IOkWithData<Category{}> | IError> {
    const category = await categoryRepository.getCategoryById(id)
    if (!category){
        return{status: "error", message: "vsekapec"}
    }
    return {status:"ok", data: category}
    
}

async function createCategory(data: Category): Promise<IOdinElement | ICategoryError> {
    const category = await categoryRepository.createCategory(data)
    if (!category){
        return{status: "error", message: "vsekapec"}
    }
    return {status:"ok", category: category}
}



async function getCategoryWithProducts(id: number): Promise<IOdinElement | ICategoryError> {
    const category = await categoryRepository.getCategoryWithProducts(id)
    if (!category){
        return{status: "error", message: "vsekapec"}
    }
    return {status:"ok", category: category}
}


const categoryService = {
    getAllCategories,
    getCategoryById,
    createCategory,
    getCategoryWithProducts
}

export default categoryService