'use client';

import React, { useState, useEffect } from 'react';

interface WebLockProps {
  onUnlock: () => void;
}

const CORRECT_USERNAME = 'klyanne';
const CORRECT_PASSWORD = 'april3';

export default function WebLock({ onUnlock }: WebLockProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      username.trim().toLowerCase() === CORRECT_USERNAME &&
      password === CORRECT_PASSWORD
    ) {
      setError('');
      onUnlock();
    } else {
      setError('Incorrect username or password. Try again, love. 💙');
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
    }
  };

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #e8f4fd 0%, #f0e6f6 30%, #fce4ec 60%, #e3f2fd 100%)',
        }}
      />

      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-200 select-none"
            style={{
              left: `${(i * 8.3) % 100}%`,
              top: `${(i * 13 + 5) % 90}%`,
              fontSize: `${1 + (i % 3) * 0.5}rem`,
              opacity: 0.4 + (i % 3) * 0.1,
              animation: `floatHeart ${4 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            ♡
          </div>
        ))}
      </div>

      {/* Card */}
      <div
        className={`relative z-10 w-full max-w-sm mx-4 ${shaking ? 'animate-shake' : ''}`}
        style={{
          background: 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(20px)',
          borderRadius: '2rem',
          border: '1px solid rgba(255,255,255,0.9)',
          boxShadow:
            '0 8px 40px rgba(173,216,230,0.35), 0 2px 12px rgba(255,182,193,0.2)',
          padding: '2.5rem 2rem',
        }}
      >
        {/* Lock icon */}
        <div className="flex justify-center mb-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background:
                'linear-gradient(135deg, #b3d9f7 0%, #f9c6d0 100%)',
              boxShadow: '0 4px 20px rgba(173,216,230,0.4)',
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1
          className="text-center mb-1"
          style={{
            fontFamily: 'var(--font-great-vibes)',
            fontSize: '2.2rem',
            color: '#7bafd4',
            lineHeight: 1.2,
          }}
        >
          For Your Eyes Only
        </h1>
        <p
          className="text-center mb-6 text-sm"
          style={{ color: '#a0b4c8', fontFamily: 'var(--font-dm-sans)' }}
        >
          This little corner of the internet is just for us 💙
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-xs font-medium mb-1.5"
              style={{ color: '#8aabca', fontFamily: 'var(--font-dm-sans)', letterSpacing: '0.05em' }}
            >
              USERNAME
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError('');
              }}
              placeholder="enter your name..."
              autoComplete="username"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
              style={{
                background: 'rgba(179,217,247,0.15)',
                border: '1.5px solid rgba(179,217,247,0.5)',
                color: '#4a7a9b',
                fontFamily: 'var(--font-dm-sans)',
              }}
              onFocus={(e) => {
                e.target.style.border = '1.5px solid rgba(179,217,247,0.9)';
                e.target.style.background = 'rgba(179,217,247,0.25)';
              }}
              onBlur={(e) => {
                e.target.style.border = '1.5px solid rgba(179,217,247,0.5)';
                e.target.style.background = 'rgba(179,217,247,0.15)';
              }}
            />
          </div>

          <div>
            <label
              className="block text-xs font-medium mb-1.5"
              style={{ color: '#8aabca', fontFamily: 'var(--font-dm-sans)', letterSpacing: '0.05em' }}
            >
              PASSWORD
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="our little secret..."
                autoComplete="current-password"
                className="w-full px-4 py-3 pr-12 rounded-xl text-sm outline-none transition-all duration-200"
                style={{
                  background: 'rgba(249,198,208,0.15)',
                  border: '1.5px solid rgba(249,198,208,0.5)',
                  color: '#4a7a9b',
                  fontFamily: 'var(--font-dm-sans)',
                }}
                onFocus={(e) => {
                  e.target.style.border = '1.5px solid rgba(249,198,208,0.9)';
                  e.target.style.background = 'rgba(249,198,208,0.25)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '1.5px solid rgba(249,198,208,0.5)';
                  e.target.style.background = 'rgba(249,198,208,0.15)';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-blue-400 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p
              className="text-xs text-center py-2 px-3 rounded-lg"
              style={{
                color: '#e07a8a',
                background: 'rgba(249,198,208,0.3)',
                fontFamily: 'var(--font-dm-sans)',
              }}
            >
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-medium text-sm transition-all duration-300 mt-2"
            style={{
              background:
                'linear-gradient(135deg, #b3d9f7 0%, #f9c6d0 100%)',
              color: 'white',
              fontFamily: 'var(--font-dm-sans)',
              letterSpacing: '0.05em',
              boxShadow: '0 4px 15px rgba(173,216,230,0.4)',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.boxShadow =
                '0 6px 25px rgba(173,216,230,0.6)';
              (e.target as HTMLButtonElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.boxShadow =
                '0 4px 15px rgba(173,216,230,0.4)';
              (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
            }}
          >
            Enter My Heart 💙
          </button>
        </form>

        {/* Hint */}
        <p
          className="text-center text-xs mt-4"
          style={{ color: '#b8cfe0', fontFamily: 'var(--font-dm-sans)' }}
        >
          hint: think of our special date 🗓️
        </p>
      </div>

      <style jsx>{`
        @keyframes floatHeart {
          0%, 100% { transform: translateY(0px) rotate(-5deg); }
          50% { transform: translateY(-18px) rotate(5deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-8px); }
          30% { transform: translateX(8px); }
          45% { transform: translateX(-6px); }
          60% { transform: translateX(6px); }
          75% { transform: translateX(-3px); }
          90% { transform: translateX(3px); }
        }
        .animate-shake {
          animation: shake 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97);
        }
      `}</style>
    </div>
  );
}
