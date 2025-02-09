// В сервисе хранится логика работы которую хендлер просто вызывает и возвращает результат по http
// Например в сервисе может определяться логика (набор действий) которая произойдет при добавлении поста
// К примеру это может быть сохранение в бд после которого идет оповещение всех пользователей по email
// и вместо того что бы писать подобную логику в обработчике, ее следует писать именно в так называемый слой бизнес логики (наш сервис)
// Логика в сервисе ни от чего не зависит и к примеру если вы захотите создать вдобавок к вебсайту десктоп приложение,
// оно будет переиспользовать все ту же логику

import { IError, IOk } from "../types/types"
import productRepository from "./productRepository"
import { CreateProduct, IProductOk, IProductsOk } from "./types"


async function getProductById(id:number): Promise<IProductOk | IError> {
    const res = await productRepository.getProductById(id)
    if (!res) {
        return {
            status : "error",
            message : "Product is not found"
        }
    }
    // Скажите как его зовут type.. 
    if (res instanceof String) {
        return {status: "error", message: String(res)}
    }
    return {
        status : "ok",
        data : res
    }
}

async function getAllProducts(): Promise<IProductsOk | IError>{
    const products = await productRepository.getAllProducts()
    if (!products) {
        return {
            status : "error",
            message : "Occured error during getting all products"
        }
    }
    return {
        status : "ok",
        data : products
    }
}

async function createProduct(product: CreateProduct): Promise<IOk | IError> {
    const createdProduct = await productRepository.createProduct(product)
    if (!createdProduct) {
        return {
            status : "error",
            message : "Maybe created"
        }
    }
    return {
        status : "ok",
        message : "Successfuly created product"
    }
}

export = {
    getProductById, 
    getAllProducts,
    createProduct,
    // getAllCategories,
}