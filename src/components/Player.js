import React, { useState, useRef } from "react";

export default function Player({ song }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  if (!song) return null;
  if (!song.preview_url) return <div>No preview available</div>;

  const togglePlay = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="player glass-card">
      <button onClick={togglePlay}>
        {playing ? "⏸ Pause" : "▶️ Play"}
      </button>
      <audio ref={audioRef} src={song.preview_url} onEnded={() => setPlaying(false)} />
      <span>{song.name}</span>
    </div>
  );
}
