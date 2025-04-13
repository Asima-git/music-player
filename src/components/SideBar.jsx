import React from 'react'
import { FaSpotify } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
const SideBar = () => {
  return (
    <nav className='nav-bar'>
      <div className="logo">
        <FaSpotify size={40}/>
        <h6>Spotify</h6>
      </div>
      <ul className='feature-list'>
        <NavLink to="/ForYou">For You</NavLink>
        <NavLink to="/TopTracks">Top Tracks</NavLink>
        <NavLink to="/Favourites">Favourites</NavLink>
        <NavLink to="/RecentlyPlayed">Recently Played</NavLink>
      </ul>
    </nav>
  )
}

export default SideBar
