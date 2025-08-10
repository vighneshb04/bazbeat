import React, { useState } from "react";
import Header from "./components/Header";
import SongList from "./components/SongList";
import Player from "./components/Player";
import "./style.css";

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  const bgUrl = currentSong?.album.images[0]?.url || "";

  return (
    <div 
      className="App" 
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      <div className="overlay" />
      <Header onSearch={setSongs} />
      <SongList songs={songs} onClickSong={setCurrentSong} />
      <Player song={currentSong} />
    </div>
  );
}

export default App;
