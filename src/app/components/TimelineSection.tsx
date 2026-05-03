'use client';
import React, { useEffect, useRef, useState } from 'react';

const timelineEvents = [
  {
    date: 'October 10, 2023',
    title: 'First Conversation',
    emoji: '💬',
    description:
      'The beginning of everything. The first words exchanged that would slowly unravel into a love story neither of us expected. You said hellaurrr, and somehow the universe shifted.',
    color: '#7ab3e8',
  },
  {
    date: 'December 26, 2023',
    title: 'The Confession',
    emoji: '💙',
    description:
      'My heart was racing. I told you how I felt — every word carefully chosen, yet somehow still falling short of what I truly meant. You listened, and that was enough.',
    color: '#5b8dd9',
  },
  {
    date: 'December 28, 2023',
    title: 'First Date & Photobooth',
    emoji: '📸',
    description:
      'Our first date — the nervous smiles, the laughter that felt so natural, and the photobooth strips that captured moments we would treasure forever. You were radiant.',
    color: '#f4a7b9',
  },
  {
    date: 'December 29, 2023',
    title: 'First Movie Together',
    emoji: '🎬',
    description:
      'Mamma Mia — and the whole time I was barely watching the screen. I was too busy stealing glances at you, memorizing the way your face lit up with every song.',
    color: '#e8a0b0',
  },
  {
    date: 'January 2, 2024',
    title: 'She Confessed',
    emoji: '🌸',
    description:
      'You told me how you felt. In that moment, the world went quiet, even the waves and my friends voices seems muted and all I could hear was my own heartbeat saying yes, yes, yes. You chose me too.',
    color: '#c8dff7',
  },
  {
    date: 'January 4, 2024',
    title: 'The Hug',
    emoji: '🫂',
    description:
      'The first time you let me hold you — arms wrapped around each other, time suspended. I never wanted to let go. That hug was a promise without words.',
    color: '#7ab3e8',
  },
  {
    date: 'January 11, 2024',
    title: 'First Hand Holding',
    emoji: '🤝',
    description:
      'Your hand in mine. Such a small thing, yet it felt like the entire universe conspired to make that moment happen. I held on carefully, afraid it was a dream.',
    color: '#f4a7b9',
  },
  {
    date: 'February 1, 2024',
    title: 'First Kiss',
    emoji: '💋',
    description:
      'You kissed my cheek; randomly. Soft. Gentle. Everything I imagined and more. A kiss that tasted like the beginning of forever — like coming home after a very long journey.',
    color: '#e8a0b0',
  },
  {
    date: 'February 7, 2024',
    title: "Meeting your parents",
    emoji: '🌹',
    description:
      'The time you introduced me to your parents. Nervous but excited, I hoped to make a good impression. You smiled at me, and everything felt right.',
    color: '#f4a7b9',
  },
  {
    date: 'April 3, 2024',
    title: 'She Said YES 💍',
    emoji: '💍',
    description:
      'The day you officially became mine and I became yours. When you said yes, every prayer, every quiet wish, every dream I ever had — they all came true at once.',
    color: '#5b8dd9',
    special: true,
  },
];

const TimelineSection: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.section-reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="py-24 px-5 md:px-12 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fce4ec 0%, #f0f7ff 100%)' }}
    >
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(244,167,185,0.1) 0%, transparent 70%)' }}
      />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 section-reveal">
          <span
            className="text-xs font-semibold uppercase tracking-[0.5em] block mb-4"
            style={{ color: 'var(--primary)', opacity: 0.7 }}
          >
            Our journey
          </span>
          <h2
            className="font-script"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: 'var(--foreground)' }}
          >
            Our Love Story
          </h2>
          <div
            className="w-20 h-px mx-auto mt-4"
            style={{ background: 'linear-gradient(to right, transparent, var(--accent), transparent)' }}
          />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px"
            style={{
              background: 'linear-gradient(to bottom, transparent, var(--primary) 10%, var(--accent) 90%, transparent)',
              transform: 'translateX(-50%)',
            }}
          />

          <div className="space-y-6">
            {timelineEvents.map((event, index) => {
              const isExpanded = expandedIndex === index;
              const isRight = index % 2 === 0;

              return (
                <div
                  key={event.date}
                  className={`relative flex items-start gap-4 section-reveal stagger-${Math.min(index + 1, 5)}`}
                  style={{ flexDirection: isRight ? 'row' : 'row-reverse' }}
                >
                  {/* Dot */}
                  <div
                    className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full border-2 border-white z-10 flex-shrink-0"
                    style={{
                      background: event.color,
                      transform: 'translate(-50%, 16px)',
                      boxShadow: `0 0 12px ${event.color}80`,
                    }}
                  />

                  {/* Card */}
                  <div
                    className={`ml-14 md:ml-0 w-full md:w-[calc(50%-2rem)] cursor-pointer rounded-2xl p-5 md:p-6 timeline-entry ${
                      event.special ? 'animate-glow-pulse' : ''
                    }`}
                    style={{
                      background: isExpanded
                        ? `linear-gradient(135deg, ${event.color}18 0%, rgba(255,255,255,0.95) 100%)`
                        : 'rgba(255,255,255,0.85)',
                      border: `1px solid ${event.color}40`,
                      backdropFilter: 'blur(10px)',
                      boxShadow: isExpanded ? `0 8px 32px ${event.color}25` : '0 2px 12px rgba(91,141,217,0.08)',
                    }}
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{event.emoji}</span>
                      <div>
                        <p
                          className="text-xs font-semibold uppercase tracking-widest"
                          style={{ color: event.color }}
                        >
                          {event.date}
                        </p>
                        <h3
                          className="font-semibold text-base md:text-lg"
                          style={{ color: 'var(--foreground)' }}
                        >
                          {event.title}
                        </h3>
                      </div>
                    </div>

                    {/* Expandable content */}
                    <div
                      style={{
                        maxHeight: isExpanded ? '200px' : '0',
                        overflow: 'hidden',
                        transition: 'max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      <p
                        className="text-sm font-light leading-relaxed mt-3 pt-3"
                        style={{
                          color: 'var(--muted-foreground)',
                          borderTop: `1px solid ${event.color}30`,
                        }}
                      >
                        {event.description}
                      </p>
                    </div>

                    <div
                      className="mt-2 flex items-center gap-1 text-xs"
                      style={{ color: 'var(--muted-foreground)', opacity: 0.6 }}
                    >
                      <span>{isExpanded ? '▲' : '▼'}</span>
                      <span>{isExpanded ? 'Close' : 'Read more'}</span>
                    </div>
                  </div>

                  {/* Spacer for alternating layout on desktop */}
                  <div className="hidden md:block w-[calc(50%-2rem)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;