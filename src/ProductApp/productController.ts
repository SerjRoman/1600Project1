import express, { Express, Request, Response } from 'express';
import productService from './productService';

async function getProductById(req: Request, res: Response) {
    try {
        const id = +req.params.id;
        const context = await productService.getProductById(id);
        res.render('product', context);
    } catch (error) {
        res.status(500).send({ error: 'Failed to get product' });
    }
}

async function getAllProducts(req: Request, res: Response) {
    try {
        const max = req.query.max ? +req.query.max : undefined;
        const category = String(req.query.category) || undefined;
        const context = await productService.getAllProducts(max, category);
        console.log(res.locals.user);
        res.render("products", context);
    } catch (error) {
        res.status(500).send({ error: 'Failed to get products' });
    }
}

async function createProductPost(req: Request, res: Response) {
    try {
        console.log(req.body);
        const product = req.body;
        const msg = await productService.createProduct(product);
        res.send(msg);
    } catch (error) {
        res.status(500).send({ error: 'Failed to create product' });
    }
}

function createProduct(req: Request, res: Response) {
    res.render("create-product");
}

const productController = {
    getProductById,
    getAllProducts,
    createProductPost,
    createProduct,
};

export default productController;
