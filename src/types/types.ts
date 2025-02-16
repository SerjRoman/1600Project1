export interface IError {
    status: "error",
    message: string
}

export interface IOk {
    status: "ok",
    message: string
}

export interface IObjectOK<T> {
    status: "ok",
    data: T
}

export interface IObjectsOK<T> {
    status: "ok",
    data: T[]
}
