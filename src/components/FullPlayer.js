import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Heart, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const getSongImage = (song) => {
  if (song && song.artworkUrl100) {
    return song.artworkUrl100.replace('100x100bb', '600x600bb');
  }
  return "https://placehold.co/600x600/1e293b/d1d5db?text=No+Art";
};

export default function FullPlayer({ song, onBack }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [progress, setProgress] = useState(0);

  const image = getSongImage(song);
  const [bgImage, setBgImage] = useState(image);

  useEffect(() => {
    let cancelled = false;
    setAudioUrl(null);
    setPlaying(false);

    if (song.previewUrl) {
      setAudioUrl(song.previewUrl);
    } else {
      setAudioUrl(null);
    }
    setBgImage(image);

    return () => {
      cancelled = true;
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPlaying(false);
    };
  }, [song, image]);

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().then(() => {
        setPlaying(true);
      }).catch(error => {
        console.error("Autoplay prevented:", error);
        setPlaying(false);
      });
    }
  }, [audioUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener('timeupdate', updateProgress);
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
    };
  }, [audioUrl]);

  const handleProgressClick = (e) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const progressContainer = e.target.closest('.progress-bar-container').getBoundingClientRect();
    const clickPosition = e.clientX - progressContainer.left;
    const newTime = (clickPosition / progressContainer.width) * audio.duration;
    audio.currentTime = newTime;
  };

  return (
    <motion.div 
      className="player-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="player-background" style={{ backgroundImage: `url(${bgImage})` }} />
      <button className="player-back-button" onClick={onBack}>
        <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} />
        Search
      </button>
      <div className="player-card">
        <img
          src={image}
          alt={song.trackName}
          className="player-cover"
          onError={e => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/600x600/1e293b/d1d5db?text=No+Art";
          }}
        />
        <h2 className="player-title">{song.trackName}</h2>
        <p className="player-artist">{song.artistName}</p>

        {audioUrl ? (
          <>
            <audio ref={audioRef} src={audioUrl} onEnded={() => setPlaying(false)} className="hidden" />
            <div className="progress-bar-container" onClick={handleProgressClick}>
              <div className="progress-bar" style={{ width: `${progress}%` }} />
              <div className="progress-thumb" style={{ left: `${progress}%` }} />
            </div>
            <div className="player-controls">
              <button className="like-button">
                <Heart size={20} fill="white" />
              </button>
              <button
                className="play-button"
                onClick={() => {
                  if (playing) { audioRef.current.pause(); } else { audioRef.current.play(); }
                  setPlaying(!playing);
                }}
              >
                {playing ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" />}
              </button>
              <button className="like-button">
                <Heart size={20} fill="white" />
              </button>
            </div>
          </>
        ) : (
          <p className="player-no-preview">No preview available for this song.</p>
        )}
      </div>
    </motion.div>
  );
}