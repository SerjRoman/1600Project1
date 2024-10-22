import {Request,Response} from "express"

function loginUser(req:Request,res:Response){
    res.render("login")
}

function authUser(req:Request, res:Response){
    console.log(req.body)
    res.cookie("token", "mysecrettoken")
    res.sendStatus(200)
}

const userController={
    loginUser,
    authUser
}

export default userController