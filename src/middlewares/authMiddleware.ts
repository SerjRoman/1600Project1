import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { SECRET_KEY } from "../config/token";

interface IToken {
    id : number,
    username: string,
    email: string,
    password: string,
    iat: number,
    exp: number,
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const cookies = req.cookies;
    if (cookies.token) { // если в cookies нет ключа token - вернется undefined во избежание ошибки
        const token = verify(cookies.token, SECRET_KEY) as IToken
        console.log(token);
        res.locals.user = {
            id: token.id,
            username: token.username,
            email: token.email,
            password: token.password,
        }
        next();
        console.log("Авторизированный юзер");
    } else {
        res.sendStatus(403)
    }
}