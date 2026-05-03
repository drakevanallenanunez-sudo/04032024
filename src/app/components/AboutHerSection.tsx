'use client';
import React, { useEffect, useRef } from 'react';
import AppImage from 'next/image';

const AboutHerSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.section-reveal').forEach((el) => {
              el.classList.add('visible');
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fruits = ['🥭 Mango', '🍇 Grapes', '🍓 Strawberry', '🍉 Watermelon', '🍌 Banana'];
  const traits = [
  'Soft-hearted & caring',
  'Adorably indecisive',
  'Loves music & books',
  'Passionate about politics',
  'Easily irritated',
  'Dreams of having a walk-in closet',
  'Dreams of having a studio',
  'To have her own library'];


  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 px-5 md:px-12 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #f0f7ff 0%, #fce4ec 100%)' }}>
      
      {/* Decorative background blur */}
      <div
        className="absolute top-20 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(91,141,217,0.08) 0%, transparent 70%)' }} />
      

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 section-reveal">
          <span
            className="text-xs font-semibold uppercase tracking-[0.5em] block mb-4"
            style={{ color: 'var(--primary)', opacity: 0.7 }}>
            
            Getting to know
          </span>
          <h2
            className="font-script"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: 'var(--foreground)' }}>
            
            About Her
          </h2>
          <div
            className="w-20 h-px mx-auto mt-4"
            style={{ background: 'linear-gradient(to right, transparent, var(--accent), transparent)' }} />
          
        </div>

        {/* Bento Grid */}
        {/* BENTO AUDIT:
             Row 1: [col-1+2: ProfileCard cs-2 rs-2] [col-3: FavoritesCard cs-1]
             Row 2: [col-1+2: ProfileCard continued] [col-3: PersonalityCard cs-1]
             Row 3: [col-1: FruitsCard cs-1] [col-2: DreamsCard cs-1] [col-3: EyesCard cs-1]
             Placed 6/6 cards ✓
          */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">

          {/* ProfileCard cs-2 rs-2 */}
          <div
            className="md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden relative section-reveal stagger-1 flex flex-col"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #e8f4fd 100%)',
              border: '1px solid rgba(91,141,217,0.15)',
              minHeight: '360px'
            }}>
            
            <div className="flex flex-col md:flex-row h-full">
              <div className="relative w-full md:w-2/5 h-64 md:h-full overflow-hidden flex-shrink-0">
                <AppImage
                  src="/images/pretty.jpg"
                  alt="Soft-lit romantic portrait of a young woman with brown hair and warm brown eyes in a dreamy pastel setting"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw" />
                
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to right, transparent 60%, rgba(232,244,253,0.8) 100%)'
                  }} />
                
              </div>
              <div className="flex flex-col justify-center p-8 md:p-10 flex-1">
                <span
                  className="text-xs font-semibold uppercase tracking-[0.4em] block mb-3"
                  style={{ color: 'var(--primary)', opacity: 0.7 }}>
                  
                  Full Name
                </span>
                <h3
                  className="font-script mb-6"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--foreground)', lineHeight: 1.1 }}>
                  
                  Klyanne Paran
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                  { label: 'Birthday', value: 'November 1, 2006', icon: '🎂' },
                  { label: 'Height', value: "5'4\"", icon: '✨' },
                  { label: 'Hair', value: 'Soft Brown', icon: '🌰' },
                  { label: 'Eyes', value: 'Brown', icon: '👁️' }].
                  map((item) =>
                  <div key={item.label} className="p-3 rounded-2xl" style={{ background: 'rgba(91,141,217,0.06)' }}>
                      <span className="text-lg">{item.icon}</span>
                      <p className="text-xs font-semibold uppercase tracking-wider mt-1" style={{ color: 'var(--muted-foreground)' }}>
                        {item.label}
                      </p>
                      <p className="text-sm font-medium mt-0.5" style={{ color: 'var(--foreground)' }}>
                        {item.value}
                      </p>
                    </div>
                  )}
                </div>
                <p className="mt-5 text-sm font-light italic leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                  &ldquo;The most beautiful brown eyes I&apos;ve ever seen&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* FavoritesCard cs-1 */}
          <div
            className="rounded-3xl p-7 section-reveal stagger-2 flex flex-col"
            style={{
              background: 'linear-gradient(135deg, #fce4ec 0%, #f8e8f5 100%)',
              border: '1px solid rgba(244,167,185,0.3)',
              minHeight: '180px'
            }}>
            
            <span className="text-2xl mb-3">💙</span>
            <h4 className="font-semibold text-sm uppercase tracking-widest mb-4" style={{ color: 'var(--secondary-foreground)' }}>
              Fave Colors
            </h4>
            <div className="flex flex-wrap gap-2 flex-1">
              {['Pastel', 'Light Blue', 'Soft Pink', 'Lavender'].map((c) =>
              <span
                key={c}
                className="px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ background: 'rgba(255,255,255,0.7)', color: 'var(--secondary-foreground)', border: '1px solid rgba(244,167,185,0.3)' }}>
                
                  {c}
                </span>
              )}
            </div>
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--muted-foreground)' }}>
                Comfort Food
              </p>
              <span className="text-sm font-medium" style={{ color: 'var(--secondary-foreground)' }}>
                🍧 Halo-halo
              </span>
            </div>
          </div>

          {/* PersonalityCard cs-1 */}
          <div
            className="rounded-3xl p-7 section-reveal stagger-3 flex flex-col"
            style={{
              background: 'linear-gradient(135deg, #e8f4fd 0%, #d6eaf8 100%)',
              border: '1px solid rgba(91,141,217,0.2)',
              minHeight: '180px'
            }}>
            
            <span className="text-2xl mb-3">✨</span>
            <h4 className="font-semibold text-sm uppercase tracking-widest mb-4" style={{ color: 'var(--primary)' }}>
              Personality
            </h4>
            <div className="flex flex-col gap-2 flex-1">
              {traits.slice(0, 5).map((t) =>
              <div key={t} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--primary)' }} />
                  <span className="text-xs font-medium" style={{ color: 'var(--foreground)' }}>{t}</span>
                </div>
              )}
            </div>
          </div>

          {/* FruitsCard cs-1 */}
          <div
            className="rounded-3xl p-7 section-reveal stagger-3 flex flex-col"
            style={{
              background: 'linear-gradient(135deg, #fff9f0 0%, #fce4ec 100%)',
              border: '1px solid rgba(244,167,185,0.25)',
              minHeight: '160px'
            }}>
            
            <span className="text-2xl mb-3">🍓</span>
            <h4 className="font-semibold text-sm uppercase tracking-widest mb-4" style={{ color: 'var(--secondary-foreground)' }}>
              Fave Fruits
            </h4>
            <div className="flex flex-wrap gap-2 flex-1">
              {fruits.map((f) =>
              <span
                key={f}
                className="px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ background: 'rgba(255,255,255,0.8)', color: 'var(--secondary-foreground)', border: '1px solid rgba(244,167,185,0.25)' }}>
                
                  {f}
                </span>
              )}
            </div>
          </div>

          {/* DreamsCard cs-1 */}
          <div
            className="rounded-3xl p-7 section-reveal stagger-4 flex flex-col"
            style={{
              background: 'linear-gradient(135deg, #e8f4fd 0%, #f0f7ff 100%)',
              border: '1px solid rgba(91,141,217,0.18)',
              minHeight: '160px'
            }}>
            
            <span className="text-2xl mb-3">🥁</span>
            <h4 className="font-semibold text-sm uppercase tracking-widest mb-3" style={{ color: 'var(--primary)' }}>
              Her Dreams
            </h4>
            <div className="flex flex-col gap-2 flex-1">
              {traits.slice(5).map((t) =>
              <div key={t} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--accent)' }} />
                  <span className="text-xs font-medium" style={{ color: 'var(--foreground)' }}>{t}</span>
                </div>
              )}
            </div>
          </div>

          {/* EyesCard cs-1 */}
          <div
            className="rounded-3xl p-7 section-reveal stagger-5 flex flex-col items-center justify-center text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #fce4ec 0%, #e8f4fd 100%)',
              border: '1px solid rgba(244,167,185,0.3)',
              minHeight: '160px'
            }}>
            
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(244,167,185,0.2) 0%, transparent 70%)'
              }} />
            
            <span className="text-4xl mb-3 relative z-10">💙</span>
            <p
              className="font-script relative z-10"
              style={{ fontSize: '1.8rem', color: 'var(--foreground)', lineHeight: 1.2 }}>
              
              I'm not a painter, but if I were to take a palette all my colors would be you.
            </p>
          </div>
        </div>
      </div>
    </section>);

};

export default AboutHerSection;