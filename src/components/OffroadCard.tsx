'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Compass, Mountain, Clock, AlertTriangle, MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { YercaudExperience } from '@/data/experiences';
import { buildExperienceEnquiryMessage, openWhatsAppChat } from '@/lib/whatsapp';

interface OffroadCardProps {
  experience: YercaudExperience;
}

export default function OffroadCard({ experience }: OffroadCardProps) {
  const [groupSize, setGroupSize] = useState<string>('2-4 Pax');

  const handleEnquiry = () => {
    const message = buildExperienceEnquiryMessage({
      title: experience.title,
      routeType: experience.routeType,
      groupSize: groupSize
    });
    openWhatsAppChat(message);
  };

  return (
    <div className="group relative rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 hover:border-emerald-500/30 transition-all duration-300 flex flex-col overflow-hidden shadow-2xl backdrop-blur-xl hover:-translate-y-1">
      {/* Experience Image Container */}
      <div className="relative w-full h-64 overflow-hidden bg-black/40">
        <Image
          src={experience.image}
          alt={experience.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Route Badge */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/90 text-black shadow-lg">
            {experience.category}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-black/70 text-emerald-300 border border-emerald-500/40 backdrop-blur-md">
            Separate Dedicated Route
          </span>
        </div>

        {/* Bottom Details Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-emerald-400 font-bold block">
              {experience.duration}
            </span>
            <div className="text-white font-heading text-xl sm:text-2xl font-bold drop-shadow-md">
              {experience.startingPriceNote}
            </div>
          </div>
          <span className="text-xs bg-white/10 text-white/90 border border-white/20 px-2.5 py-1 rounded-full backdrop-blur-md">
            Customised Timings
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-5">
        <div>
          <h3 className="font-heading text-2xl font-bold text-white tracking-wide mb-1">
            {experience.title}
          </h3>
          <p className="text-xs text-emerald-300/90 font-medium mb-3">
            {experience.highlight}
          </p>

          <p className="text-xs text-white/70 font-light leading-relaxed mb-4">
            {experience.description}
          </p>

          {/* Route & Terrain Spec */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-3.5 space-y-2 mb-4">
            <div className="flex items-center gap-2 text-xs text-white/90">
              <Compass className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-semibold text-white">Route:</span>
              <span className="text-white/80 truncate">{experience.routeType}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/90">
              <Mountain className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-semibold text-white">Terrain:</span>
              <span className="text-white/80 truncate">{experience.terrain}</span>
            </div>
          </div>

          {/* Private Estate Notice */}
          {experience.estateChargeNote && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200/90 text-xs mb-4">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                {experience.estateChargeNote}
              </p>
            </div>
          )}

          {/* Highlights Checklist */}
          <div className="space-y-1.5 mb-4">
            {experience.keyFeatures.slice(0, 3).map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-white/80">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>

          {/* Group Size Selector */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-white/60 font-semibold mb-1.5">
              Select Group Size
            </label>
            <div className="flex flex-wrap gap-2">
              {['2-4 Pax', '5-8 Pax', '9+ Pax Group'].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setGroupSize(size)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                    groupSize === size
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-3 border-t border-white/10">
          <button
            onClick={handleEnquiry}
            className="w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 active:scale-[0.98] text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-lg hover:shadow-green-500/30 cursor-pointer text-sm"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Enquire Route & Price on WhatsApp</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
          <p className="text-[10px] text-center text-white/40 mt-2">
            Exact route charges confirmed instantly over WhatsApp based on party size & slot.
          </p>
        </div>
      </div>
    </div>
  );
}
