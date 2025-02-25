import userRepository from "./userRepository"
import { User, UserCreate } from "./types"
import { IOkWithData ,IError, IOk } from "../types/types"
import { hash , compare } from "bcryptjs"
import { SECRET_KEY } from "../config/token";
import { sign } from "jsonwebtoken";

async function authLogin(password: string, email: string): Promise<IOkWithData<string> | IError> {
    const user = await userRepository.findUserByEmail(email);

    if (!user) {
        return { status: "error", message: "User not users" };
    }
    if (typeof user === "string") {
        return { status: "error", message: user };
    }
    // user.password = $2y$10$VO4gSEnm72OgK8vKogYD0eYY7CkBfyNyw3rD/Mtv8HBIVhZdoibMO
    // password = "12345"
    const isMatch = await compare(password, user.password)

    if (!isMatch) {
        return { status: "error", message: "Passwords are not passwords" };
    }

    const token = sign(String(user.id), SECRET_KEY, { expiresIn: "1d" })

    return { status: "ok", data: token };
}

async function authRegistration(userData: UserCreate): Promise<IOkWithData<string> | IError> {
    const user = await userRepository.findUserByEmail(userData.email);
        
    if (!user) {
        return { status: "error", message: "user not users" };
    }

    if (typeof user === "string") {
        return { status: "error", message: user };
    }
    // {username: 'Sergey',email: "eihvh@gmail.com", password: "12345"}
    
    // $2y$10$VO4gSEnm72OgK8vKogYD0eYY7CkBfyNyw3rD/Mtv8HBIVhZdoibMO
    // $2y$10$safsdgsatsrvrgragfdgfdgrgreghregearg/Mtv8HBIVhZdoibMO
    // $алгоритм$раунды$соль/хешированные данные
    // "12345" - разная соль будет
    // "12345"
    
    // cost factor - раунды - число/цифра сколько раз будет хешироваться пароль
    // Salt - специальная строка нужна для того что бы различать захешированные пароли с одинаковым содержимым
    

    const hashedPassword = await hash(userData.password, 10)
    
    const hashedUserData = {
        ...userData ,
        password: hashedPassword
    }

    const newUser = await userRepository.createUser(hashedUserData);
    if (typeof newUser === "string") {
        return { status: "error", message: newUser };
    }

    if (!newUser) {
        return { status: "error", message: "User is user" };
    }

    const token = sign(String(newUser.id), SECRET_KEY, { expiresIn: "1d" })

    return { status: "ok", data: token };
}

const userService = {
    authLogin: authLogin,
    authRegistration: authRegistration
}

export default userService

