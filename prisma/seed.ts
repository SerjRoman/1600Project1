import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient()

async function createOneCategory() {
    const category = await prisma.category.create({
        data: {
            name: 'ЧеловеПетающие'
        }
    })
}

async function createOneProduct(){
    const product = await prisma.product.create({
        data: {
            name: 'Mila',
            img: 'https://sputnik.kz/img/1024/24/10242489_147:82:1498:1568_1920x0_80_0_0_149c713da4cffa1fb7bee655c2484b24.jpg',
            description: 'For sale, cheap, 175 cm',
            categoryId: 2
        }
    })
}

async function getOneCategory() {
    const category = await prisma.category.findUnique({
        where: {
            id: 1
        }
    })
    console.log(category)
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

getOneCategory().then(() => {
    prisma.$disconnect()
}).catch((error) => {
    console.log(error)
    prisma.$disconnect()
})
