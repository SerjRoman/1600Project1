import userRepository from "./userRepository"
import { IError,IOkWithData } from "../types/types"
import { UserData } from "./utypes"




async function authLogin(email:string , password: string): Promise<IOkWithData<UserData> | IError> {
    const user = await userRepository.findUserByEmail(email)

    if (!user || typeof user === "string") {
        return {status:"error", message: "user not found"}
    }
    if (user.password != password) {
        return {status:"error", message: "Passwords are not similar"}
    }

    return {status : "ok" , data: user}
}

// App -> Router -> Controller -> Service -> Repository

async function authRegistration(userData: UserData): Promise<IOkWithData<UserData> | IError> {
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
    return { status: "ok", data: newUser }
}

const userService = {
    authLogin: authLogin,
    authRegistration: authRegistration
}

export default userService


