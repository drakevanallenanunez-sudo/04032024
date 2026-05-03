'use client';
import React, { useEffect, useRef } from 'react';

const FloatingHearts: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const heartChars = ['♡', '♥', '❤', '💙', '🤍'];
    let intervalId: ReturnType<typeof setInterval>;

    const spawnHeart = () => {
      const heart = document.createElement('div');
      const char = heartChars[Math.floor(Math.random() * heartChars.length)];
      heart.textContent = char;
      const size = Math.random() * 16 + 10;
      const startX = Math.random() * 100;
      const duration = Math.random() * 8 + 6;
      const drift = (Math.random() - 0.5) * 120;

      heart.style.cssText = `
        position: fixed;
        left: ${startX}vw;
        bottom: -40px;
        font-size: ${size}px;
        color: ${Math.random() > 0.5 ? '#f4a7b9' : '#7ab3e8'};
        opacity: ${Math.random() * 0.4 + 0.2};
        pointer-events: none;
        z-index: 1;
        animation: particleRise ${duration}s ease-out forwards;
        --drift: ${drift}px;
        will-change: transform, opacity;
      `;

      container.appendChild(heart);
      setTimeout(() => {
        if (container.contains(heart)) container.removeChild(heart);
      }, duration * 1000);
    };

    intervalId = setInterval(spawnHeart, 2200);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};

export default FloatingHearts;