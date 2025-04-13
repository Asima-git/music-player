import { createContext, useEffect, useRef, useState } from "react";
import { songData } from "../assets/assets";
export const PlayerContext = createContext();

const PlayContextProvider = (props)=>{
    const audioRef = useRef()
    const seekBg = useRef()
    const seekBar = useRef()
    const [track,setTrack] = useState(songData['ForYou'][0])
    const [currentCategory, setCurrentCategory] = useState("ForYou");
    const [playStatus,setPlayStatus] = useState(false)
    const [time,setTime] = useState({
        currentTime : {
            second:0,
            minute:0
        },
        totalTime:{
            second:0,
            minute:0
        }
    })
    const [favourites, setFavourites] = useState(() => {
      const saved = localStorage.getItem('favourites');
      return saved ? JSON.parse(saved) : [];
    });
    const play = ()=>{
        audioRef.current.play()
        setPlayStatus(true)
    }
    const pause = ()=>{
        audioRef.current.pause()
        setPlayStatus(false)
    }

    const playWithId = async (id) => {
        let foundTrack = null;
        let categoryKey = null;
        for (const category in songData) {
          const track = songData[category].find(song => song.id === id);
          if (track) {
            foundTrack = track;
            categoryKey = category;
            break;
          }
        }
        if (foundTrack) {
          await setTrack(foundTrack);
          audioRef.current.play();
          setPlayStatus(true);
          setCurrentCategory(categoryKey); 
        } else {
          console.warn("Track not found");
        }
      };
    const previous = async () => {
        const currentList = songData[currentCategory];
        const currentIndex = currentList.findIndex(song => song.id === track.id);
        if (currentIndex > 0) {
          const prevTrack = currentList[currentIndex - 1];
          setTrack(prevTrack);
          audioRef.current.play();
          setPlayStatus(true);
        }
      };
      
      const next = async () => {
        const currentList = songData[currentCategory];
        const currentIndex = currentList.findIndex(song => song.id === track.id);
        if (currentIndex < currentList.length - 1) {
          const nextTrack = currentList[currentIndex + 1];
          setTrack(nextTrack);
          console.log(nextTrack)
          audioRef.current.play();
          setPlayStatus(true);
        }
      };
      
       const seekSong = async(e)=>{
          audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth)*audioRef.current.duration)
       }
    useEffect(()=>{
        setTimeout(() => {
            audioRef.current.ontimeupdate = ()=>{
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime/audioRef.current.duration*100))+"%"
                setTime({
                    currentTime : {
                        second:Math.floor(audioRef.current.currentTime%60),
                        minute:Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime:{
                        second:Math.floor(audioRef.current.duration%60),
                        minute:Math.floor(audioRef.current.duration / 60)
                    }
                })
            }
        }, 1000);
    },[audioRef])

    const toggleFavourite = (track) => {
      let updatedFavourites;
    
      const alreadyAdded = favourites.some(song => song.id === track.id);
    
      if (alreadyAdded) {
        updatedFavourites = favourites.filter(song => song.id !== track.id);
      } else {
        updatedFavourites = [...favourites, track];
      }
    
      setFavourites(updatedFavourites);
      localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    };
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
      play,pause,
      playWithId,
      previous,
      next,
      seekSong,
      favourites,
     toggleFavourite,
    }
 return (
    <PlayerContext.Provider value={contextValue}>
        {props.children}
    </PlayerContext.Provider>
 )
}
 export default PlayContextProvider