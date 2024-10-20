import express from "express"
import productControllers from "./productController"

const router = express.Router()

router.get("/all", productControllers.getAllProducts)
router.post("/create", productControllers.createProduct)
router.get("/:id", productControllers.getProductById)

export default router