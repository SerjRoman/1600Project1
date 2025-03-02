import userService from "./userService"
import { Request, Response } from "express"

// {email: '', password: ''}

async function authUser(req : Request , res : Response){
    // {email: '', password: '12345'}
    const data = req.body
    const result = await userService.authLogin(data.email, data.password)
    res.json(result) // {status: '', data: 'TOKEN'}
}

async function registerUser(req : Request , res : Response){
    // {username: '', email: '', password: '12345'}
    const data = req.body
    const result = await userService.authRegistration(data)
    res.json(result)
}
async function getUser(req : Request , res : Response){
    const userId = res.locals.userId
    const result = await userService.getUserById(userId)
    res.json(result)
}

// data {token: string}
// id=5

// React -> TOKEN: POST {body: token} /user/me
// Express -> token
// /user/me -> {username: string, email: string, image: string}


// /user/me GET -> {username: '', email:''} на основе ID
// token -> id

// middleware = промежуточный обработчик 
// Получили запрос -> middlewares -> Контроллер
// /user/me != token 
// 


const userControllerApi = {
    registerUser: registerUser,
    authUser: authUser,
    getUser: getUser
}
export default userControllerApi