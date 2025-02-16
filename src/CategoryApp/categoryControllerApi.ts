import { Request, Response } from "express"
import categoryService from "./categoryService"

async function getAllCategories(req: Request, res: Response){
    const result = await categoryService.getAllCategories()
    res.json(result)
}

const categoryControllerApi = {
    getAllCategories
}

export default categoryControllerApi