import express from "express"
import categoryController from "./categoryController"
import { authMiddleware } from "../middlewares/authMiddleware"

const router = express.Router()

router.use(authMiddleware)

router.get("/create", categoryController.createCategory)
router.get("/all", categoryController.getAllCategories)
