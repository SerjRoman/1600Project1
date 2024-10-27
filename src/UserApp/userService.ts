import userRepository from "./userRepository"

interface IAuthLoginOk{
    status:"ok",
    user: {
        id: number,
        username: string,
        email: string,
        password: string,
    }
}

interface IAuthLoginError{
    status:"error",
    message: string,
}

async function authLogin(password:string, email: string): Promise<IAuthLoginOk | IAuthLoginError> {
    const user = await userRepository.findUserEmail(email)
    if (!user) {
        return {status:"error", message: "user not found"}
    }
    if (user.password != password) {
        return {status:"error", message: "Passwords are not similar"}
    }

    console.log(user)
    console.log(typeof user)
    return {status : "ok" , user: user}
}

const userService = {
    authLogin: authLogin
}

export default userService