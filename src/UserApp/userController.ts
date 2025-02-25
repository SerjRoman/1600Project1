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
    const result = await userService.authLogin(data.password, data.email)
    if (result.status == "error") {
        res.send(result.message)
    } else if (result.status == "ok") {
        res.cookie("token", result.data)
        res.sendStatus(200)
    }
}
// АВТОРИЗАЦИЯ
// Client -> POST -> Express
// Express -> проверяет данные/собирает ответ/отправляет ответ/создает токен
// Express -> {token:'sfsdfdbdh824utgrbtior'} -> Client сохраняет у себя токен

// GET headers: {Authorization: "Baerer TOKEN"}
// "OAuth" -> 401
// "" -> 401
// TOKEN ne valid -> 401



// Client использует токен, для получения данных о себе
// Client - отправляет запрос на express с токеном -> Express получает ID клиента из токена и выдает данные {name: string, email: string, avatar, ...}
// /api/user/me



function registerUser(req: Request, res: Response) {
    res.render("registration")
}

async function authRegisterUser(req: Request, res: Response) {
    const result = await userService.authRegistration(req.body)
    if (result.status == "error") {
        res.send(result.message)
    } else if (result.status == "ok") {
        res.cookie("token", result.data)
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