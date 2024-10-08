import React, { useEffect, useRef, useContext } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import DisplayHome from './DisplayHome';
import DisplayAlbum from './DisplayAlbum';
import { PlayerContext } from '../context/PlayerContext';
import Songslist from './songlist';
import Private from './Private'
// import NotFound from './NotFound';
function Display() {
  const { albumsData } = useContext(PlayerContext);
  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split('/').pop() : "";
  const album = isAlbum && albumsData.length > 0 ? albumsData.find((x) => x._id === albumId) : null;
  const bgColour = isAlbum && albumsData.length > 0 ? albumsData.find((x) => (x._id === albumId)).bgColor : "#121212"
  useEffect(() => {
    if (isAlbum) {
      displayRef.current.style.background = `linear-gradient(${bgColour},#121212)`
    }
    else {
      displayRef.current.style.background = `#121212`;
    }
  }, [isAlbum, album, bgColour])
  return (
    <div ref={displayRef} className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
      {albumsData.length > 0
        ?
        <Routes>
          {/* <Route path='/home' element={<DisplayHome />} /> */}
          <Route path='/home' element={<Private  Component={DisplayHome} />} />
    <Route path='/songslist' element={<Private Component={Songslist}/>} />
    <Route 
    path='/album/:id' 
    element={
        <Private 
            Component={DisplayAlbum} 
            album={album}
        />    } 
/>
{/* <Route path='*' element={<NotFound/>}/> */}
          {/* <Route path='/songslist' element={<Songslist/>} /> */}
          {/* <Route path='/album/:id' element={<DisplayAlbum album={albumsData.find((x) => (x._id === albumId))} />} /> */}
        </Routes>

        : null

      }

    </div>
  );
}

export default Display;
