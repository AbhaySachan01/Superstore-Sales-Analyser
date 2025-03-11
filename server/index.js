import mongoose from "mongoose";
import express from 'express';
import 'dotenv/config';
import cors from 'cors';

const app=express();
const PORT = 3000;
app.get('/',(req,res)=>{
    res.send("hello world");
})

app.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`);
})