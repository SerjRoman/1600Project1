import userRepository from "./userRepository"
import { IError } from "../types/types"
import { IAuthOk,IUser,IUserData } from "./utypes"

async function authLogin(email:string , password: string): Promise<IAuthOk | IError> {
    const user = await userRepository.findUserByEmail(email)

    if (!user || typeof user === "string") {
        return {status:"error", message: "user not found"}
    }
    if (user.password != password) {
        return {status:"error", message: "Passwords are not similar"}
    }

    return {status : "ok" , user: user}
}

// App -> Router -> Controller -> Service -> Repository

async function authRegistration(userData: IUserData): Promise<IAuthOk | IError> {
    const user = await userRepository.findUserByEmail(userData.email);
    if (typeof user === "string") {
        return { status: "error", message: user }
    }
    if (user) {
        return { status: "error", message: "User already exists" }
    }
    const newUser = await userRepository.createUser(userData)
    if (typeof newUser === "string") {
        return { status: "error", message: newUser }
    }
    return { status: "ok", user: newUser }
}

const userService = {
    authLogin: authLogin,
    authRegistration: authRegistration
}

export default userService


