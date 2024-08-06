import { createContext, useRef,useState,useEffect} from "react";
import axios from 'axios';

export const PlayerContext=createContext();

const PlayerContextProvider=(props)=>{
    const audioRef=useRef();
    const seekBg=useRef();
    const seekBar=useRef();

    // const url='https://spotify-clone-backend-1-qvgq.onrender.com/';
    

    const [songsData,setSongsData]=useState([]);
    const[albumsData,setAlbumsData]=useState([]);

    const [track,setTrack]=useState(songsData[0]);
    const[playStatus,setPlayStatus]=useState(false);
    const[time,setTime]=useState({
        currentTime:{
            second:0,
            minute:0
        },
        totalTime:{
            second:0,
            minute:0
        }
    })
    function play(){
        audioRef.current.play();
        setPlayStatus(true);
    }
    function pause(){
    audioRef.current.pause();
    setPlayStatus(false);
    }
    const playWithId=async(id)=>{
        await songsData.map((item)=>{
            if(id===item._id){
               setTrack(item); 
            }

        })
        await audioRef.current.play();
        setPlayStatus(true);
    }
    const previous=async()=>{
       songsData.map(async(item,index)=>{
        if(track._id===item._id && index>0){
            await setTrack(songsData[index-1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
       })
    }
    const seeksong=async(e)=>{
        audioRef.current.currentTime=((e.nativeEvent.offsetX/seekBg.current.offsetWidth)*audioRef.current.duration)
    }
const getSongsData=async()=>{
    try {
        const response=await axios.get(`http://localhost:4002/api/song/list`);
         setSongsData(response.data.songs);
         setTrack(response.data.songs[0]);
         
    } catch (error) {
        
    }
}
const getAlbumData=async()=>{
    try {
        const response=await axios.get(`http://localhost:4002/api/album/list`);
        setAlbumsData(response.data.albums);
    } catch (error) {
        
    }
}

    const next=async()=>{
        songsData.map(async(item,index)=>{
            if(track._id===item._id && index<songsData.length){
                await setTrack(songsData[index+1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
           })
    }
    useEffect(()=>{
        setTimeout(()=>{
       audioRef.current.ontimeupdate=()=>{
        seekBar.current.style.width=(Math.floor(audioRef.current.currentTime/audioRef.current.duration*100))+"%"
        setTime({
            currentTime:{
                second:Math.floor(audioRef.current.currentTime%60),
                minute:Math.floor(audioRef.current.currentTime/60),
            },
            totalTime:{
                second:Math.floor(audioRef.current.duration%60),
                minute:Math.floor(audioRef.current.duration/60),
            }
        })
       }
        },1000)
    },[audioRef])
    useEffect(()=>{
      getSongsData();getAlbumData()
    },[])
    const contextValue={
        audioRef,
        seekBg,
        seekBar,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,pause,
        playWithId,
        previous,
        next,
        seeksong,
        songsData,
        albumsData
    }
    return(
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}
export default PlayerContextProvider;
