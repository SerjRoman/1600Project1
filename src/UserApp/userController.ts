import {Request,Response} from "express"
import userService from "./userService"
import { sign } from "jsonwebtoken"
import { SECRET_KEY } from "../config/token"

interface IUserData{
    username: string,
    email: string,
    password: string
}

function loginUser(req:Request,res:Response){
    res.render("login")
}

async function authUser(req:Request, res:Response){
    console.log(req.body)
    const data = req.body
    const user = await userService.authLogin(data.password, data.email)
    if (user.status == "error") {
        res.send(user.message)
    } else if (user.status == "ok") {
        const token = sign(user.user, SECRET_KEY, {expiresIn : "1h"})
        res.cookie("token", token)
        res.sendStatus(200)
    }
}

function registerUser(req:Request, res:Response){
    res.render("registration")
}

async function authRegisterUser(req:Request, res:Response){
    const data = req.body as IUserData 
    const register = await userService.authRegistration(data)
    if (register.status == "error"){
        res.send(register.message)
    } else if (register.status == "ok"){
        const token = sign(register.user, SECRET_KEY, {expiresIn : "1h"})
        res.cookie("token", token)
        res.sendStatus(200)
    }
}

const userController={
    loginUser,
    authUser,
    registerUser,
    authRegisterUser
}

export default userController