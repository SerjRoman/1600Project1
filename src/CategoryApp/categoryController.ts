import { Request, Response } from 'express'
import categoryService from './categoryService'

async function getAllCategories(req: Request, res: Response) {
    const context = await categoryService.getAllCategories()
    if (context.status === "error") {
        return res.status(400).json({ error: context.message })
    }
    res.render("categories", context)
}

async function createCategory(req: Request, res: Response) {
    const category = req.body.category
    const msg = await categoryService.createCategory(category)
    if (msg.status === "error") {
        return res.status(400).json({ error: msg.message })
    }

    res.send(msg)
}

const categoryController = {
    createCategory,
    getAllCategories
}

export default categoryController
