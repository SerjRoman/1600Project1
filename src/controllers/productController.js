// app -> router -> controller -> service 

/* 
Приложение ->
указывание ссылок ->
за принятие запроса и отдачу ответа c данными ->
за данные которые нужно отправить 
*/

const productService = require('../services/productService')

function getProductById (req, res) {
    const id = req.params.id
    console.log(id)
    const context = productService.getProductById(id)
    res.render('product', context)
}
function getAllProducts (req, res) {
    console.log(req.query)
    const context = productService.getAllProducts(req.query.max)
    res.render("products", context)
}

function createProduct(req,res) {
    console.log(req.body);
    const product = req.body
    const msg = productService.createProduct(product)
    res.send(msg)
}
module.exports = {
    getProductById: getProductById, 
    getAllProducts: getAllProducts,
    createProduct: createProduct 
}

