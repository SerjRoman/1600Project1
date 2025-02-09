// app -> router -> controller -> service 

/* 
Приложение ->
указывание ссылок ->
за принятие запроса и отдачу ответа c данными ->
за данные которые нужно отправить 
*/
import express,{Express, Request, Response} from 'express'
import productService from './productService'
// import productService from '../services/productService'
// const productService = require('../services/productService')

function getProductById (req: Request, res : Response) {
    
    const id = +req.params.id
    const context = productService.getProductById(id)
    res.render('product', context)
}
async function getAllProducts (req: Request, res : Response) {
    const max = req.query.max ? +req.query.max : undefined
    const context = await productService.getAllProducts()
    res.render("products", context)
}

function createProductPost(req: Request, res : Response) {
    const product = req.body
    const message = productService.createProduct(product)
    res.json({message})
}

function createProduct(req: Request, res : Response) {
    res.render("create-product")
}

const productController= {
    getProductById, 
    getAllProducts,
    createProductPost, 
    createProduct,
}

export default productController
