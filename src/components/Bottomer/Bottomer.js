import React from "react";
import "./Bottomer.css"; // Ensure the CSS file is correctly imported
import SearchPlaylist from "../SearchPlaylist/SearchPlaylist";

const Bottomer = ({ spotifyBoolean, handleSearch }) => {
  if (spotifyBoolean === true) {
    return <div className="bottomer">Celestial Symphony2</div>;
  } else {
    return <SearchPlaylist handleSearch={handleSearch} className="bottomer"></SearchPlaylist>;
  }
};

export default Bottomer;
