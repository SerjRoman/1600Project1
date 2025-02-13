import { client } from "../client/prismaClient";
import { Prisma } from "@prisma/client";
import { getErrorMessage } from "../tools/getErrorMessage";

async function findUserByEmail(email: string) {
    try {
        const user = await client.user.findUnique({
            where: {
                email: email,
            },
        });
        return user;
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            const errorMessage = getErrorMessage(err.code);
            console.log(errorMessage);
            return errorMessage;
        }
        console.log(err);
        return "Unexpected error";
    }
}

async function createUser(data: Prisma.UserCreateInput) {
    try {
        const user = await client.user.create({
            data: data,
        });
        return user;
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            const errorMessage = getErrorMessage(err.code);
            console.log(errorMessage);
            return errorMessage;
        }
        console.log(err);
        return "Unexpected error";
    }
}

const userRepository = {
    findUserByEmail,
    createUser,
};

export default userRepository;
