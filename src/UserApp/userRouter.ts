import express ,{Router} from "express" 
import userController from "./userController"

const router:Router = Router()

router.get("/login", userController.loginUser)
router.post("/login", userController.authUser)

export default router


