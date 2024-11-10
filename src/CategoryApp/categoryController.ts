import express,{Express, Request, Response} from 'express'
import categoryService = require('./categoryService')

async function getAllCategories (req: Request, res : Response) {
    const max = req.query.max ? +req.query.max : undefined
    const context = await categoryService.getAllCategories(max)
    
    res.render("categories", context)
}

async function createCategory(req: Request, res : Response) {
    const category = req.body.category
    const msg = categoryService.createCategory(category)
    res.send(msg)
}

const categoryController = {
    createCategory,
    getAllCategories
}

export default categoryController