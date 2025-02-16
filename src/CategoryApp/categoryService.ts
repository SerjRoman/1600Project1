import categoryRepository from "./categoryRepository"
import { Category, CategoryCreate, CategoryWithProducts } from "./types"
import { IOkWithData ,IError, IOk } from "../types/types"

async function getAllCategories(): Promise<IOkWithData<Category[]> | IError> {
    const res = await categoryRepository.getAllCategories()
    if (!res) {
        return { status: "error", message: "ujas" }
    }
    if (typeof res === "string") {
        return { status: "error", message: res }
    }
    return { status: "ok", data: res }
}

async function getCategoryById(id: number): Promise<IOkWithData<Category> | IError> {
    const res = await categoryRepository.getCategoryById(id)
    if (!res) {
        return { status: "error", message: "ujas" }
    }
    if (typeof res === "string") {
        return { status: "error", message: res }
    }
    return { status: "ok", data: res }
}

async function createCategory(data: CategoryCreate): Promise<IOk | IError> {
    const res = await categoryRepository.createCategory(data)
    if (!res) {
        return { status: "error", message: "ujas" }
    }
    if (typeof res === "string") {
        return { status: "error", message: res }
    }
    return { status: "ok", message: "category succesfully created" }
}

async function getCategoryWithProducts(id: number): Promise<IOkWithData<CategoryWithProducts> | IError> {
    const res = await categoryRepository.getCategoryWithProducts(id)
    if (!res) {
        return { status: "error", message: "vsekapec" }
    }
    if (typeof res === "string") {
        return { status: "error", message: res }
    }
    return { status: "ok", data: res }
}


const categoryService = {
    getAllCategories,
    getCategoryById,
    createCategory,
    getCategoryWithProducts
}

export default categoryService