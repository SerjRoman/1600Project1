import express,{Express, Request, Response} from 'express'
import categoryService from  "./categoryService"

async function getAllCategories (req: Request, res : Response) {
    const context = await categoryService.getAllCategories()
    if (context.status === "error") {
		res.render("error", { message: context.message });
		return;
	}
    res.render("categories", { categories: context.data })
}

async function createCategory(req: Request, res : Response) {
    const category = req.body.category
    const result = await categoryService.createCategory(category)
    res.json({
		message: result.message,
		status: result.status,
	});
}

const categoryController = {
    createCategory,
    getAllCategories
}

export default categoryController