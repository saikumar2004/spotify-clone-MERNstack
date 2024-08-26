import React, { useContext ,useEffect,useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import Display from "./components/display";
import Player from "./components/Player";
import Slidebar from "./components/Slidebar";
import Login from './components/Login';
import Register from './components/Register';
import {UserContext } from './context/UserContext';
import { PlayerContext } from "./context/PlayerContext";

function App() {
  const { audioRef, track, songsData } = useContext(PlayerContext);
  const [loggedUser,setLoggedUser]=useState(JSON.parse(localStorage.getItem("spotify-user")));
  // console.log(loggedUser);
    useEffect(()=>{
      console.log(loggedUser);
    },[loggedUser])
  return (
    
    <div className="h-screen bg-black">
      
      <UserContext.Provider value={{loggedUser,setLoggedUser}}>
      <Routes>
      <Route path="/spotify-clone-MERNstack" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
       
        <Route
          path="/*"
          element={
            songsData.length !== 0
              ? <>
                  <div className="h-[90%] flex">
                    <Slidebar />
                    <Display />
                  </div>
                  <Player />
                </>
              : null
          }
        />
        
      </Routes>
      <audio ref={audioRef} src={track ? track.file : ""} preload="auto"></audio>
      </UserContext.Provider>
    </div>
   
  );
}

export default App;
