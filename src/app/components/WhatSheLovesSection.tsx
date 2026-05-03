'use client';
import React, { useEffect, useRef } from 'react';

const attributes = [
  { icon: '👁️', label: 'My Eyes', desc: 'She sees kindness in them — a gentle, honest soul she trusts completely.' },
  { icon: '✨', label: 'My Hair', desc: 'The way it falls, effortlessly perfect — she loves running her fingers through it.' },
  { icon: '🎙️', label: 'My Voice', desc: 'Warm and familiar — the sound that makes every moment feel safe and home-like.' },
  { icon: '😊', label: 'My Smile', desc: 'The smile that first made her heart skip — she still feels it every time.' },
  { icon: '😄', label: 'My Laugh', desc: 'Pure joy in sound form — contagious, genuine, her favorite melody.' },
  { icon: '🤗', label: 'All of Me', desc: 'She loves me — every part, every layer, the whole beautiful person I am.' },
];

const WhatSheLovesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.section-reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="she-loves"
      ref={sectionRef}
      className="py-24 px-5 md:px-12 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #f0f7ff 0%, #fce4ec 100%)' }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(244,167,185,0.12) 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 section-reveal">
          <span
            className="text-xs font-semibold uppercase tracking-[0.5em] block mb-4"
            style={{ color: 'var(--accent)', opacity: 0.8 }}
          >
            Reflected love
          </span>
          <h2
            className="font-script"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: 'var(--foreground)' }}
          >
            What She Loves About Me
          </h2>
          <div
            className="w-20 h-px mx-auto mt-4"
            style={{ background: 'linear-gradient(to right, transparent, var(--accent), transparent)' }}
          />
          <p
            className="mt-6 text-sm font-light leading-relaxed mx-auto max-w-md"
            style={{ color: 'var(--muted-foreground)' }}
          >
            Through her eyes, I see myself differently — seen, loved, and enough.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {attributes.map((attr, i) => (
            <div
              key={attr.label}
              className={`group p-7 rounded-2xl section-reveal stagger-${Math.min(i + 1, 5)} text-center cursor-default`}
              style={{
                background: 'rgba(255,255,255,0.85)',
                border: '1px solid rgba(244,167,185,0.2)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(-8px)';
                el.style.boxShadow = '0 20px 50px rgba(244,167,185,0.25)';
                el.style.borderColor = 'rgba(244,167,185,0.5)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
                el.style.borderColor = 'rgba(244,167,185,0.2)';
              }}
            >
              <span className="text-4xl block mb-4">{attr.icon}</span>
              <h4
                className="font-script mb-3"
                style={{ fontSize: '2rem', color: 'var(--primary)', lineHeight: 1.1 }}
              >
                {attr.label}
              </h4>
              <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                {attr.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatSheLovesSection;