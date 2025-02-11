import userRepository from "./userRepository"
import { CreateUser, User} from "./types"
import { IOkWithData, IError, IOk} from "../types/types"

// interface IAuthOk{
//     status: "ok",
//     user: {
//         id: number,
//         username: string,
//         email: string,
//         password: string,
//     }
// }

// interface IAuthError{
//     status:"error",
//     message: string,
// }

// interface IUserData{
//     username: string,
//     email: string,
//     password: string
// }




async function authLogin(password:string, email: string): Promise<IOkWithData<User> | IError> {
    const res = await userRepository.findUserByEmail(email)

    // if (!user) {
    //     return {status:"error", message: "user not found"}
    // }
    // if (user.password != password) {
    //     return {status:"error", message: "Passwords are not similar"}
    // }
    if (typeof(res) === "string"){
        return {status: "error", message: res}
    }
    if (!res){
        return {status: "error", message: "User not found!"}
    }

    return {
        status : "ok",
        // message : "Successfuly created a category"
        data: res
    }
    // console.log(user)
    // console.log(typeof user)
    // return {status : "ok" , user: user}
}

// App -> Router -> Controller -> Service -> Repository

async function authRegistration(userData: User): Promise<IOkWithData<User> | IError> {
// async function authRegistration(userData: CreateUser): Promise<IOk | IError> {
    const user = await userRepository.findUserByEmail(userData.email)

    if (user){
        return { status:"error", message:"user exists" }
    }

    const newUser = await userRepository.createUser(userData)

    if (!newUser){
        return{ status:"error", message:"User wasn`t created successfully" }
    }
    if (typeof(newUser) === "string") {
        return{ status:"error", message:"User wasn`t created successfully" }
    }
    
    return{ status:"ok" , data: newUser}

}

const userService = {
    authLogin: authLogin,
    authRegistration: authRegistration
}

export default userService


