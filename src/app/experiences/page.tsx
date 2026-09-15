'use client';

import { useState } from 'react';
import Link from 'next/link';
import { EXPERIENCES_DATA } from '@/data/experiences';
import OffroadCard from '@/components/OffroadCard';
import ThreeDCameraScroll from '@/components/ThreeDCameraScroll';
import { Sparkles, MapPin, Compass, AlertTriangle, MessageCircle, Phone, ArrowRight } from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_PHONE_DISPLAY } from '@/lib/whatsapp';

export default function ExperiencesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Off-Road', 'Private Estate', 'Waterfalls', 'Scenic Attraction'];

  const filteredExperiences = selectedCategory === 'All'
    ? EXPERIENCES_DATA
    : EXPERIENCES_DATA.filter(exp => exp.category === selectedCategory);

  const customExperienceUrl = getWhatsAppUrl('Hello, I want to enquire about customized Yercaud tours, private estate routes, and waterfall treks.');

  return (
    <div className="relative min-h-screen text-white pt-24 pb-10 overflow-hidden">
      {/* 3D SCROLL BACKGROUND (Mountain ridges, ghat curves & misty morning sunrise) */}
      <ThreeDCameraScroll
        sequence="full_length"
        startFrame={0}
        endFrame={220}
        overlayClassName="bg-gradient-to-b from-black/70 via-black/45 to-black/85"
      />

      <div className="relative z-10">
      {/* Header */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full text-emerald-400 text-xs font-semibold mb-6">
          <Sparkles className="w-4 h-4" />
          <span>Curated Yercaud Hills Explorations</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6">
          Authentic Yercaud <span className="text-emerald-400">Experiences & Attractions</span>
        </h1>

        <p className="text-white/80 text-base sm:text-lg font-light max-w-3xl mx-auto leading-relaxed mb-8">
          From secluded private coffee estate tracks and tranquil secret forest waterfalls to the iconic clifftop viewpoints of the Shevaroy range.
        </p>

        {/* Informational Guidance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left mb-6">
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-3">
            <Compass className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Independent Route Structure</h4>
              <p className="text-xs text-white/70 mt-1 font-light leading-relaxed">
                Each off-road and adventure excursion features a <strong>separate route</strong>, ensuring secluded exploration without crowds.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">Private Estate Access</h4>
              <p className="text-xs text-amber-200/80 mt-1 font-light leading-relaxed">
                Many scenic gems are located inside private coffee plantations. Certain private estate attractions may carry approx. <strong>₹999 additional estate charges</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12">
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white/[0.04] border border-white/10 rounded-2xl max-w-2xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Cards Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredExperiences.map((exp) => (
            <OffroadCard key={exp.id} experience={exp} />
          ))}
        </div>

        {/* Clear Enquiry Notice */}
        <div className="mt-14 p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center max-w-3xl mx-auto">
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
            <span className="text-emerald-400 font-bold">Direct Enquiry Transparency: </span>
            Exact fees, timing slots, water levels, and private estate access vary with weather and seasons. Click <span className="text-emerald-300 font-semibold">Enquire on WhatsApp</span> on any card to confirm real-time availability and exact pricing directly from the local operator.
          </p>
        </div>
      </section>

      {/* WhatsApp Action Banner */}
      <section className="mt-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950/40 via-black to-emerald-900/40 border border-emerald-500/30 p-8 sm:p-10 shadow-2xl">
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
            Plan a Personalized Yercaud Day Out
          </h3>
          <p className="text-white/70 text-xs sm:text-sm max-w-xl mx-auto mb-6">
            Combine off-road trails with sightseeing and private waterfall visits in a single day tour.
          </p>
          <a
            href={customExperienceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3.5 rounded-2xl transition-all shadow-lg hover:shadow-green-500/30 text-sm cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat on WhatsApp ({WHATSAPP_PHONE_DISPLAY})</span>
          </a>
        </div>
      </section>
      </div>
    </div>
  );
}
