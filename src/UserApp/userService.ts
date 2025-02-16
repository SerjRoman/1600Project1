import userRepository from "./userRepository"
import { User, UserCreate } from "./types"
import { IOkWithData ,IError, IOk } from "../types/types"


async function authLogin(password: string, email: string): Promise<IOkWithData<User> | IError> {
    const user = await userRepository.findUserByEmail(email);

    if (!user) {
        return { status: "error", message: "User not users" };
    }
    if (typeof user === "string") {
        return { status: "error", message: user };
    }
    if (user.password !== password) {
        return { status: "error", message: "Passwords are not passwords" };
    }


    
    return { status: "ok", data: user };
}

async function authRegistration(userData: UserCreate): Promise<IOkWithData<User> | IError> {
    const user = await userRepository.findUserByEmail(userData.email);

    if (!user) {
        return { status: "error", message: "user not users" };
    }

    if (typeof user === "string") {
        return { status: "error", message: user };
    }

    const newUser = await userRepository.createUser(userData);
    if (typeof newUser === "string") {
        return { status: "error", message: newUser };
    }

    if (!newUser) {
        return { status: "error", message: "User is user" };
    }
    return { status: "ok", data: newUser };
}

const userService = {
    authLogin: authLogin,
    authRegistration: authRegistration
}

export default userService


