import mongoose, { Schema, model } from "mongoose";


const logSchama = new Schema ({

    senderAC : {
        required: true,
        type: String
    },
    type : {
        required: true,
        type: String
    },
    recieverAC : {
        required: true,
        type: String
    },
    amount:{
        required: true,
        type: Number
    }
})

const Log = mongoose.model('Log',logSchama);

export default Log;