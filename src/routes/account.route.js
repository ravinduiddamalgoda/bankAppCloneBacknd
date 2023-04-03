import { Router } from "express";
import { findACC } from "../controllers/acc.controller.js";
import { authGuard } from "../utils/validator.js";
import Account from "../models/account.js";



const accRoute = Router();

accRoute.get('/accDetail' , authGuard , findACC);

accRoute.put('/:email' , authGuard , async (req , res)=> {
    try{
        const email = req.params['email'];
        
        const {amount} = req.body;

        const data = await Account.findOneAndUpdate({ ownersEmail: email }, { amount: amount });
        res.json(data);

    }catch(err){
        res.status(400).send({err: err})
    }

})

export default accRoute;