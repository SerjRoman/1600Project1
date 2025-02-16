// const express = require('express')
// const path = require('path')
import express, { Express, Request, Response } from "express";
import path from "path";
import cookieParser from "cookie-parser";

import productRouter from "./ProductApp/productRouter"
import userRouter from "./UserApp/userRouter";
import productRouterApi from "./ProductApp/productRouterApi"
import categoryRouterApi from "./CategoryApp/categoryRouterApi"
import cors from "cors"

const HOST = 'localhost'
const PORT = 8000

const app = express()

app.use(cors({
    origin : ["http://localhost:3000"]
}))

app.use(express.json())

app.use(cookieParser())

// устанавливаем шаблонизатор с помощью которого будут рендериться шаблоны (при res.render)
app.set("view engine", "ejs")

// устанавливаем местонахождение шаблонов для шаблонизатора (вместо дефолтного views)
app.set("views", path.resolve(__dirname, "./templates"))

// Настраиваем раздачу статических файлов по пути /static/,
// указывая директорию в которой лежат статик файлы (public)
app.use("/static/", express.static(path.resolve(__dirname, "./public")))
app.use("/api/product/", productRouterApi)
app.use("/api/category/", categoryRouterApi)
app.use("/product/", productRouter)
app.use("/", userRouter)


app.get("/", (req: Request ,res: Response) => {
    res.render("index")
})
// ejs - embedded javascript - встроенный JS
// {% for user in users %}
// <p>{{user.name}}</p>


app.listen(PORT, HOST, () => {
    console.log(`Listening on a port http://${HOST}:${PORT}`)
})