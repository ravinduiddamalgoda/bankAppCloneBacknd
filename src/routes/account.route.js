import { Router } from "express";
import { findAmount } from "../controllers/acc.controller.js";
import { authGuard } from "../utils/validator.js";



const accRoute = Router();

accRoute.get('/getAcc' , authGuard , findAmount)

export default accRoute;