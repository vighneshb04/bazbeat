import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SongList from './components/SongList';
import FullPlayer from './components/FullPlayer';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm) return;
    setLoading(true);
    setSongs([]);
    setSelectedSong(null);

    const url = `https://itunes.apple.com/search?media=music&limit=25&term=${encodeURIComponent(searchTerm)}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSongs(data.results);
    } catch (error) {
      console.error("Failed to fetch songs:", error);
      setSongs([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="bg-gradient" />
      <Header />
      <main>
        <AnimatePresence mode="wait">
          {selectedSong ? (
            <FullPlayer key="player" song={selectedSong} onBack={() => setSelectedSong(null)} />
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onSearch={handleSearch}
              />
              <SongList 
                songs={songs} 
                loading={loading} 
                searchTerm={searchTerm} 
                onSongClick={setSelectedSong} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}