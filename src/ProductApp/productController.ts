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
    const category = String(req.query.category) || undefined
    const context = await productService.getAllProducts(max, category)
    console.log(res.locals.user)
    res.render("products", context)
}

function createProductPost(req: Request, res : Response) {
    console.log(req.body);
    const product = req.body
    const msg = productService.createProduct(product)
    res.send(msg)
}

function createProduct(req: Request, res : Response) {
    res.render("create-product")
}

// async function getAllCategories (req: Request, res : Response) {
//     const max = req.query.max ? +req.query.max : undefined
//     // const context = await productService.getAllCategories(max, category)
    
//     res.render("categories", context)
// }

// async function createCategory(req: Request, res : Response) {
//     const category = req.body.category
//     // const msg = productService.createCategory(category)
//     res.send(msg)
// }

const productController= {
    getProductById, 
    getAllProducts,
    createProductPost, 
    createProduct,
    // createCategory,
    // getAllCategories
}

export default productController
