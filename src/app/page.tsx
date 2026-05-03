import React from 'react';
import HeroSection from './components/HeroSection';
import AboutHerSection from './components/AboutHerSection';
import TimelineSection from './components/TimelineSection';
import LoveNotesSection from './components/LoveNotesSection';
import DreamWeddingSection from './components/DreamWeddingSection';
import WhatSheLovesSection from './components/WhatSheLovesSection';
import FinalLetterSection from './components/FinalLetterSection';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import FloatingHearts from './components/FloatingHearts';
import MusicPlayer from './components/MusicPlayer';
import TogetherTimer from './components/TogetherTimer';
import AppGate from './components/AppGate';
import PhotoGallery from './components/PhotoGallery';

export default function HomePage() {
  return (
    <AppGate>
      <main className="relative overflow-x-hidden bg-background paper-texture">
        <Header />
        <FloatingHearts />
        <MusicPlayer />
        <HeroSection />
        <TogetherTimer />
        <AboutHerSection />
        <PhotoGallery />
        <TimelineSection />
        <LoveNotesSection />
        <DreamWeddingSection />
        <WhatSheLovesSection />
        <FinalLetterSection />
        <Footer />
      </main>
    </AppGate>
  );
}