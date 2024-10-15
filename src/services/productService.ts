// В сервисе хранится логика работы которую хендлер просто вызывает и возвращает результат по http
// Например в сервисе может определяться логика (набор действий) которая произойдет при добавлении поста
// К примеру это может быть сохранение в бд после которого идет оповещение всех пользователей по email
// и вместо того что бы писать подобную логику в обработчике, ее следует писать именно в так называемый слой бизнес логики (наш сервис)
// Логика в сервисе ни от чего не зависит и к примеру если вы захотите создать вдобавок к вебсайту десктоп приложение,
// оно будет переиспользовать все ту же логику


const products:{
            id:Number,
            name:string,
            img:string,
            description:string}[] = [
    {
        id: 1,
        name: 'Mila',
        img: 'https://sputnik.kz/img/1024/24/10242489_147:82:1498:1568_1920x0_80_0_0_149c713da4cffa1fb7bee655c2484b24.jpg',
        description: 'For sale, cheap, 175 cm'
    },
    {
        id: 2,
        name: 'Yarik Tek',
        img: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Bundesarchiv_Bild_101I-299-1805-16,_Nordfrankreich,_Panzer_VI_%28Tiger_I%29_cropped.jpg',
        description: 'For sale, expensive, 182 cm'
    },
    {
        id: 3,
        name: 'Nikita',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZvViAs8p5cJ_SnrYg_yNrycXq1CGlXNDVlA&s',
        description: 'Not for sale, priceless, one meter with a cap'
    },
]

function getProductById (id:number) {
    console.log(id)
    const context = {
        product:products[id-1],
    }
    return context
}
function getAllProducts (max?: number) {
    if (!max) {
        max = products.length
    }
    const context = {
        products:products.slice(0, max)
    }
    return context
}

function createProduct(product:{id:Number,
    name:string,
    img:string,
    description:string}) {;
    products.push(product)
    return "Hello woda"
}

export = {
    getProductById, 
    getAllProducts,
    createProduct 
}