
interface Category{
    id: number
    name:string
    img:string
    description:string | null
}

interface ICategoryOk{
    status: "ok",
    category: Category[]
}

interface ICategoryError{
    status:"error",
    message: string
}

interface IOdinElement{
    status: "ok",
    category: Category
}
