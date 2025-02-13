import { IError, IOk, IOkWithData } from "../types/types"
import { CreateUser, User } from "./types"
import userRepository from "./userRepository"



async function authLogin(password:string, email: string): Promise<IOkWithData<User> | IError> {
    const user = await userRepository.findUserByEmail(email)

    if (!user) {
        return {status:"error", message: "user not found"}
    }
    if ( typeof user != password) {
        return {status:"error", message: "Passwords are not similar"}
    }
    
    if (typeof user === "string") {
        return { status: "error", message: "something wrong" };
    } 

    console.log(user)
    console.log(typeof user)
    return {status : "ok" , data: user}
}

// App -> Router -> Controller -> Service -> Repository

async function authRegistration(userData: CreateUser): Promise<IOkWithData<User> | IError> {
    const user = await userRepository.findUserByEmail(userData.email)

    if (user){
        return { status:"error", message:"user exists" }
    }

    const newUser = await userRepository.createUser(userData)

    if (typeof newUser === "string") {
        return { status: "error", message: "something wrong" };
    } 

    if (!newUser){
        return{ status:"error", message:"User wasn`t created successfully" }
    }
    return{ status:"ok" , data: newUser}

}

const userService = {
    authLogin: authLogin,
    authRegistration: authRegistration
}

export default userService


