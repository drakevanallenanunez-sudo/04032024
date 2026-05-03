'use client';
import React, { useEffect, useRef } from 'react';

const rules = [
  { icon: '💬', title: 'Always Communicate', desc: 'No matter how hard the conversation, we speak our hearts.' },
  { icon: '🤝', title: 'Never Break Promises', desc: 'Our word is our bond — sacred and unbreakable.' },
  { icon: '🌙', title: "Don\'t Sleep Heavy", desc: 'We resolve before rest. No heavy hearts at bedtime.' },
  { icon: '🛡️', title: 'Trust Each Other', desc: 'Trust is the foundation everything else is built upon.' },
  { icon: '💙', title: 'Stay Faithful', desc: 'Our hearts belong to each other, always and only.' },
];

const LoveNotesSection: React.FC = () => {
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

  const poeticLines = [
    'Home is not four walls or doors,',
    'Home is her—whom I adore.',
    'Her eyes, her smile, her laughter…',
    'She is my sanctuary.',
    'In the quiet of her presence,',
    'I have found everything.',
  ];

  return (
    <section
      id="love-notes"
      ref={sectionRef}
      className="py-24 px-5 md:px-12 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #f0f7ff 0%, #fce4ec 50%, #f0f7ff 100%)' }}
    >
      {/* Background glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(91,141,217,0.07) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(244,167,185,0.1) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Poetic text section */}
        <div className="text-center mb-20">
          <span
            className="text-xs font-semibold uppercase tracking-[0.5em] block mb-4 section-reveal"
            style={{ color: 'var(--primary)', opacity: 0.7 }}
          >
            From my heart
          </span>
          <div className="space-y-3">
            {poeticLines.map((line, i) => (
              <p
                key={i}
                className={`font-script section-reveal stagger-${Math.min(i + 1, 5)}`}
                style={{
                  fontSize:
                    i === 1 || i === 3
                      ? 'clamp(2.5rem, 6vw, 5rem)'
                      : 'clamp(1.8rem, 4vw, 3.5rem)',
                  color: i % 2 === 1 ? 'var(--primary)' : 'var(--foreground)',
                  lineHeight: 1.2,
                  textShadow:
                    i % 2 === 1
                      ? '0 0 30px rgba(91,141,217,0.3)'
                      : 'none',
                  fontStyle: i % 2 === 0 ? 'normal' : 'italic',
                }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Things I love about her */}
        <div className="mb-20 section-reveal">
          <div className="text-center mb-12">
            <h2
              className="font-script"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', color: 'var(--foreground)' }}
            >
              Things I Love About You
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: '👁️',
                title: 'Your Eyes',
                text: 'Brown, deep, and endless — like looking into the most honest place in the world. I could get lost in them forever.',
              },
              {
                icon: '😊',
                title: 'Your Smile',
                text: 'The kind of smile that makes the entire room brighter without trying. It is my favorite sight in the world.',
              },
              {
                icon: '😄',
                title: 'Your Laughter',
                text: 'Pure and genuine — it is the sound I want to wake up to for the rest of my life.',
              },
              {
                icon: '🎵',
                title: 'Your Passion',
                text: 'The way your eyes light up when you talk about music, books, or something you care about deeply. That fire in you is breathtaking.',
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`p-6 rounded-2xl section-reveal stagger-${i + 1}`}
                style={{
                  background: 'rgba(255,255,255,0.8)',
                  border: '1px solid rgba(91,141,217,0.15)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <h4
                      className="font-script mb-2"
                      style={{ fontSize: '1.8rem', color: 'var(--primary)', lineHeight: 1.1 }}
                    >
                      {item.title}
                    </h4>
                    <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Relationship Rules */}
        <div>
          <div className="text-center mb-12 section-reveal">
            <span
              className="text-xs font-semibold uppercase tracking-[0.5em] block mb-4"
              style={{ color: 'var(--accent)', opacity: 0.8 }}
            >
              Our foundation
            </span>
            <h2
              className="font-script"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', color: 'var(--foreground)' }}
            >
              Our Rules
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rules.map((rule, i) => (
              <div
                key={rule.title}
                className={`rule-card rounded-2xl p-6 section-reveal stagger-${i + 1}`}
              >
                <span className="text-3xl block mb-3">{rule.icon}</span>
                <h4
                  className="font-script mb-2"
                  style={{ fontSize: '1.8rem', color: 'var(--primary)', lineHeight: 1.1 }}
                >
                  {rule.title}
                </h4>
                <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                  {rule.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoveNotesSection;