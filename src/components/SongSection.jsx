import React, { Fragment, useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { songData } from '../assets/assets';
import SongItem from './SongItem';
import { FaSpinner } from 'react-icons/fa';

const SongSection = ({ feature = 'ForYou' }) => {
  const songs = songData[feature] || [];
  const [searchText, setSearchText] = useState('');
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const delay = setTimeout(() => {
      const lowerSearch = searchText.toLowerCase();
      const filtered = songs.filter((song) =>
        song.name.toLowerCase().includes(lowerSearch) ||
        song.artist.toLowerCase().includes(lowerSearch)
      );
      setFilteredSongs(filtered);
      setLoading(false);
    }, 500);

    return () => clearTimeout(delay);
  }, [searchText, songs]);

  return (
    <section className='song-list'>
      <h2>{feature}</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search Song, Artist"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="submit">
          <BsSearch />
        </button>
      </form>

      <div className='songs'>
        {loading ? (
          <div className="loading">
            <FaSpinner className="spinner" size={50} />
          </div>
        ) : filteredSongs.length > 0 ? (
          filteredSongs.map((song) => (
            <Fragment key={song.id}>
              <SongItem
                name={song.name}
                image={song.image}
                id={song.id}
                file={song.file}
                artist={song.artist}
                duration={song.duration}
              />
            </Fragment>
          ))
        ) : (
          <p style={{color:'white'}}>No songs found for "{searchText}"</p>
        )}
      </div>
    </section>
  );
};

export default SongSection;
