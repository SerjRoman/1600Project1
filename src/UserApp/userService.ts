import userRepository from "./userRepository"
import { User, UserCreate } from "./types"
import { IOkWithData ,IError, IOk } from "../types/types"
import { hash , compare } from "bcryptjs"
import { SECRET_KEY } from "../config/token";
import { sign } from "jsonwebtoken";

async function authLogin(email: string, password: string): Promise<IOkWithData<string> | IError> {
    const user = await userRepository.findUserByEmail(email);

    if (!user) {
        return { status: "error", message: "User not users" };
    }
    if (typeof user === "string") {
        return { status: "error", message: user };
    }
    // user.password = $2y$10$VO4gSEnm72OgK8vKogYD0eYY7CkBfyNyw3rD/Mtv8HBIVhZdoibMO
    // password = "12345"
    // $2y - SHA256
    // $10 - round - cost factor
    // $VO4gSEnm72OgK8vKogYD0eYY7CkBfyNyw3rD - salt
    // Mtv8HBIVhZdoibMO - data
    const isMatch = await compare(password, user.password)

    if (!isMatch) {
        return { status: "error", message: "Passwords are not passwords" };
    }

    const token = sign({id: user.id}, SECRET_KEY, { expiresIn: "1d" })

    return { status: "ok", data: token };
}


async function getUserById (id : number):Promise <IOkWithData<User> | IError>{
    const user = await userRepository.findUserById(id)
    if (!user){
        return { status: "error", message: "user not found" };
    }
    if (typeof user === "string") {
        return { status: "error", message: user };
    }
    return {status : "ok" , data: user}
}



async function authRegistration(userData: UserCreate): Promise<IOkWithData<string> | IError> {
    const user = await userRepository.findUserByEmail(userData.email);
        
    if (user) {
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
        return { status: "error", message: "User is not user" };
    }

    const token = sign({id: newUser.id}, SECRET_KEY, { expiresIn: "1d" })

    return { status: "ok", data: token };
}

const userService = {
    authLogin: authLogin,
    authRegistration: authRegistration,
    getUserById :getUserById 
}

export default userService

