'use client';
import React, { useEffect, useRef, useState } from 'react';

interface Lantern {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  sway: number;
  swaySpeed: number;
  swayPhase: number;
  opacity: number;
  hue: number;
}

const DreamWeddingSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const animRef = useRef<number>(0);
  const lanternsRef = useRef<Lantern[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const frameRef = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            entry.target.querySelectorAll('.section-reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 120);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize lanterns
    const initLanterns = () => {
      const count = Math.min(30, Math.floor(canvas.width / 25));
      lanternsRef.current = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: (Math.random() * canvas.width * 0.8) + canvas.width * 0.1,
        y: canvas.height + Math.random() * canvas.height * 0.5,
        size: Math.random() * 18 + 12,
        speed: Math.random() * 0.5 + 0.3,
        sway: Math.random() * 30 + 10,
        swaySpeed: Math.random() * 0.015 + 0.008,
        swayPhase: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.4 + 0.6,
        hue: Math.random() * 30 + 30, // 30-60 = amber/gold range
      }));
    };
    initLanterns();

    const drawSunSymbol = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number
    ) => {
      ctx.save();
      ctx.strokeStyle = 'rgba(255,220,100,0.8)';
      ctx.lineWidth = size * 0.06;
      ctx.lineCap = 'round';
      const rayCount = 8;
      const innerR = size * 0.25;
      const outerR = size * 0.45;
      for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(x + Math.cos(angle) * innerR, y + Math.sin(angle) * innerR);
        ctx.lineTo(x + Math.cos(angle) * outerR, y + Math.sin(angle) * outerR);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(x, y, innerR * 0.7, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,220,100,0.6)';
      ctx.fill();
      ctx.restore();
    };

    const drawLantern = (
      ctx: CanvasRenderingContext2D,
      lantern: Lantern
    ) => {
      const { x, y, size, opacity, hue } = lantern;
      ctx.save();
      ctx.globalAlpha = opacity;

      // Glow
      const grd = ctx.createRadialGradient(x, y, 0, x, y, size * 1.8);
      grd.addColorStop(0, `hsla(${hue}, 100%, 70%, 0.4)`);
      grd.addColorStop(1, 'hsla(40, 100%, 60%, 0)');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.ellipse(x, y, size * 1.8, size * 2.2, 0, 0, Math.PI * 2);
      ctx.fill();

      // Lantern body
      const bodyGrd = ctx.createLinearGradient(x - size, y - size * 1.2, x + size, y + size * 1.2);
      bodyGrd.addColorStop(0, `hsla(${hue + 10}, 100%, 75%, 0.95)`);
      bodyGrd.addColorStop(0.5, `hsla(${hue}, 100%, 65%, 1)`);
      bodyGrd.addColorStop(1, `hsla(${hue - 10}, 90%, 55%, 0.9)`);
      ctx.fillStyle = bodyGrd;
      ctx.beginPath();
      ctx.ellipse(x, y, size * 0.55, size * 0.75, 0, 0, Math.PI * 2);
      ctx.fill();

      // Sun symbol on lantern
      drawSunSymbol(ctx, x, y, size);

      // Top and bottom cap
      ctx.fillStyle = `hsla(${hue - 15}, 80%, 45%, 0.9)`;
      ctx.beginPath();
      ctx.ellipse(x, y - size * 0.72, size * 0.3, size * 0.12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(x, y + size * 0.72, size * 0.3, size * 0.12, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const drawWaterReflection = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      const reflectionHeight = h * 0.18;
      const reflectionY = h - reflectionHeight;
      const grd = ctx.createLinearGradient(0, reflectionY, 0, h);
      grd.addColorStop(0, 'rgba(0,0,0,0)');
      grd.addColorStop(0.3, 'rgba(15,10,30,0.6)');
      grd.addColorStop(1, 'rgba(10,5,20,0.95)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, reflectionY, w, reflectionHeight);

      // Water shimmer lines
      ctx.save();
      ctx.globalAlpha = 0.15;
      for (let i = 0; i < 8; i++) {
        const lineY = reflectionY + (i / 8) * reflectionHeight;
        ctx.strokeStyle = `hsla(40, 100%, 70%, ${0.3 - i * 0.03})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, lineY);
        ctx.lineTo(w, lineY);
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawBoat = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      const boatY = h * 0.82;
      const boatX = w * 0.5;
      ctx.save();
      ctx.fillStyle = 'rgba(40, 25, 15, 0.85)';
      ctx.beginPath();
      ctx.moveTo(boatX - 55, boatY);
      ctx.quadraticCurveTo(boatX - 60, boatY + 20, boatX - 30, boatY + 20);
      ctx.lineTo(boatX + 30, boatY + 20);
      ctx.quadraticCurveTo(boatX + 60, boatY + 20, boatX + 55, boatY);
      ctx.closePath();
      ctx.fill();

      // Two silhouettes in boat
      const silhouettes = [
        { x: boatX - 18, height: 28, width: 8 },
        { x: boatX + 10, height: 25, width: 8 },
      ];
      silhouettes.forEach((s) => {
        ctx.fillStyle = 'rgba(25, 15, 10, 0.9)';
        // Body
        ctx.beginPath();
        ctx.ellipse(s.x, boatY - s.height * 0.4, s.width * 0.5, s.height * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
        // Head
        ctx.beginPath();
        ctx.arc(s.x, boatY - s.height, s.width * 0.45, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();
    };

    const animate = () => {
      frameRef.current++;
      const w = canvas.width;
      const h = canvas.height;

      // Night sky background
      const skyGrd = ctx.createLinearGradient(0, 0, 0, h);
      skyGrd.addColorStop(0, '#0a0520');
      skyGrd.addColorStop(0.4, '#1a0a3a');
      skyGrd.addColorStop(0.7, '#2a1050');
      skyGrd.addColorStop(1, '#3a1520');
      ctx.fillStyle = skyGrd;
      ctx.fillRect(0, 0, w, h);

      // Stars
      if (frameRef.current % 3 === 0) {
        for (let i = 0; i < 5; i++) {
          const sx = Math.random() * w;
          const sy = Math.random() * h * 0.5;
          ctx.beginPath();
          ctx.arc(sx, sy, Math.random() * 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.6 + 0.2})`;
          ctx.fill();
        }
      }

      // Update and draw lanterns
      lanternsRef.current.forEach((lantern) => {
        lantern.y -= lantern.speed;
        lantern.x += Math.sin(frameRef.current * lantern.swaySpeed + lantern.swayPhase) * 0.4;
        lantern.opacity = Math.max(0, lantern.opacity - 0.0008);

        if (lantern.y < -lantern.size * 3 || lantern.opacity <= 0) {
          lantern.y = h + lantern.size;
          lantern.x = w * 0.1 + Math.random() * w * 0.8;
          lantern.opacity = Math.random() * 0.4 + 0.6;
          lantern.swayPhase = Math.random() * Math.PI * 2;
        }

        drawLantern(ctx, lantern);
      });

      drawWaterReflection(ctx, w, h);
      drawBoat(ctx, w, h);

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [isVisible]);

  return (
    <section
      id="dream-wedding"
      ref={sectionRef}
      className="py-24 px-5 md:px-12 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fce4ec 0%, #f0f7ff 100%)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 section-reveal">
          <span
            className="text-xs font-semibold uppercase tracking-[0.5em] block mb-4"
            style={{ color: 'var(--primary)', opacity: 0.7 }}
          >
            Our forever
          </span>
          <h2
            className="font-script"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: 'var(--foreground)' }}
          >
            Our Dream Wedding
          </h2>
          <div
            className="w-20 h-px mx-auto mt-4"
            style={{ background: 'linear-gradient(to right, transparent, var(--accent), transparent)' }}
          />
          <p
            className="mt-6 text-sm font-light leading-relaxed mx-auto max-w-lg"
            style={{ color: 'var(--muted-foreground)' }}
          >
            One day, we will be on that boat together — watching golden lanterns carry our wishes into the sky,
            surrounded by wildflowers and the warmth of forever.
          </p>
        </div>

        {/* Lantern Canvas */}
        <div
          className="relative rounded-3xl overflow-hidden section-reveal"
          style={{
            height: 'clamp(320px, 55vw, 520px)',
            border: '1px solid rgba(91,141,217,0.2)',
            boxShadow: '0 20px 60px rgba(91,141,217,0.15)',
          }}
        >
          <canvas ref={canvasRef} className="w-full h-full" />
          {/* Overlay text */}
          <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
            <p
              className="font-script text-white"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', textShadow: '0 0 20px rgba(255,200,100,0.8)' }}
            >
              And at last I see the light... I see it in every lantern — a wish for you.
            </p>
          </div>
        </div>

        {/* Wedding dream details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          {[
            { icon: '🌸', title: 'Garden Ceremony', desc: 'Wildflowers, soft sunlight, and the scent of blooms surrounding us as we say our vows.' },
            { icon: '🏮', title: 'Lantern Release', desc: 'Hundreds of golden lanterns carrying our love and wishes upward into the night sky.' },
            { icon: '🚣', title: 'Boat Scene', desc: 'Just the two of us on still water, watching the world glow with the warmth of our beginning.' },
          ].map((item, i) => (
            <div
              key={item.title}
              className={`p-6 rounded-2xl text-center section-reveal stagger-${i + 1}`}
              style={{
                background: 'rgba(255,255,255,0.8)',
                border: '1px solid rgba(91,141,217,0.15)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <span className="text-3xl block mb-3">{item.icon}</span>
              <h4
                className="font-script mb-2"
                style={{ fontSize: '1.8rem', color: 'var(--primary)', lineHeight: 1.1 }}
              >
                {item.title}
              </h4>
              <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DreamWeddingSection;