import express from "express"
import productControllersApi from "./productControllerApi"

const router = express.Router()

router.get("/all", productControllersApi.getAllProducts)
router.get("/:id", productControllersApi.getProductById)

export default router