'use client';
import React, { useEffect, useRef, useState } from 'react';

const fullText = `My dearest Klyanne,

I am deeply in love with you.

Not in the fleeting, uncertain way that fades with seasons — but in the quiet, certain, unwavering way that grows stronger with every passing day.

You are my destination. When I imagine the future, every version of it has you in it. You are my sanctuary — the place where I am most myself, where I feel safest, where everything makes sense.

Heaven heard your name countless times in my prayers before I even knew it was you I was asking for. And when you finally came, I recognized you — not with my eyes, but with something deeper. Something that whispered: this is her.

You are not just the person I love. You are home.

And I promise you — I will spend every day making sure you know it.

Forever yours,
with every heartbeat.

— For Klyanne 💙`;

const FinalLetterSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
            setIsTyping(true);
            entry.target.querySelectorAll('.section-reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 150);
            });
          }
        });
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!isTyping) return;

    const type = () => {
      if (indexRef.current < fullText.length) {
        setDisplayedText(fullText.slice(0, indexRef.current + 1));
        indexRef.current++;
        const char = fullText[indexRef.current - 1];
        const delay = char === '.' || char === ',' || char === '\n' ? 60 : 22;
        timerRef.current = setTimeout(type, delay);
      } else {
        setIsTyping(false);
      }
    };

    timerRef.current = setTimeout(type, 800);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isTyping]);

  return (
    <section
      id="letter"
      ref={sectionRef}
      className="py-24 px-5 md:px-12 relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #fce4ec 0%, #f0f7ff 40%, #e8f4fd 100%)',
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(91,141,217,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-12 section-reveal">
          <span
            className="text-xs font-semibold uppercase tracking-[0.5em] block mb-4"
            style={{ color: 'var(--primary)', opacity: 0.7 }}
          >
            A letter
          </span>
          <h2
            className="font-script"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: 'var(--foreground)' }}
          >
            For You, Always
          </h2>
          <div
            className="w-20 h-px mx-auto mt-4"
            style={{ background: 'linear-gradient(to right, transparent, var(--accent), transparent)' }}
          />
        </div>

        {/* Letter card */}
        <div
          className="relative p-8 md:p-12 rounded-3xl section-reveal"
          style={{
            background: 'rgba(255,255,255,0.9)',
            border: '1px solid rgba(91,141,217,0.15)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(91,141,217,0.12)',
          }}
        >
          {/* Paper lines decoration */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden"
            style={{ opacity: 0.03 }}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-full"
                style={{
                  top: `${(i + 1) * 5}%`,
                  height: '1px',
                  background: 'var(--foreground)',
                }}
              />
            ))}
          </div>

          {/* Letter content */}
          <div
            className="relative z-10 font-light leading-relaxed whitespace-pre-line text-sm md:text-base"
            style={{ color: 'var(--foreground)', fontFamily: 'var(--font-sans)', lineHeight: 2 }}
          >
            {displayedText}
            {isTyping && (
              <span
                className="typewriter-cursor inline-block w-0.5 h-5 ml-0.5 align-middle"
                style={{ background: 'var(--primary)' }}
              />
            )}
          </div>
        </div>

        {/* Final heart */}
        {!isTyping && displayedText.length > 0 && (
          <div className="text-center mt-10 animate-fade-in-up">
            <div
              className="font-script"
              style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', color: 'var(--accent)' }}
            >
              ♡ Always ♡
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FinalLetterSection;