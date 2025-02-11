// В сервисе хранится логика работы которую хендлер просто вызывает и возвращает результат по http
// Например в сервисе может определяться логика (набор действий) которая произойдет при добавлении поста
// К примеру это может быть сохранение в бд после которого идет оповещение всех пользователей по email
// и вместо того что бы писать подобную логику в обработчике, ее следует писать именно в так называемый слой бизнес логики (наш сервис)
// Логика в сервисе ни от чего не зависит и к примеру если вы захотите создать вдобавок к вебсайту десктоп приложение,
// оно будет переиспользовать все ту же логику

import productRepository from "./productRepository"
import { CreateProduct, Product} from "./types"
import { IOkWithData, IError, IOk} from "../types/types"


async function getProductById(id:number): Promise<IOkWithData<Product> | IError> {
    const res = await productRepository.getProductById(id)
    if (res === null) {
        return {
            status : "error",
            message : "Product is not found"
        }
    }
    // Скажите как его зовут type.. 
    if (typeof(res)  === "string") {
        return {status: "error", message: res}
    }
    return {
        status : "ok",
        data : res
    }
}

async function getAllProducts(): Promise<IOkWithData<Product[]> | IError>{
    const res = await productRepository.getAllProducts()
    if (typeof(res) === "string"){
        return {status: "error", message: res}
    }
    return {
        status : "ok",
        data : res
    }
}

async function createProduct(product: CreateProduct): Promise<IOk | IError> {
    const res = await productRepository.createProduct(product)

    if (typeof(res) === "string"){
        return {status: "error", message: res}
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