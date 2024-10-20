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
    const context = await productService.getAllProducts(req.query.max ? +req.query.max : undefined)
    res.render("products", context)
}

function createProduct(req: Request, res : Response) {
    console.log(req.body);
    const product = req.body
    const msg = productService.createProduct(product)
    res.send(msg)
}
const productController= {
    getProductById: getProductById, 
    getAllProducts: getAllProducts,
    createProduct: createProduct 
}
export default productController
