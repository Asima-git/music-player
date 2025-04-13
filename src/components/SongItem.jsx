import React, { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'

const SongItem = ({ name, image, id, artist, duration }) => {
    const {playWithId} = useContext(PlayerContext)
    return (
        <div className='song-item' onClick={()=>playWithId(id)}>
            <div className='info-box'>
                <figure>
                    <img src={image} alt='' />
                </figure>
                <div className='content'>
                    <p className='name'>{name}</p>
                    <span className='artist'>{artist}</span>
                </div>
            </div>
            <span  className='duration'>{duration}</span>
        </div>
    )
}

export default SongItem
