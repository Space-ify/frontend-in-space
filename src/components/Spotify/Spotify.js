import "./Spotify.css"; // Ensure the CSS file is correctly imported

import React, { useState, useEffect } from "react";
import spotify from "../../photos/spotify.png";

const Spotify = ({ onePlanetData }) => {
  const [spotifyData, setSpotifyData] = useState("empty");

  const [albumCover, setAlbumCover] = useState(spotify);

  const domain = process.env.REACT_APP_DOMAIN;
  // const url = `${domain}/api/spotify/now-playing`;
  const url =
    "https://pyxis.nymag.com/v1/imgs/5a1/58c/580de90bf142c7660dcbaf8faa789a61b1-20-taylor-swift-1989.2x.w710.png";

  const fetchSpotify = async () => {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setSpotifyData(JSON.parse(data));
      } else {
        console.error("Failed to fetch Spotify data:", res.status);
      }
    } catch (error) {
      console.error("Error fetching Spotify data:", error);
    }
  };

  const fetchAlbumCover = async () => {
    try {
      const albumLink = spotifyData.albumCover;
      if (albumLink) {
        const res = await fetch(albumLink);
        if (res.ok) {
          const albumBlob = await res.blob();
          const albumObjectUrl = URL.createObjectURL(albumBlob);
          setAlbumCover(albumObjectUrl);
          setListening(true);
        } else {
          console.error("Failed to fetch album cover:", res.status);
        }
      } else {
        console.error("Album link not found in spotifyData");
      }
    } catch (error) {
      console.error("Error fetching album cover:", error);
    }
  };

  // useEffect(() => {
  //   fetchSpotify();
  //   const spotifyInterval = setInterval(fetchSpotify, 60000);
  //   return () => clearInterval(spotifyInterval);
  // }, []);

  // useEffect(() => {
  //   if (spotifyData) {
  //     fetchAlbumCover();
  //     const albumInterval = setInterval(fetchAlbumCover, 60000);
  //     return () => clearInterval(albumInterval);
  //   }
  // }, [spotifyData]);

  return (
    <div
      className="spotify-container"
      style={{
        marginTop: "2em",
      }}
    >
      <>
        <div className="listening"></div>
        <div className="spotify">
          <div className="image">
            {onePlanetData !== "empty" && (
              <img
                src={onePlanetData.image_url}
                style={{
                  width: "6em",
                  height: "6em",
                  borderRadius: "9px",
                  marginRight: "0.7em",
                }}
                alt="Album cover"
              />
            )}
          </div>
          <div className="text">
            <p style={{ color: "white" }} className="name">
              {onePlanetData.name}
            </p>
            <p className="buffer"></p>
            <p style={{ color: "white" }} className="author">
              {onePlanetData.artists}
            </p>
          </div>
        </div>
      </>
    </div>
  );

  // return (
  //   <div className="spotify-container">
  //     {!isListening ? (
  //       <>
  //         <div className="listening">
  //           <div className="text">
  //             <p>Now Listening To On Spotify:</p>
  //           </div>
  //         </div>
  //         <div className="spotify">
  //           <div className="image">
  //             <img src={spotify} alt="Album cover" />
  //           </div>
  //           <div className="text">
  //             <p className="name">Not Listening</p>
  //           </div>
  //         </div>
  //       </>
  //     ) : (
  //       <>
  //         <div className="listening">
  //           <p>Now Listening To On Spotify:</p>
  //         </div>
  //         <div className="spotify">
  //           <div className="image">
  //             <img src={spotifyData.albumCover} alt="Album cover" />
  //           </div>
  //           <div className="text">
  //             <a
  //               style={{ textDecoration: "none" }}
  //               href={spotifyData.songURL}
  //               target="_blank"
  //               rel="noopener noreferrer"
  //             >
  //               <p className="name songName">{spotifyData.songName}</p>
  //             </a>
  //             <p className="artist">{spotifyData.artistName}</p>
  //           </div>
  //         </div>
  //       </>
  //     )}
  //   </div>
  // );
};

export default Spotify;
