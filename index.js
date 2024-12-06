import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config()

const app = express();

const mongoUrl = process.env.MONGODB_URI

mongoose.connect(mongoUrl,{})

const connection = mongoose.connection;

connection.once("open",()=>{
  console.log("Database connected");
})


app.use(bodyParser.json())

app.use(
  (req,res,next)=>{

  const token =  (req.header("Authorization"))?.replace("Bearer ", "")
  console.log(token)

  if(token != null){
    jwt.verify(token, process.env.SECRET, (error, decoded)=>{
      if(!error){
        req.user = decoded
      }
    })
  }
  next()
  }
)

app.use("/api/products",productRouter)
app.use("/api/users",userRouter)




app.listen(
  5000,
  ()=>{
    console.log('Server is running on port 5000');
  }
)
