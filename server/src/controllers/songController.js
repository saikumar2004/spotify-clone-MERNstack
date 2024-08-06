import {v2 as cloudinary} from 'cloudinary';
import songModel  from '../models/songModel.js';
const addSong=async(req,res)=>{
    try{
        const name=req.body.name;
        const desc=req.body.desc;
        const album=req.body.album;
        const audioFile=req.files.audio[0];
        const imageFile=req.files.image[0];
     const audioUpload=await cloudinary.uploader.upload(audioFile.path,{resource_type:"video"});
     const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"});
    //  console.log(name,desc,album,audioFile,imageFile,audioUpload,imageUpload)
    const duration=`${Math.floor(audioUpload.duration/60)}:${Math.floor(audioUpload.duration%60)}`
      const songData={
        name,
        desc,
        album,
        image:imageUpload.secure_url,
        file:audioUpload.secure_url,
        duration
      }
      const song=songModel(songData);
      await song.save();
      res.json({sucess:true,message:"Song Added"});
    }catch(err){
           res.json({sucess:false})
    }
 
}
const listSong=async(req,res)=>{
    try{
          const allSongs=await songModel.find({});
        console.log(allSongs);
          res.json({sucess:true,songs:allSongs});

    }
    catch(err){
        res.json({sucess:false});

    }

}
const removeSong=async(req,res)=>{
    try{
        await songModel.findByIdAndDelete(req.body.id);
        res.json({sucess:true,message:"Song removed"});

    }catch(err){
        res.json({sucess:false});
    }

}


export{addSong,listSong,removeSong}
