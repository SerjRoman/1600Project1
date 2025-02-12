import categoryRepository  from "./categoryRepository"
import { Prisma } from "@prisma/client"
import { IError, IOk ,IOkWithData} from "../types/types"

export type Category = Prisma.CategoryGetPayload<{}>
export type CreateCategory = Prisma.CategoryUncheckedCreateInput




async function getAllCategories(): Promise<IOkWithData<Category[]> | IError> {
    const category = await categoryRepository.getAllCategories()
    if (!category || typeof category === "string"){
        return{status: "error", message: "vsekapec"}
    }
    return {status:"ok", data: category}
}

async function getCategoryById(id:number): Promise<IOkWithData<Category> | IError> {
    const category = await categoryRepository.getCategoryById(id)
    if (!category || typeof category === "string"){
        return{status: "error", message: "vsekapec"}
    }
    return {status:"ok", data: category}
    
}

async function createCategory(data: Category): Promise<IOkWithData<CreateCategory> | IError> {
    const category = await categoryRepository.createCategory(data)
    if (!category || typeof category === "string"){
        return{status: "error", message: "vsekapec"}
    }
    return {status:"ok", data: category}
}

async function getCategoryWithProducts(id: number): Promise<IOkWithData<Category> | IError> {
    const category = await categoryRepository.getCategoryWithProducts(id)
    if (!category || typeof category === "string"){
        return{status: "error", message: "vsekapec"}
    }
    return {status:"ok", data: category}
}   

const categoryService = {
    getAllCategories,
    getCategoryById,
    createCategory,
    getCategoryWithProducts
}

export default categoryService