import {Router} from "express" 
import userControllerApi from "./userControllerApi"
const userApiRouter = Router()

userApiRouter.post("registration", userControllerApi.registerUser)
userApiRouter.post("login", userControllerApi.authUser)

export default userApiRouter