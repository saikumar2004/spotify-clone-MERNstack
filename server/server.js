import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import songRouter from './src/routes/songRoutes.js';
import connectCloudinary from './src/config/cloudnary.js';
import userModel from './src/models/userSchema.js';
import albumRouter from './src/routes/albumRoutes.js';
import  mongoose from 'mongoose';



const app=express();

const corsOptions = {
    origin: '*'
  }
app.use(cors(corsOptions));


const port=process.env.PORT || 4006;

connectCloudinary();

app.use(express.json());



mongoose.connect(`${process.env.MONGODB_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tlsAllowInvalidCertificates: true 
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});


app.use("/api/song",songRouter);
app.use("/api/album",albumRouter);


app.post("/register", (req,res)=>{
    
  let user = req.body;
  bcrypt.genSalt(10,(err,salt)=>{
      if(!err)
      {
          bcrypt.hash(user.password,salt,async (err,hpass)=>{
              if(!err)
              {
                  user.password=hpass;
                  try 
                  {
                      let doc = await userModel.create(user)
                      res.status(201).send({message:"User Registered"})
                  }
                  catch(err){
                      console.log(err);
                      res.status(500).send({message:"Some Problem"})
                  }
              }
          })
      }
  })

  
})


// endpoint for login 

app.post("/login",async (req,res)=>{

  let userCred = req.body;

  try 
  {
      const user=await userModel.findOne({email:userCred.email});
      if(user!==null)
      {
          bcrypt.compare(userCred.password,user.password,(err,success)=>{
              if(success==true)
              {
                  jwt.sign({email:userCred.email},"spotifyapp",(err,token)=>{
                      if(!err)
                      {
                          res.send({message:"Login Success",token:token,userid:user._id,name:user.name});
                      }
                  })
              }
              else 
              {
                  res.status(403).send({message:"Incorrect password"})
              }
          })
      }
      else 
      {
          res.status(404).send({message:"User not found"})
      }


  }
  catch(err)
  {
      console.log(err);
      res.status(500).send({message:"Some Problem"})
  }
})
app.get('/',(req,res)=>res.send("API Working"))
app.listen(port,()=>console.log(`Server started on ${port}`))