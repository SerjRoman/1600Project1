import categoryRepository  from "./categoryRepository"

import { IError, IOk ,IOkWithData} from "../types/types"


async function getAllCategories(): Promise<IOkWithData<Category[]> | IError> {
    const res = await categoryRepository.getAllCategories()
    if (typeof(res) === "string"){
        return {status: "error", message: res}
    }
    return {status:"ok", data: res}
}
import { Category, CategoryWithProducts } from "./types"

async function getCategoryById(id:number): Promise<IOkWithData<Category> | IError> {
    const res = await categoryRepository.getCategoryById(id)
    if (!res){
        return{status: "error", message: "Category not found"}
    }
    if (typeof(res)  === "string") {
        return {status: "error", message: res}
    }
    return {
        status : "ok",
        data: res
    }
    
}


async function createCategory(data: Category): Promise<IOk | IError> {
    const res = await categoryRepository.createCategory(data)

    if (typeof(res) === "string"){
        return {status: "error", message: res}
    }
    return {status:"ok", message:"Category created"}
}



async function getCategoryWithProducts(id: number): Promise<IOkWithData<CategoryWithProducts> | IError> {
    const category = await categoryRepository.getCategoryWithProducts(id)
    if (!category){
        return{status: "error", message: "obojdetes`"}
    }
    if (typeof(category) === "string"){
        return {status: "error", message: category}
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