import { Router} from "express";
import { body } from "express-validator";
import { CurrentUser, LoginUser, RegisterUser } from "../controllers/user.control.js";
import { authGuard, validate } from "../utils/validator.js";

const userRouter = Router(); 

userRouter.get('/currunt-user' , authGuard , CurrentUser);

userRouter.post('/register' , validate([
    body('email').isEmail() , 
    body('password').isLength({min:8})
]), RegisterUser);

userRouter.post('/login' , LoginUser)
 


export default userRouter;