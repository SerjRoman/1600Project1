import userRepository from "./userRepository"
import { IAuthOk, IUserCreate } from "./types"
import { IError } from "../types/types"


async function authLogin(password: string, email: string): Promise<IAuthOk | IError> {
    const user = await userRepository.findUserByEmail(email);

    if (!user) {
        return { status: "error", message: "user not found" };
    }
    if (typeof user === "string") {
        return { status: "error", message: user };
    }
    if (user.password !== password) {
        return { status: "error", message: "Passwords are not similar" };
    }


    return { status: "ok", user: user };
}

async function authRegistration(userData: IUserCreate): Promise<IAuthOk | IError> {
    const user = await userRepository.findUserByEmail(userData.email);

    if (!user) {
        return { status: "error", message: "user not found" };
    }

    if (typeof user === "string") {
        return { status: "error", message: user };
    }

    const newUser = await userRepository.createUser(userData);
    if (typeof newUser === "string") {
        return { status: "error", message: newUser };
    }

    if (!newUser) {
        return { status: "error", message: "User wasn't created successfully" };
    }
    return { status: "ok", user: newUser };
}


const userService = {
    authLogin: authLogin,
    authRegistration: authRegistration
}

export default userService


