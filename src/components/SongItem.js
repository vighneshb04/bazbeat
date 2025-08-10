import React from "react";

export default function SongItem({ song, onClick }) {
  return (
    <div className="song-item" onClick={onClick}>
      <img src={song.album.images[1]?.url} alt={song.name} />
      <div>
        <p>{song.name} — {song.artists[0].name}</p>
      </div>
    </div>
  );
}
