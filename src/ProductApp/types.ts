interface Product{
    id: string
    name:string
    img:string
    description:string
}
interface IProductOk{
    status: "ok",
    product: Product
    
}

interface IProductError{
    status:"error",
    message: string
}
