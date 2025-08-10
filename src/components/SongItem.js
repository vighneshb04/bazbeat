import React from 'react';
import { motion } from 'framer-motion';

const getSongImage = (song) => {
  if (song && song.artworkUrl100) {
    return song.artworkUrl100.replace('100x100bb', '600x600bb');
  }
  return "https://placehold.co/600x600/1e293b/d1d5db?text=No+Art";
};

export default function SongItem({ song, onClick }) {
  const image = getSongImage(song);
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="song-item"
      onClick={onClick}
    >
      <div className="song-image-container">
        <img
          src={image}
          alt={song.trackName}
          className="song-image"
          onError={e => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/600x600/1e293b/d1d5db?text=No+Art";
          }}
        />
      </div>
      <div className="song-title">
        {song.trackName}
      </div>
      <div className="song-artist">
        {song.artistName}
      </div>
    </motion.div>
  );
}