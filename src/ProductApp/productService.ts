// В сервисе хранится логика работы которую хендлер просто вызывает и возвращает результат по http
// Например в сервисе может определяться логика (набор действий) которая произойдет при добавлении поста
// К примеру это может быть сохранение в бд после которого идет оповещение всех пользователей по email
// и вместо того что бы писать подобную логику в обработчике, ее следует писать именно в так называемый слой бизнес логики (наш сервис)
// Логика в сервисе ни от чего не зависит и к примеру если вы захотите создать вдобавок к вебсайту десктоп приложение,
// оно будет переиспользовать все ту же логику

import productRepository from "./productRepository"
import { CreateProduct, ProductWithCategory } from "./types"
import { IOkWithData ,IError, IOk } from "../types/types"


async function getProductById(id: number): Promise<IOkWithData<ProductWithCategory> | IError> {
    const res = await productRepository.getProductById(id)
    if (res === null) {
        return {
            status: "error",
            message: "Product is not product"
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

async function getAllProducts(): Promise<IOkWithData<ProductWithCategory[]> | IError> {
    const res = await productRepository.getAllProducts()
    if (!res) {
        return {
            status: "error",
            message: "not products"
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

async function createProduct(product: CreateProduct): Promise<IOk | IError> {
    const res = await productRepository.createProduct(product)
    if (!res) {
        return {
            status: "error",
            message: "product not created "
        }
    }
    if (typeof res === "string") {
        return { status: "error", message: res }
    }
    return {
        status: "ok",
        message: "Success, product is product"
    }
}


export = {
    getProductById,
    getAllProducts,
    createProduct
}