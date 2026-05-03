'use client';

import React, { useState, useEffect } from 'react';

interface TimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeElapsed(): TimeElapsed {
 const startDate = new Date('2024-04-03T00:00:00');
  const now = new Date();
  const diff = Math.max(0, now.getTime() - startDate.getTime());

  const totalSeconds = Math.floor(diff / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const days = Math.floor(totalHours / 24);

  return { days, hours, minutes, seconds };
}

export default function TogetherTimer() {
  const [time, setTime] = useState<TimeElapsed>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(getTimeElapsed());
    const interval = setInterval(() => {
      setTime(getTimeElapsed());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-pink-100 opacity-40 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-blue-100 opacity-40 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-rose-50 opacity-30 blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Heading */}
        <p className="font-script text-rose-400 text-xl mb-2 tracking-wide">April 3, 2024</p>
        <h2 className="font-script text-4xl md:text-5xl text-slate-700 mb-3">
          She Said <span className="text-rose-400">Yes</span> 💍
        </h2>
        <p className="text-slate-500 text-sm md:text-base mb-10 font-sans">
          Every second with you is a treasure. Here&apos;s how long we&apos;ve been together:
        </p>

        {/* Timer cards */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {units.map(({ label, value }) => (
            <div
              key={label}
              className="relative group"
            >
              <div className="bg-white/70 backdrop-blur-sm border border-rose-100 rounded-2xl shadow-lg px-6 py-5 min-w-[90px] md:min-w-[110px] flex flex-col items-center transition-transform duration-300 group-hover:-translate-y-1">
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-100 to-blue-100 opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                <span className="relative font-sans font-bold text-4xl md:text-5xl text-rose-400 tabular-nums leading-none">
                  {mounted ? String(value).padStart(2, '0') : '00'}
                </span>
                <span className="relative mt-2 text-xs md:text-sm text-slate-400 uppercase tracking-widest font-sans">
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-10 font-script text-2xl text-slate-500 italic">
          &hellip;and counting, forever. 🤍
        </p>
      </div>
    </section>
  );
}
