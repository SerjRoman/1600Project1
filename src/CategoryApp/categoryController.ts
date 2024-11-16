import express, { Express, Request, Response } from 'express';
import categoryService = require('./categoryService');

async function getAllCategories(req: Request, res: Response) {
    try {
        const max = req.query.max ? +req.query.max : undefined;
        const context = await categoryService.getAllCategories(max);
        res.render("categories", context);
    } catch (error) {
        res.status(500).send({ error: 'Failed to get categories' });
    }
}

async function createCategory(req: Request, res: Response) {
    try {
        const category = req.body.category;
        const msg = await categoryService.createCategory(category);
        res.send(msg);
    } catch (error) {
        res.status(500).send({ error: 'Failed to create category' });
    }
}

const categoryController = {
    createCategory,
    getAllCategories
};

export default categoryController;
