const express = require('express')
const path = require('path')

const HOST = 'localhost'
const PORT = 8000

const products = [
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

const app = express()

app.use(express.json())

// устанавливаем шаблонизатор с помощью которого будут рендериться шаблоны (при res.render)
app.set("view engine", "ejs")

// устанавливаем местонахождение шаблонов для шаблонизатора (вместо дефолтного views)
app.set("views", path.resolve(__dirname, "./templates"))

// Настраиваем раздачу статических файлов по пути /static/,
// указывая директорию в которой лежат статик файлы (public)
app.use("/static/", express.static(path.resolve(__dirname, "./public")))

app.get("/", (req ,res) => {
    res.render("index")
})
app.get("/products", (req, res) => {
    // Query parameters
    console.log(req.query)
    //создаем переменные и передаем данные с помощью context
    const context = {
        products:products.slice(0, req.query.max)
    }
    //Рендерим шаблон а так же передаем данные для отображения
    res.render("products", context)
})
// Route parameters
app.get('/product/:id', (req, res) => {
    // Создаем константу, которая хранит id и получает её из route params
    const id = req.params.id
    // выводим id
    console.log(id)
    // создаем константу context, в которой храним продукт который передаем в шаблон
    const context = {
        // получаем product из массива products используем id продукта
        product:products[id-1],
    }
    // рендерим(отрисовываем) страничку с context
    res.render('product', context)
})

// обрабатываем пост запрос
app.post("/product/create", (req,res)=>{
    // выводим в консоль тело запроса
    console.log(req.body);
    // создаем константу с телом запроса
    const product = req.body
    // добавление нового элемента в список
    products.push({name: product.name, img: product.img, description: product.description})
    // отправляем ответ на запрос ввиде текста
    res.send("hello post woda")
})

// ejs - embedded javascript - встроенный JS
// {% for user in users %}
// <p>{{user.name}}</p>


app.listen(PORT, HOST, () => {
    console.log(`Listening on a port http://${HOST}:${PORT}`)
})