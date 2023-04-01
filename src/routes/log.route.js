import { Router} from "express";
import { body } from "express-validator";
import {createLog } from '../controllers/log.controller.js'


const logRouter = Router(); 

logRouter.post('/createLog', createLog);



export default logRouter;