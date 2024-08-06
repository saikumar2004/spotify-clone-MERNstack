import {v2 as cloudinary} from 'cloudinary'
import albumModel from '../models/AlnumSchema.js'

const addAlbum=async(req,res)=>{
    try{
        const name=req.body.name;
        const desc=req.body.desc;
        const bgColor=req.body.bgColor;
        const imageFile=req.file;
        const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"});
        const albumData={
            name,
            desc,
            bgColor,
            image:imageUpload.secure_url

        }
        
        const album=albumModel(albumData);
        await album.save();
        res.json({success:true,message:"Album added"});
    }
    catch(err){
        res.json({success:false});
        console.log(err);

    }

}
const listAlbum=async(req,res)=>{
try{
   const allAlbums=await albumModel.find({});
   res.json({success:true,albums:allAlbums});
}catch(err){
    res.json({sucess:false});
}
}
const removeAlbum=async(req,res)=>{
    try{
        await albumModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"album deleted"})

    }
    catch(err){
        res.json({sucess:false});
    }

}
export {addAlbum,listAlbum,removeAlbum}