import { client } from "../client/prismaClient"
import { Prisma } from "@prisma/client"


async function findUserEmail(email: string){
    try {
        const user = await client.user.findUnique({
            where: {
                email: email
            }
        })
        return user    
    }catch (err){
        if (err instanceof Prisma.PrismaClientKnownRequestError){
            if (err.code === "P2002"){
                console.log(err.message)
                throw err
            }else if ( err.code === "P2003"){
                console.log(err.message)
                throw err
            }
        }
    }
}


async function createUser(data: Prisma.UserCreateInput){
    try {
        const user = await client.user.create({
            data: data
        })
        return user
    }catch (err){
        if (err instanceof Prisma.PrismaClientKnownRequestError){
            if (err.code === "P2002"){
                console.log(err.message)
                throw err
            }else if ( err.code === "P2003"){
                console.log(err.message)
                throw err
            }
        }
    }
} 


const userRepository = {
    findUserEmail, 
    createUser 
}

export default userRepository
