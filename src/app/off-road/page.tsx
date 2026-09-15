'use client';

import { useState } from 'react';
import Link from 'next/link';
import { EXPERIENCES_DATA } from '@/data/experiences';
import OffroadCard from '@/components/OffroadCard';
import ThreeDCameraScroll from '@/components/ThreeDCameraScroll';
import { Mountain, AlertTriangle, Compass, MessageCircle, Phone, Sparkles, CheckCircle2 } from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_PHONE_DISPLAY } from '@/lib/whatsapp';

export default function OffRoadPage() {
  const offRoadExperiences = EXPERIENCES_DATA.filter(
    exp => exp.category === 'Off-Road' || exp.category === 'Private Estate' || exp.category === 'Waterfalls'
  );

  const customOffroadUrl = getWhatsAppUrl('Hello, I would like to enquire about Yercaud 4x4 Off-Road trails and private estate routes.');

  return (
    <div className="relative min-h-screen text-white pt-24 pb-10 overflow-hidden">
      {/* 3D SCROLL BACKGROUND (Rugged 4x4 SUV conquering mountain trail) */}
      <ThreeDCameraScroll
        sequence="car"
        startFrame={120}
        endFrame={191}
        overlayClassName="bg-gradient-to-b from-black/75 via-black/50 to-black/85"
      />

      <div className="relative z-10">
      {/* Hero Header */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full text-emerald-400 text-xs font-semibold mb-6">
          <Mountain className="w-4 h-4" />
          <span>Exclusive Salem ↔ Yercaud 4x4 & Adventure Trails</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6">
          Untamed Yercaud <span className="text-emerald-400">Off-Road Experiences</span>
        </h1>

        <p className="text-white/80 text-base sm:text-lg font-light max-w-3xl mx-auto leading-relaxed mb-8">
          Venture beyond conventional paved roads. Explore separate rugged mountain routes, private plantation tracks, and secluded forest waterfalls with skilled 4x4 trail captains.
        </p>

        {/* Separate Route & Private Estate Important Notices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left mb-10">
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-3">
            <Compass className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Independent Designated Routes</h4>
              <p className="text-xs text-white/70 mt-1 font-light leading-relaxed">
                Each off-road journey is conducted on a <strong>separate route</strong> customized for optimal safety, scenic wilderness views, and exciting terrain.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">Private Estate Attractions</h4>
              <p className="text-xs text-amber-200/80 mt-1 font-light leading-relaxed">
                Many exclusive attractions are situated on gated private estates. Certain attractions may have approx. <strong>₹999 additional estate permit charges</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Cards Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offRoadExperiences.map((exp) => (
            <OffroadCard key={exp.id} experience={exp} />
          ))}
        </div>

        {/* Pricing & Booking Clarity Notice */}
        <div className="mt-14 p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center max-w-3xl mx-auto">
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
            <span className="text-emerald-400 font-bold">Transparent Enquiry Policy: </span>
            To avoid confusion with changing seasonal trail permits and private estate timings, basic starting details are displayed here. Please click <span className="text-emerald-300 font-semibold">Enquire Route & Price on WhatsApp</span> to receive exact customized pricing, route conditions, and slot confirmations directly from the operator.
          </p>
        </div>
      </section>

      {/* Safety & Guidelines Section */}
      <section className="mt-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl">
          <h3 className="font-heading text-2xl font-bold text-white mb-6 text-center">
            Off-Road Safety & Trail Protocols
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-white/80">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>All 4x4 vehicles are rigorously inspected, fitted with all-terrain suspension, and driven by mountain-certified trail pilots.</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Dedicated separate routes prevent vehicle bunching and provide uninterrupted natural photography opportunities.</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>We strictly practice Leave-No-Trace eco-tourism to safeguard Yercaud's delicate montane ecosystem and wildlife.</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Family-friendly trail pacing tailored to your comfort level, whether gentle plantation cruising or steep rocky thrills.</span>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="mt-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950/40 via-black to-emerald-900/40 border border-emerald-500/30 p-8 sm:p-10 shadow-2xl">
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
            Book Your Custom Off-Road Expedition
          </h3>
          <p className="text-white/70 text-xs sm:text-sm max-w-xl mx-auto mb-6">
            Morning sunrise slots and evening golden hour trails fill up quickly on weekends. Chat directly on WhatsApp to reserve your vehicle.
          </p>
          <a
            href={customOffroadUrl}
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
