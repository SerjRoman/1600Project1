import userRepository from "./userRepository"



async function authLogin(password:string, email: string): Promise<IAuthOk | IAuthError> {
    const user = await userRepository.findUserByEmail(email)

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

// App -> Router -> Controller -> Service -> Repository

async function authRegistration(userData: IUserData): Promise<IAuthOk | IAuthError> {
    const user = await userRepository.findUserByEmail(userData.email)

    if (user){
        return { status:"error", message:"user exists" }
    }

    const newUser = await userRepository.createUser(userData)

    if (!newUser){
        return{ status:"error", message:"User wasn`t created successfully" }
    }
    return{ status:"ok" , user: newUser}

}

const userService = {
    authLogin: authLogin,
    authRegistration: authRegistration
}

export default userService


