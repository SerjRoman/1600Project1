import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { SECRET_KEY } from "../config/token";


export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const cookies = req.cookies;
    if (cookies.token) { // если в cookies нет ключа token - вернется undefined во избежание ошибки
        const token = verify(cookies.token, SECRET_KEY)
        console.log(token);
        next();
        console.log("Авторизированный юзер");
    } else {
        res.sendStatus(403)
    }
}