import categoryRepository from "./categoryRepository"

async function getAllCategories (max?: number, category?: string) {
    const context = {
        categories: await categoryRepository.getAllCategories()
    }
    return context
}

async function createCategory (category:{ id:number,
    name: string,
    description: string,
    img: string
}) {
    categoryRepository.createCategory(category)
}

export = {
    getAllCategories,
    createCategory
}