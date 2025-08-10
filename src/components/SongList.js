import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, Music } from 'lucide-react';
import SongItem from './SongItem';

export default function SongList({ songs, loading, searchTerm, onSongClick }) {
  if (loading) {
    return (
      <div className="song-list-message">
        <Loader2 size={40} style={{ animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }
  if (songs.length === 0 && searchTerm) {
    return (
      <div className="song-list-message">
        No songs found for "{searchTerm}".
      </div>
    );
  }
  if (songs.length === 0 && !searchTerm) {
    return (
      <div className="song-list-message">
        <Music size={48} style={{ marginBottom: '1rem' }} />
        <p>Search for a song or artist to get started.</p>
      </div>
    );
  }

  return (
    <motion.div
      layout
      className="song-list-container"
    >
      <AnimatePresence>
        {songs.map((song) => (
          <SongItem
            key={song.trackId}
            song={song}
            onClick={() => onSongClick(song)}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}