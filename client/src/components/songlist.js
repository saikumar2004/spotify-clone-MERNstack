import React, { useContext } from 'react';
import Navbar from './Navbar';
import SongItem from './SongItem';
import { PlayerContext } from '../context/PlayerContext';
function Songslist(){

  const {songsData}= useContext(PlayerContext);
  return (
    <>
      <Navbar/>
      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>All Songs</h1>
        <div className='grid grid-cols-2 md:grid-cols-5 gap-3 overflow-auto'>
              {songsData.map((item,index)=>(<SongItem key={index} name={item.name} desc={item.desc} id={item._id} image={item.image} />))} 
        </div>
      </div>
    </>
  );
}

export default Songslist;
