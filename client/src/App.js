import { useContext } from "react";
import Display from "./components/display";
import Player from "./components/Player";
import Slidebar from "./components/Slidebar";
import { PlayerContext } from "./context/PlayerContext";

function App() {
  const { audioRef, track, songsData } = useContext(PlayerContext);
  return (
    <div className="h-screen bg-black">
      {
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

      <audio ref={audioRef} src={track?track.file:""} preload='auto'></audio>
    </div>
  );
}

export default App;
