import { Schema } from "mongoose";

const jobSchema = new Schema({
    jobTitle: {
        required: true,
        type: String,
    },
    jobStatus:{
        required: true,
        type: String,
    },
    jobType:{
        required: true,
        type: String,
    }

})

export default jobSchema;