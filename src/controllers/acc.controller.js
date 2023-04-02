import AccountService from "../service/account.service.js";
import Account from "../models/account.js";

export const findAmount = async (req, res) => { 
    try{
        const { email } = req.body;
        const exitingAcc = await AccountService.findAccByEmail(email);

        if(exitingAcc){
            return res.status(200).json(exitingAcc);
        }else{
            return res.status(400).send({ err: 'Not Found'});
        }
    }catch(err){

        res.status(400).send({ err: err });
    }

}
