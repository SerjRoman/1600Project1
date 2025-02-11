import categoryRepository from "./categoryRepository"
import { ICategoryOk, ICategoryScalar, ICategoryCreate } from "./types"
import { IError, IOk } from "../types/types"

async function getAllCategories(): Promise<ICategoryOk | IError> {
    const res = await categoryRepository.getAllCategories()
    if (!res) {
        return { status: "error", message: "vsekapec" }
    }
    if (typeof res === "string") {
        return { status: "error", message: res }
    }
    return { status: "ok", category: res }
}

async function getCategoryById(id: number): Promise<ICategoryScalar | IError> {
    const res = await categoryRepository.getCategoryById(id)
    if (!res) {
        return { status: "error", message: "vsekapec" }
    }
    if (typeof res === "string") {
        return { status: "error", message: res }
    }
    return { status: "ok", category: res }
}

async function createCategory(data: ICategoryCreate): Promise<IOk | IError> {
    const res = await categoryRepository.createCategory(data)
    if (!res) {
        return { status: "error", message: "vsekapec" }
    }
    if (typeof res === "string") {
        return { status: "error", message: res }
    }
    return { status: "ok", message: "category succesfully created" }
}

async function getCategoryWithProducts(id: number): Promise<ICategoryScalar | IError> {
    const res = await categoryRepository.getCategoryWithProducts(id)
    if (!res) {
        return { status: "error", message: "vsekapec" }
    }
    if (typeof res === "string") {
        return { status: "error", message: res }
    }
    return { status: "ok", category: res }
}


const categoryService = {
    getAllCategories,
    getCategoryById,
    createCategory,
    getCategoryWithProducts
}

export default categoryService
