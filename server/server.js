import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import songRouter from './src/routes/songRoutes.js';
// import connectDB from './src/config/mongoDB.js';
import connectCloudinary from './src/config/cloudnary.js';
import albumRouter from './src/routes/albumRoutes.js';
import  mongoose from 'mongoose';


const app=express();
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access-control-allow-origin");
//     next();
// });
const corsOptions = {
    origin: '*'
  }
app.use(cors(corsOptions));


const port=process.env.PORT || 4006;
// connectDB();
connectCloudinary();

app.use(express.json());



mongoose.connect(`${process.env.MONGODB_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tlsAllowInvalidCertificates: true // Add this option if needed
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});


app.use("/api/song",songRouter);
app.use("/api/album",albumRouter);

app.get('/',(req,res)=>res.send("API Working"))
app.listen(port,()=>console.log(`Server started on ${port}`))