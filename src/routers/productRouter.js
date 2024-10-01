const express = require("express")
const productControllers = require("../controllers/productController")

const router = express.Router()

router.get("/:id", productControllers.getProductById)
router.get("/all", productControllers.getAllProducts)
router.post("/create", productControllers.createProduct)

module.exports = router