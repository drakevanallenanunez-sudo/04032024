'use client';
import React, { useEffect, useRef, useState } from 'react';

const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: Array<{
      x: number; y: number; size: number; speedY: number;
      speedX: number; opacity: number; color: string; type: 'heart' | 'circle';
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#f4a7b9', '#5b8dd9', '#7ab3e8', '#fce4ec', '#c8dff7', '#e8a0b0'];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight + window.innerHeight,
        size: Math.random() * 12 + 4,
        speedY: -(Math.random() * 0.8 + 0.3),
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: Math.random() > 0.4 ? 'heart' : 'circle',
      });
    }

    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath();
      ctx.moveTo(x, y + size * 0.3);
      ctx.bezierCurveTo(x, y, x - size * 0.5, y, x - size * 0.5, y + size * 0.3);
      ctx.bezierCurveTo(x - size * 0.5, y + size * 0.65, x, y + size * 0.9, x, y + size);
      ctx.bezierCurveTo(x, y + size * 0.9, x + size * 0.5, y + size * 0.65, x + size * 0.5, y + size * 0.3);
      ctx.bezierCurveTo(x + size * 0.5, y, x, y, x, y + size * 0.3);
      ctx.closePath();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(p.x + p.size / 2, p.y + p.size / 2, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
        p.y += p.speedY;
        p.x += p.speedX;
        p.opacity += (Math.random() - 0.5) * 0.01;
        p.opacity = Math.max(0.1, Math.min(0.8, p.opacity));
        if (p.y < -50) {
          p.y = canvas.height + 50;
          p.x = Math.random() * canvas.width;
        }
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #e8f4fd 0%, #f0f7ff 30%, #fce4ec 70%, #f8e8f5 100%)',
      }}
    >
      {/* Canvas particles */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Soft radial glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(91,141,217,0.12) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 70% 30%, rgba(244,167,185,0.15) 0%, transparent 60%)',
        }}
      />

      {/* Decorative circle ring */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 rounded-full"
        style={{
          width: 'clamp(300px, 70vw, 700px)',
          height: 'clamp(300px, 70vw, 700px)',
          border: '1px solid rgba(91, 141, 217, 0.12)',
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 rounded-full"
        style={{
          width: 'clamp(200px, 50vw, 500px)',
          height: 'clamp(200px, 50vw, 500px)',
          border: '1px solid rgba(244, 167, 185, 0.15)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div
          className="mb-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s ease 0.2s, transform 1s ease 0.2s',
          }}
        >
          <span
            className="text-xs font-semibold uppercase tracking-[0.5em]"
            style={{ color: 'var(--primary)', opacity: 0.7 }}
          >
            A Love Letter
          </span>
        </div>

        <h1
          className="font-script leading-none mb-6"
          style={{
            fontSize: 'clamp(3.5rem, 12vw, 9rem)',
            color: 'var(--foreground)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 1.2s ease 0.5s, transform 1.2s ease 0.5s',
          }}
        >
          <span className="gradient-text">You are my home,</span>
        </h1>

        <h2
          className="font-script mb-8"
          style={{
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            color: 'var(--accent)',
            lineHeight: 1.1,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 1.2s ease 0.8s, transform 1.2s ease 0.8s',
            textShadow: '0 0 40px rgba(244, 167, 185, 0.5)',
          }}
        >
          Klyanne.
        </h2>

        <p
          className="text-base md:text-lg font-light leading-relaxed mb-12 mx-auto"
          style={{
            color: 'var(--muted-foreground)',
            maxWidth: '480px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s ease 1.1s, transform 1s ease 1.1s',
          }}
        >
          Every memory, every moment, every heartbeat — this is for you.
        </p>

        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s ease 1.4s, transform 1s ease 1.4s',
          }}
        >
          <button
            onClick={scrollToAbout}
            className="btn-romantic px-10 py-4 rounded-full text-sm font-semibold tracking-widest uppercase"
          >
            Enter My Heart
          </button>
        </div>

        {/* Scroll indicator */}
        <div
          className="mt-16 flex flex-col items-center gap-2"
          style={{
            opacity: visible ? 0.5 : 0,
            transition: 'opacity 1s ease 2s',
          }}
        >
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--muted-foreground)' }}>
            Scroll to explore
          </span>
          <div
            className="w-px h-12 mx-auto animate-float-slow"
            style={{ background: 'linear-gradient(to bottom, var(--primary), transparent)' }}
          />
        </div>
      </div>

      {/* Corner decorative hearts */}
      <div className="absolute bottom-8 left-8 text-3xl opacity-30 heart-float" style={{ animationDelay: '0s' }}>
        ♡
      </div>
      <div className="absolute top-24 right-10 text-2xl opacity-20 heart-float" style={{ animationDelay: '2s', color: 'var(--accent)' }}>
        ♡
      </div>
      <div className="absolute top-1/3 left-6 text-xl opacity-20 heart-float" style={{ animationDelay: '4s', color: 'var(--primary)' }}>
        ♡
      </div>
    </section>
  );
};

export default HeroSection;