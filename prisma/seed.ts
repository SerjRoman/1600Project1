import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient()

// async function createOneCategory() {
//     const category = await prisma.category.create({
//         data: {
//             name: 'ЧеловеПетающие'
//         }
//     })
// }


async function getOneCategory() {
    const category = await prisma.category.findUnique({
        where: {
            id: 1
        }
    })
    console.log(category)
}

async function createUser() {
    const user = await prisma.user.create({
        data : {
        username: "Yaroslav VELLIKIY",
        email : "example@gmail.com",
        password : "12345"
        }
    })
}

async function getOneCategoryWithProducts() {
    const category = await prisma.category.findUnique({
        where: {
            id: 2
        },
        include: {
            products: true
        }
    })
    console.log(category)
}

createUser().then(() => {
    prisma.$disconnect()
}).catch((error) => {
    console.log(error)
    prisma.$disconnect()
})
