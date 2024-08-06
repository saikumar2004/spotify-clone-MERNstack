import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import songRouter from './src/routes/songRoutes.js';
import connectDB from './src/config/mongoDB.js';
import connectCloudinary from './src/config/cloudnary.js';
import albumRouter from './src/routes/albumRoutes.js';

const app=express();
app.use(cors());
const port=process.env.PORT || 4002;
connectDB();
connectCloudinary();

app.use(express.json());




app.use("/api/song",songRouter);
app.use("/api/album",albumRouter);

app.get('/',(req,res)=>res.send("API Working"))
app.listen(port,()=>console.log(`Server started on ${port}`))