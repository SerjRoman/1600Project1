// Імпортуємо модуль Express для створення сервера
const express = require("express")

// Імпортуємо модуль path для роботи з шляхами файлів
const path = require("path")

// Створюємо об'єкт приложення Express
const app = express()

// Визначаємо хост і порт для запуску сервера
const HOST = "localhost"
const PORT = 8000
/* метод use подключает статические файлы,
первым агрументом передается ссылка по которой будут доступны статические файлы,
вторым агрументом используем метод експресса, который
создаст get запросы для каждого файла в указанной папке  */
app.use("/static/", express.static(path.resolve(__dirname, "./public")))

// Декларуємо маршрут для корневої сторінки
app.get('/', (req, res) => {
    // Надсилаємо файл index.html з папки templates
    res.sendFile(path.resolve(__dirname, "./templates/index.html"))
}) 
// Пирописуємо шлях до сторінки  products
app.get('/products/', (req, res) => {
    // Отправляем файл products.html по пути 
    // Папка относительно файлa server.js/templates/products.html
    res.sendFile(path.resolve(__dirname, "./templates/products.html"))
})
// Запускаємо сервер на заданому порті та хості
app.listen(PORT,HOST,()=>{
    console.log(`server is running on http://${HOST}:${PORT}`)
})