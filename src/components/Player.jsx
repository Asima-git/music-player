import React, { useContext } from 'react';
import { HiDotsHorizontal } from "react-icons/hi";
import { TbPlayerTrackPrevFilled, TbPlayerTrackNextFilled } from "react-icons/tb";
import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { PlayerContext } from '../context/PlayerContext';

const Player = () => {
    const {
        seekBar,
        seekBg,
        playStatus,
        play,
        pause,
        track,
        time,
        previous,
        next,
        seekSong
    } = useContext(PlayerContext);

    return (
        <section className='player-section'>
            <h2>{track?.name || 'No Track Selected'}</h2>
            <p className='player-artist'>{track?.artist || 'Unknown Artist'}</p>
            <figure>
                <img
                    src={track?.image || 'https://via.placeholder.com/150'}
                    alt={track?.name || 'Track Image'}
                />
            </figure>

            <div className='timline-bar' onClick={seekSong} ref={seekBg}>
                <hr ref={seekBar} />
            </div>
            <div className='player-bottom'>
                <div className='left'>
                    <HiDotsHorizontal size={24} />
                </div>
                <div className='middle'>
                    <TbPlayerTrackPrevFilled size={24} onClick={previous} />
                    {playStatus ? (
                        <FaCirclePause size={40} onClick={pause} />
                    ) : (
                        <FaCirclePlay size={40} onClick={play} />
                    )}
                    <TbPlayerTrackNextFilled size={24} onClick={next} />
                </div>
                <div className='right'>
                    <HiMiniSpeakerWave size={24} />
                </div>
            </div>
        </section>
    );
};

export default Player;
