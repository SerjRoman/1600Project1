import categoryRepository  from "./categoryRepository"
import { IError } from "../types/types"
import { ICategoryOk, ICategorysOk,Category } from "./ctypes"


async function getAllCategories(): Promise<ICategorysOk | IError> {
    const category = await categoryRepository.getAllCategories()
    if (!category){
        return{status: "error", message: "vsekapec"}
    }
    return {status:"ok", category: category}
}

async function getCategoryById(id:number): Promise<ICategoryOk | IError> {
    const category = await categoryRepository.getCategoryById(id)
    if (!category){
        return{status: "error", message: "vsekapec"}
    }
    return {status:"ok", category: category}
}

async function createCategory(data: Category): Promise<ICategoryOk | IError> {
    const category = await categoryRepository.createCategory(data)
    if (!category){
        return{status: "error", message: "vsekapec"}
    }
    return {status:"ok", category: category}
}

async function getCategoryWithProducts(id: number): Promise<ICategoryOk | IError> {
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