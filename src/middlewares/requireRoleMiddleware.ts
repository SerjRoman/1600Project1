import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

interface User {
    role: string
}

function requireRoleMiddleware(role: string): (req: Request, res: Response, next: NextFunction) => void {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = res.locals.user
        if (!user) {
            res.sendStatus(401)
        } else if ((user as User).role !== role) {
            res.sendStatus(405)
        } else {
            next()
        }
    }
}