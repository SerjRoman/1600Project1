import { NextFunction, Request, Response } from "express";


export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const cookies = req.cookies;
    if (cookies?.token) { // если в cookies нет ключа token - вернется undefined во избежание ошибки
        // проверка валидности токена
        next();
        console.log("Авторизированный юзер");
    } else {
        res.sendStatus(403)
    }
}