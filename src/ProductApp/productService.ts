// В сервисе хранится логика работы которую хендлер просто вызывает и возвращает результат по http
// Например в сервисе может определяться логика (набор действий) которая произойдет при добавлении поста
// К примеру это может быть сохранение в бд после которого идет оповещение всех пользователей по email
// и вместо того что бы писать подобную логику в обработчике, ее следует писать именно в так называемый слой бизнес логики (наш сервис)
// Логика в сервисе ни от чего не зависит и к примеру если вы захотите создать вдобавок к вебсайту десктоп приложение,
// оно будет переиспользовать все ту же логику

import { Product } from "@prisma/client"
import { IError, IObjectOK, IObjectsOK, IOk } from "../types/types"
import productRepository from "./productRepository"
import { ICreateProduct, IProduct } from "./types"


async function getProductById(id: number): Promise<IObjectOK<IProduct> | IError> {
    const res = await productRepository.getProductById(id)
    if (!res) {
        return {
            status: "error",
            message: "Product is not found"
        }
    }
    if (typeof res === "string") {
        return { status: "error", message: res }
    }
    return {
        status: "ok",
        data: res
    }
}

async function getAllProducts(): Promise<IObjectsOK<IProduct> | IError> {
    const res = await productRepository.getAllProducts()
    if (!res) {
        return {
            status: "error",
            message: "Occurred error during getting all products"
        }
    }
    if (typeof res === "string") {
        return { status: "error", message: res }
    }
    return {
        status: "ok",
        data: res
    }
}

async function createProduct(product: ICreateProduct): Promise<IOk | IError> {
    const res = await productRepository.createProduct(product)
    if (!res) {
        return {
            status: "error",
            message: "Occurred error during product creation"
        }
    }
    if (typeof res === "string") {
        return { status: "error", message: res }
    }
    return {
        status: "ok",
        message: "Successfully created product"
    }
}


export = {
    getProductById,
    getAllProducts,
    createProduct,
    // getAllCategories,
}
