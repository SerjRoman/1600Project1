import { Request, Response } from "express"
import productService from "./productService"

async function getProductById(req: Request, res: Response){
    const id = +req.params.id
    const result = await productService.getProductById(id)
    res.json(result)
}
async function getAllProducts(req: Request, res: Response){
    const result = await productService.getAllProducts()
    res.json(result)
}

const productControllerApi = {
    getProductById,
    getAllProducts
}

export default productControllerApi