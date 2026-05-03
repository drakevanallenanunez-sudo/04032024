'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface GalleryPhoto {
  id: number;
  src: string;
  alt: string;
  caption: string;
  span?: 'wide' | 'tall' | 'normal';
}

const photos: GalleryPhoto[] = [
{
  id: 1,
  src: "/images/pb7.jpg",
  alt: 'This is our 2nd time taking photobooth photos',
  caption: 'Our second photobooth 📸',
  span: 'wide'
},
{
  id: 2,
  src: "/images/pb8.jpg",
  alt: 'Two people sharing a tender moment under fairy lights at night',
  caption: 'You light up my world ✨',
  span: 'tall'
},
{
  id: 3,
  src: "/images/pb6.jpg",
  alt: 'Couple laughing together in a field of wildflowers during spring',
  caption: 'You trying your makeup on me 🌸',
  span: 'normal'
},
{
  id: 4,
  src: "/images/pb9.jpg",
  alt: 'Romantic silhouette of two people embracing at sunset by the water',
  caption: 'The time where a notification makes my heart skip a beat 💙',
  span: 'normal'
},
{
  id: 5,
  src: "/images/Screenshot_2023-12-09-21-26-01-136_com.facebook.katana-edit.jpg",
  alt: 'Couple sharing a sweet kiss surrounded by blooming cherry blossom trees',
  caption: 'The time you accepted my friend request🌺',
  span: 'wide'
},
{
  id: 6,
  src: "/images/pb12.jpg",
  alt: 'Two people watching the stars together lying on a blanket at night',
  caption: 'Oh the prettiest girl I ever seen 🌙',
  span: 'normal'
},
{
  id: 7,
  src: "images/pb2.jpg",
  alt: 'Couple dancing together in a cozy candlelit room with soft warm light',
  caption: 'Watch with me forever 🎭',
  span: 'tall'
},
{
  id: 8,
  src: "/images/pb10.jpg",
  alt: 'Two people sharing a warm hug on a misty morning in the mountains',
  caption: 'Our first conversation; it was you who chatted me up first 🥹',
  span: 'normal'
}];


export default function PhotoGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const visiblePhotos = isExpanded ? photos : photos.slice(0, 4);

  const openLightbox = (index: number) => {
    setImgLoaded(false);
    setLightboxIndex(index);
    setTimeout(() => setLightboxVisible(true), 10);
  };

  const closeLightbox = useCallback(() => {
    setLightboxVisible(false);
    setTimeout(() => setLightboxIndex(null), 350);
  }, []);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setImgLoaded(false);
    setLightboxIndex((lightboxIndex + 1) % photos.length);
  }, [lightboxIndex]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setImgLoaded(false);
    setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length);
  }, [lightboxIndex]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {document.body.style.overflow = '';};
  }, [lightboxIndex]);

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="font-script text-5xl text-primary mb-3" style={{ lineHeight: 1.3 }}>
            Our Moments
          </p>
          <h2 className="text-2xl font-semibold text-foreground/80 mb-4">
            A gallery of memories we&apos;ve made together
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent" />
            <span className="text-accent text-xl">💕</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent" />
          </div>
        </div>

        {/* Bento Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[200px]">
          {visiblePhotos.map((photo, index) =>
          <GalleryCard
            key={photo.id}
            photo={photo}
            index={index}
            onClick={() => openLightbox(index)} />

          )}
        </div>

        {/* Expand / Collapse Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group relative px-8 py-3 rounded-full overflow-hidden transition-all duration-500"
            style={{
              background: 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(91,141,217,0.3)',
              boxShadow: '0 8px 32px rgba(91,141,217,0.15)'
            }}>
            
            <span className="relative z-10 font-sans font-medium text-primary group-hover:text-white transition-colors duration-300 flex items-center gap-2">
              {isExpanded ?
              <>
                  <span>Show Less</span>
                  <span className="transition-transform duration-300 group-hover:-translate-y-0.5">↑</span>
                </> :

              <>
                  <span>See All Memories</span>
                  <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
                </>
              }
            </span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, #5b8dd9 0%, #7ab3e8 50%, #f4a7b9 100%)' }} />
            
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null &&
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          background: 'rgba(10, 20, 40, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          opacity: lightboxVisible ? 1 : 0,
          transition: 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={closeLightbox}>
        
          {/* Lightbox Card */}
          <div
          className="relative max-w-3xl w-full mx-auto"
          style={{
            transform: lightboxVisible ? 'scale(1) translateY(0)' : 'scale(0.88) translateY(24px)',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          onClick={(e) => e.stopPropagation()}>
          
            <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.18)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)'
            }}>
            
              {/* Image */}
              <div className="relative w-full" style={{ aspectRatio: '16/10' }}>
                <img
                src={photos[lightboxIndex].src}
                alt={photos[lightboxIndex].alt}
                className="w-full h-full object-cover"
                style={{
                  opacity: imgLoaded ? 1 : 0,
                  transition: 'opacity 0.4s ease'
                }}
                onLoad={() => setImgLoaded(true)} />
              
                {!imgLoaded &&
              <div className="absolute inset-0 flex items-center justify-center bg-white/5">
                    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                  </div>
              }
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Caption */}
              <div className="px-6 py-5">
                <p className="font-script text-3xl text-white/90" style={{ lineHeight: 1.4 }}>
                  {photos[lightboxIndex].caption}
                </p>
                <p className="text-white/50 text-sm mt-1 font-sans">
                  {lightboxIndex + 1} / {photos.length}
                </p>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
            aria-label="Previous photo">
            
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
            aria-label="Next photo">
            
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Close Button */}
            <button
            onClick={closeLightbox}
            className="absolute -top-4 -right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:rotate-90"
            style={{
              background: 'rgba(244,167,185,0.9)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.3)',
              boxShadow: '0 4px 16px rgba(244,167,185,0.4)'
            }}
            aria-label="Close lightbox">
            
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      }
    </section>);

}

interface GalleryCardProps {
  photo: GalleryPhoto;
  index: number;
  onClick: () => void;
}

function GalleryCard({ photo, index, onClick }: GalleryCardProps) {
  const [hovered, setHovered] = useState(false);

  const spanClass =
  photo.span === 'wide' ? 'col-span-2 row-span-1' :
  photo.span === 'tall' ? 'col-span-1 row-span-2' : 'col-span-1 row-span-1';

  return (
    <div
      className={`${spanClass} relative rounded-2xl overflow-hidden cursor-pointer group`}
      style={{
        background: 'rgba(255,255,255,0.25)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.4)',
        boxShadow: hovered ?
        '0 20px 60px rgba(91,141,217,0.25), inset 0 1px 0 rgba(255,255,255,0.5)' :
        '0 8px 32px rgba(91,141,217,0.1), inset 0 1px 0 rgba(255,255,255,0.4)',
        transform: hovered ? 'scale(1.02) translateY(-4px)' : 'scale(1) translateY(0)',
        transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        animationDelay: `${index * 80}ms`
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      
      <img
        src={photo.src}
        alt={photo.alt}
        className="w-full h-full object-cover"
        style={{
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        loading="lazy" />
      

      {/* Glass overlay on hover */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-4"
        style={{
          background: hovered ?
          'linear-gradient(to top, rgba(10,20,50,0.65) 0%, rgba(10,20,50,0.1) 60%, transparent 100%)' :
          'linear-gradient(to top, rgba(10,20,50,0.3) 0%, transparent 60%)',
          transition: 'background 0.4s ease'
        }}>
        
        <p
          className="font-script text-white text-xl leading-snug"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(8px)',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            textShadow: '0 2px 8px rgba(0,0,0,0.4)'
          }}>
          
          {photo.caption}
        </p>
      </div>

      {/* Expand icon */}
      <div
        className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
        style={{
          background: 'rgba(255,255,255,0.25)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.4)',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'scale(1)' : 'scale(0.7)',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
        
        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      </div>
    </div>);

}