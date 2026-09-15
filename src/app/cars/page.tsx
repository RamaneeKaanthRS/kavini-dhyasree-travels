'use client';

import { useState } from 'react';
import Link from 'next/link';
import { VEHICLES_DATA } from '@/data/cars';
import VehicleCard from '@/components/VehicleCard';
import ThreeDCameraScroll from '@/components/ThreeDCameraScroll';
import { Car, MessageCircle, Phone, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_PHONE_DISPLAY } from '@/lib/whatsapp';

export default function CarsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Hatchback', 'MUV / SUV', 'Off-Road 4x4', 'Combo Package'];

  const filteredVehicles = activeCategory === 'All'
    ? VEHICLES_DATA
    : VEHICLES_DATA.filter(v => v.category === activeCategory);

  const directConsultationUrl = getWhatsAppUrl('Hello, I want to inquire about Salem to Yercaud car rentals and get an instant custom quote.');

  return (
    <div className="relative min-h-screen text-white pt-24 pb-10 overflow-hidden">
      {/* 3D SCROLL BACKGROUND (Cruising along hill road for 20 hairpin bends) */}
      <ThreeDCameraScroll
        sequence="car"
        startFrame={60}
        endFrame={191}
        overlayClassName="bg-gradient-to-b from-black/75 via-black/50 to-black/85"
      />

      <div className="relative z-10">
      {/* Hero Header */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full text-emerald-400 text-xs font-semibold mb-6">
          <Car className="w-4 h-4" />
          <span>Salem ↔ Yercaud Premier Car & Travel Fleet</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6">
          Comfortable Rides for the <span className="text-emerald-400">20 Hairpin Bends</span>
        </h1>

        <p className="text-white/80 text-base sm:text-lg font-light max-w-3xl mx-auto leading-relaxed mb-8">
          Reliable door-to-door pickups from Salem Junction, Bus Stand, or Salem city up to Yercaud hill stations. 
          Driven by seasoned mountain chauffeurs with transparent starting rates.
        </p>

        {/* Quick Highlights Pill Row */}
        <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-white/70">
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Swift from ₹1,799</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ertiga from ₹2,399</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Innova from ₹2,999</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Off-Road Package from ₹4,499</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Pickup + Stay Combo ~₹5,999</span>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12">
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white/[0.04] border border-white/10 rounded-2xl max-w-2xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Vehicle Cards Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        {/* Pricing Notice */}
        <div className="mt-14 p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center max-w-3xl mx-auto">
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
            <span className="text-emerald-400 font-bold">Important Rate Notice: </span>
            Prices are stated as starting prices. The final exact price depends on your specific pickup location, duration, waiting time, customized sightseeing routes, and seasonal dates. Click <span className="text-emerald-300 font-semibold">Enquire Now on WhatsApp</span> for an instant confirmed quote.
          </p>
        </div>
      </section>

      {/* WhatsApp Immediate Assistance Banner */}
      <section className="mt-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-900/40 via-black to-emerald-950/40 border border-emerald-500/30 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="relative z-10 space-y-4">
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest bg-emerald-500/20 px-3.5 py-1 rounded-full border border-emerald-500/30">
              Need a Custom Car or Tour Itinerary?
            </span>
            <h3 className="font-heading text-2xl sm:text-4xl font-bold text-white">
              Instant WhatsApp Support with the Fleet Owner
            </h3>
            <p className="text-white/80 text-sm max-w-xl mx-auto font-light">
              Share your train/bus arrival time in Salem or custom Yercaud plans. We will immediately reserve the best vehicle for your group.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={directConsultationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3.5 rounded-2xl transition-all shadow-lg hover:shadow-green-500/30 cursor-pointer text-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp ({WHATSAPP_PHONE_DISPLAY})</span>
              </a>
              <a
                href="tel:+919489648021"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-medium px-6 py-3.5 rounded-2xl transition-all border border-white/20 text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Call Directly</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
