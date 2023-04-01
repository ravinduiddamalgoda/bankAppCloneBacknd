import mongoose, { Schema } from "mongoose";


const accountSchema =  new Schema({
    accountNo: {
        required:true,
        type:String
    },
    ownersEmail:{
        required:true,
        type:String
    },
    amount:Number 
});

const Account =  mongoose.model('Account' , accountSchema);

export default Account;