import React from "react";
import SongItem from "./SongItem";

export default function SongList({ songs, onClickSong }) {
  return (
    <div className="song-list">
      {songs.map((song) => (
        <SongItem key={song.id} song={song} onClick={() => onClickSong(song)} />
      ))}
    </div>
  );
}
