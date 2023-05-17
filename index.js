
import bodyParser from 'body-parser';
import express from 'express'; 
import mongoose from 'mongoose';
import userRouter from './src/routes/user.route.js';
import logRouter from './src/routes/log.route.js';
import cors from 'cors';
import accRoute from './src/routes/account.route.js';
import Stripe from "stripe";
import dotenv from "dotenv";
//import userRouter from './src/controllers/user.control';
//import userRouter from './src/controllers/user.control';
//const userRouter = require('./src/controllers/user.control');
// require("dotenv").config();    

const env = dotenv.config({ path: "./.env" });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

const app =  express();
app.use(cors());
app.use(bodyParser.json());
const url = 'mongodb+srv://userBank:1234@bankapp.lrmrpna.mongodb.net/?retryWrites=true&w=majority';
app.use(express.static(process.env.STATIC_DIR));
const port = 5000;

async function connectDB(url , connectionParams){
    
       await mongoose.connect(url , connectionParams);       
       // console.log("DB Connected");
}

// connectDB(url);
connectDB(url , {}).then(()=>{

    console.log("Database Connected");
    app.listen(port , ()=>{
        console.log("Listening on port 5000");
    });
}).catch((err)=>{
    console.error('Connection Error',err);
})
 

app.use(userRouter)
app.use('/log' , logRouter)
app.use('/acc' , accRoute)

app.get("/config", (req, res) => {
    res.send({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  });


  app.post("/create-payment-intent", async (req, res) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        currency: "INR",
        amount: 50,
        automatic_payment_methods: { enabled: true },
      });
  
      // Send publishable key and PaymentIntent details to client
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (e) {
      return res.status(400).send({
        error: {
          message: e.message,
        },
      });
    }
  });
  
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
 
          
