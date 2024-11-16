import express from "express";
import categoryController from "./categoryController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.use(authMiddleware);

router.post("/create", categoryController.createCategory); // Змінив GET на POST
router.get("/all", categoryController.getAllCategories);

export default router;
