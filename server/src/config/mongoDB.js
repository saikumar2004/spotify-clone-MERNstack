import mongoose from "mongoose";
const connectDB=async()=>{
    mongoose.connection.on('connected',()=>{
        console.log("connection Established")
    })
    await mongoose.connect(`${process.env.MONGODB_URI}`);
}

export default connectDB;