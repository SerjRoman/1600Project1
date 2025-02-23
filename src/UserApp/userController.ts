import { Request, Response } from "express"
import userService from "./userService"
import { sign } from "jsonwebtoken"
import { SECRET_KEY } from "../config/token"

function loginUser(req: Request, res: Response) {
    res.render("login")
}

async function authUser(req: Request, res: Response) {
    console.log(req.body)
    const data = req.body
    const user = await userService.authLogin(data.password, data.email)
    if (user.status == "error") {
        res.send(user.message)
    } else if (user.status == "ok") {
        const token = sign(user, SECRET_KEY, { expiresIn: "1h" })
        res.cookie("token", token)
        res.sendStatus(200)
    }
}
// АВТОРИЗАЦИЯ
// Client -> POST -> Express
// Express -> проверяет данные/собирает ответ/отправляет ответ/создает токен
// Express -> {token:'sfsdfdbdh824utgrbtior'} -> Client сохраняет у себя токен



// Client использует токен, для получения данных о себе
// Client - отправляет запрос на express с токеном -> Express получает ID клиента из токена и выдает данные {name: string, email: string, avatar, ...}
// /api/user/me



function registerUser(req: Request, res: Response) {
    res.render("registration")
}

async function authRegisterUser(req: Request, res: Response) {
    const register = await userService.authRegistration(req.body)
    if (register.status == "error") {
        res.send(register.message)
    } else if (register.status == "ok") {
        const token = sign(register, SECRET_KEY, { expiresIn: "1h" })
        res.cookie("token", token)
        res.sendStatus(200)
    }
}

const userController = {
    loginUser,
    authUser,
    registerUser,
    authRegisterUser
}

export default userController