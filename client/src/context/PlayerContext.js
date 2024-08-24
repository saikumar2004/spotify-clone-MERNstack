import { createContext, useRef, useState, useEffect } from "react";
import axios from "axios";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef(null);
  const seekBg = useRef(null);
  const seekBar = useRef(null);

  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [track, setTrack] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  function play() {
    if (audioRef.current) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  }

  function pause() {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  }

  const playWithId = async (id) => {
    const selectedTrack = songsData.find((item) => item._id === id);
    if (selectedTrack) {
      setTrack(selectedTrack);
      if (audioRef.current) {
        await audioRef.current.play();
        setPlayStatus(true);
      }
    }
  };

  const previous = async () => {
    const currentIndex = songsData.findIndex((item) => item._id === track._id);
    if (currentIndex > 0) {
      setTrack(songsData[currentIndex - 1]);
      if (audioRef.current) {
        await audioRef.current.play();
        setPlayStatus(true);
      }
    }
  };

  const next = async () => {
    const currentIndex = songsData.findIndex((item) => item._id === track._id);
    if (currentIndex < songsData.length - 1) {
      setTrack(songsData[currentIndex + 1]);
      if (audioRef.current) {
        await audioRef.current.play();
        setPlayStatus(true);
      }
    }
  };

  const seeksong = async (e) => {
    if (audioRef.current && seekBg.current) {
      audioRef.current.currentTime =
        (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
        audioRef.current.duration;
    }
  };

  const getSongsData = async () => {
    try {
      const response = await axios.get(
        `https://spotify-clone-mernstack-1.onrender.com/api/song/list`
      );
      const songs = response.data.songs;
      setSongsData(songs);
      if (songs.length > 0) {
        setTrack(songs[0]);
      }
    } catch (error) {
      console.error("Error fetching songs data:", error);
    }
  };

  const getAlbumData = async () => {
    try {
      const response = await axios.get(
        `https://spotify-clone-mernstack-1.onrender.com/api/album/list`
      );
      setAlbumsData(response.data.albums);
    } catch (error) {
      console.error("Error fetching album data:", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (audioRef.current && seekBar.current) {
        audioRef.current.ontimeupdate = () => {
          if (audioRef.current.duration) {
            seekBar.current.style.width =
              Math.floor(
                (audioRef.current.currentTime / audioRef.current.duration) *
                  100
              ) + "%";
            setTime({
              currentTime: {
                second: Math.floor(audioRef.current.currentTime % 60),
                minute: Math.floor(audioRef.current.currentTime / 60),
              },
              totalTime: {
                second: Math.floor(audioRef.current.duration % 60),
                minute: Math.floor(audioRef.current.duration / 60),
              },
            });
          }
        };
      }
    }, 1000);
  }, [audioRef]);

  useEffect(() => {
    getSongsData();
    getAlbumData();
  }, []);

  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seeksong,
    songsData,
    albumsData,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
