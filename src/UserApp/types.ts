interface IAuthOk{
    status: "ok",
    user: {
        id: number,
        username: string,
        email: string,
        password: string,
    }
}

interface IAuthError{
    status:"error",
    message: string,
}

interface IUserData{
    username: string,
    email: string,
    password: string
}


