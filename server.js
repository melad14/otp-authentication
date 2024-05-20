process.on('uncaughtException',(err)=>{
console.log(err);
})

import express from 'express'
import { conn } from './databases/dbConnection/db.connection.js'
import  mongoose  from 'mongoose';
import userRouter from "./src/modules/users/user.router.js"
import * as dotenv from 'dotenv'
import { AppErr } from './src/utils/AppErr.js';
import { globalErr } from './src/middleware/globalErr.js';
import cors from "cors"
const app = express()
const port = 3000

dotenv.config()
mongoose.set('strictQuery', true);

app.use(cors())

app.use(express.json())


app.use('/',userRouter);




app.all('*',(req,res,next)=>{
   next(new AppErr("not found",404))
 });



 app.use(globalErr)

conn();

app.listen(process.env.PORT||port, () => console.log(`runing.....`))

process.on('unhandledRejection',(err)=>{
console.log(err);
})