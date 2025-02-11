import categoryRepository  from "./categoryRepository"
import { Prisma } from "@prisma/client"
import { IError, IOk ,IOkWithData} from "../types/types"
import { ICategory, ICategoryCreate, ICategoryWithProducts} from "./types"





async function getAllCategories(): Promise<IOkWithData<ICategory[]> | IError> {
    const category = await categoryRepository.getAllCategories()
    if (!category){
        return{status: "error", message: "vsekapec"}
    }
    if (typeof category === "string") {
        return { status: "error", message: category }
    }
    return {status:"ok", data: category}
}

async function getCategoryById(id: number): Promise<IOkWithData<ICategory> | IError> {
    const category = await categoryRepository.getCategoryById(id);
    if (!category) {
        return { status: "error", message: "vsekapec" };
    }
    if (typeof category === "string") {
        return { status: "error", message: category }
    }
    return { status: "ok", data: category };
}


async function createCategory(data: ICategoryCreate): Promise<IOk| IError> {
    const category = await categoryRepository.createCategory(data)
    if (!category){
        return{status: "error", message: "vsekapec"}
    }
    if (typeof category === "string") {
        return { status: "error", message: category }
    }
    return {status:"ok", message: "where is your power"}
}




async function getCategoryWithProducts(id: number): Promise<IOkWithData<ICategoryWithProducts> | IError> {
    const category = await categoryRepository.getCategoryWithProducts(id)
    if (!category){
        return{status: "error", message: "vsekapec"}
    }
    if (typeof category === "string") {
        return { status: "error", message: category }
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

