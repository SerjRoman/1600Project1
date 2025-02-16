// app -> router -> controller -> service

/* 
Приложение ->
указывание ссылок ->
за принятие запроса и отдачу ответа c данными ->
за данные которые нужно отправить 
*/
import express, { Express, Request, Response } from 'express'
import productService from './productService'

async function getProductById(req: Request, res: Response) {

    const id = +req.params.id
    const context = await productService.getProductById(id)
    if (context.status === "error") {
        res.render("error", { message: context.message });
        return;
    }
    res.render('product', context)
}
async function getAllProducts(req: Request, res: Response) {
    const context = await productService.getAllProducts()
    if (context.status === "error") {
        res.render("error", { message: context.message });
        return;
    }
    res.render("products", context)
}

async function createProductPost(req: Request, res: Response) {
    const product = req.body
    const result = await productService.createProduct(product)
    res.json({
        message: result.message,
        status: result.status,
    });
}

function createProduct(req: Request, res: Response) {
    res.render("create-product")
}

const productController = {
    getProductById,
    getAllProducts,
    createProductPost,
    createProduct,
}

export default productController