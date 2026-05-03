'use client';
import React, { useEffect, useRef, useState } from 'react';

const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.15;
    audio.loop = true;

    // Try autoplay after a small delay
    const timer = setTimeout(() => {
      audio.play().then(() => {
        setIsPlaying(true);
        setHasInteracted(true);
      }).catch(() => {
        // Autoplay blocked — wait for user interaction
        setIsPlaying(false);
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setHasInteracted(true);
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      {/* Hidden audio element — source should be a hosted audio file */}
      <audio
        ref={audioRef}
        preload="auto"
        aria-label="Background music: Panata by Tothapi"
      >
        {/* 
          To enable background music, host the audio file and replace the src below.
          Example: <source src="/audio/panata.mp3" type="audio/mpeg" />
          The song "Panata" by Tothapi is available on Spotify and Apple Music.
          For autoplay, you need to self-host the audio file.
        */}
        <source src="/audio/panata.mp3" type="audio/mpeg" />
      </audio>

      {/* Music toggle button */}
      <button
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center"
        style={{
          background: 'rgba(255,255,255,0.85)',
          border: '1px solid rgba(91,141,217,0.3)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 20px rgba(91,141,217,0.2)',
          transition: 'all 0.3s ease',
        }}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        title={isPlaying ? 'Pause: Panata by Tothapi' : 'Play: Panata by Tothapi'}
      >
        {isPlaying ? (
          /* Animated waveform when playing */
          <span className="flex items-end gap-0.5 h-5">
            <span className="wave-bar" />
            <span className="wave-bar" />
            <span className="wave-bar" />
            <span className="wave-bar" />
            <span className="wave-bar" />
          </span>
        ) : (
          /* Music note when paused */
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        )}
      </button>

      {/* Tooltip for first visit */}
      {!hasInteracted && (
        <div
          className="fixed bottom-20 right-6 z-50 px-3 py-2 rounded-xl text-xs font-medium animate-fade-in-up"
          style={{
            background: 'rgba(255,255,255,0.9)',
            border: '1px solid rgba(91,141,217,0.2)',
            backdropFilter: 'blur(10px)',
            color: 'var(--muted-foreground)',
            boxShadow: '0 4px 16px rgba(91,141,217,0.15)',
            maxWidth: '160px',
            textAlign: 'center',
          }}
        >
          🎵 Tap to play<br />
          <span style={{ opacity: 0.7 }}>Panata — Tothapi</span>
        </div>
      )}
    </>
  );
};

export default MusicPlayer;