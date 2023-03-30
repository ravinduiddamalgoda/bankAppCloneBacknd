
import bodyParser from 'body-parser';
import express from 'express'; 
import mongoose from 'mongoose';
import userRouter from './src/routes/user.route.js';

//import userRouter from './src/controllers/user.control';
//import userRouter from './src/controllers/user.control';
//const userRouter = require('./src/controllers/user.control');
// require("dotenv").config();
const app =  express();

app.use(bodyParser.json());
const url = 'mongodb+srv://user_dev:test123@jobclone.u4tnvcc.mongodb.net/?retryWrites=true&w=majority';
const port = 3000;

async function connectDB(url , connectionParams){
    
       await mongoose.connect(url , connectionParams);
       
       // console.log("DB Connected");
}

// connectDB(url);
connectDB(url , {}).then(()=>{

    console.log("Database Connected");
    app.listen(port , ()=>{
        console.log("Listening on port 3000");
    });
}).catch((err)=>{
    console.error('Connection Error',err);
})
 

app.use(userRouter)

// async function connectDb(){

//     await mongoose.connect(url);

// }

// connectDb().then(async() => {
//     console.log('Database Connected');
//     app.listen(port , ()=>{
//         console.log("Listening on port 3000");
//     });
    
// }).catch((err) => {
//     console.log('Connection Error' , err);
// })






// app.listen(port , ()=>{
//         console.log("Listening on port 3000");
// });
 
          
