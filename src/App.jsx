import Player from "./components/Player";
import SideBar from "./components/SideBar";
import SongSection from "./components/SongSection";
import { useLocation } from 'react-router-dom';
import { PlayerContext } from "./context/PlayerContext";
import { useContext } from "react";

function App() {
  const { audioRef, track } = useContext(PlayerContext);
  const location = useLocation();
  const path = location.pathname.substring(1);

  return (
    <main style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {track?.image && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${track.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px)',
            zIndex: 0,
          }}
        />
      )}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(108.18deg, rgba(32, 22, 6, 0.9) 2.46%, rgba(0, 0, 0, 0.95) 99.84%)',
          zIndex: 1,
        }}
        className="bg-gradient"
      />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <SideBar />
          <SongSection feature={path} />
        <Player />
      </div>
      <audio ref={audioRef} src={track?.file} preload="auto"></audio>
    </main>
  );
}

export default App;
