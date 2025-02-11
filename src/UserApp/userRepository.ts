import { client, getErrorMessage } from "../client/prismaClient"
import { Prisma } from "@prisma/client"

async function findUserByEmail(email: string) {
    try {
        const user = await client.user.findUnique({
            where: {
                email: email
            }
        });
        return user;
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            const errorMessage = getErrorMessage(err.code);
            console.log(errorMessage);
            return errorMessage;
        }
        console.log(err);
        return "error";
    }
}

async function createUser(data: Prisma.UserCreateInput) {
    try {
        const user = await client.user.create({
            data: data
        });
        return user;
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            const errorMessage = getErrorMessage(err.code);
            console.log(errorMessage);
            return errorMessage;
        }
        console.log(err);
        return "error";
    }
}


const userRepository = {
    findUserByEmail,
    createUser
}

export default userRepository