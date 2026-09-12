'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ROOMS_DATA } from '@/data/rooms';
import RoomCard from '@/components/RoomCard';
import ThreeDCameraScroll from '@/components/ThreeDCameraScroll';
import { Home, Users, CheckCircle2, MessageCircle, Phone, Sparkles } from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_PHONE_DISPLAY } from '@/lib/whatsapp';

export default function RoomsPage() {
  const [filterType, setFilterType] = useState<string>('All');

  const categories = ['All', 'Single Bed', 'Double Bed', 'Large Family Room', 'Cottage', 'Private House / Homestay'];

  const filteredRooms = filterType === 'All'
    ? ROOMS_DATA
    : ROOMS_DATA.filter(r => r.category === filterType);

  const customRoomUrl = getWhatsAppUrl('Hello, I want to check room availability and pricing in Yercaud (Rooms from ₹2,000/day | Cottages & Homestays: Enquiry Alone).');

  return (
    <div className="relative min-h-screen text-white pt-24 pb-10 overflow-hidden">
      {/* 3D SCROLL BACKGROUND (Scenic hill cottage balcony into warm luxury wooden bedroom suite) */}
      <ThreeDCameraScroll
        sequence="full_length"
        startFrame={460}
        endFrame={838}
        overlayClassName="bg-gradient-to-b from-black/70 via-black/40 to-black/85"
      />

      <div className="relative z-10">
      {/* Hero Header */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full text-emerald-400 text-xs font-semibold mb-6">
          <Home className="w-4 h-4" />
          <span>Yercaud Hill Stays, Family Suites & Group Cottages</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6">
          Scenic Mountain Stays <span className="text-emerald-400">from ₹2,000/day</span>
        </h1>

        <p className="text-white/80 text-base sm:text-lg font-light max-w-3xl mx-auto leading-relaxed mb-8">
          Single & double rooms from ₹2,000/day with private balconies, family suites (up to 5 people), and exclusive private cottages & homestay villas (up to 25 people — Enquiry Alone).
        </p>

        {/* Capacity Quick Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto text-left mb-6">
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-3">
            <Users className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Individual Rooms</h4>
              <p className="text-xs text-white/70 mt-1 font-light">
                Starting from <strong>₹2,000/day</strong>. Family suites comfortably fit up to <strong>5 people</strong>.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
            <Home className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">Cottages & Homestays</h4>
              <p className="text-xs text-amber-200/80 mt-1 font-light">
                Up to <strong>25 people</strong>. Entire private compound, campfire & catering. <strong>Enquiry Alone</strong>.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3 sm:col-span-2 lg:col-span-1">
            <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Direct Owner Rates</h4>
              <p className="text-xs text-emerald-200/80 mt-1 font-light">
                Valley views, 24/7 hot water geysers, secure car parking & instant WhatsApp assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12">
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white/[0.04] border border-white/10 rounded-2xl max-w-3xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterType(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                filterType === cat
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Rooms Cards Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>

        {/* Pricing Clarity Notice */}
        <div className="mt-14 p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center max-w-3xl mx-auto">
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
            <span className="text-emerald-400 font-bold">Rates & Booking Note: </span>
            Exact pricing varies by check-in dates, peak holiday season, guest headcount, and custom meal inclusions. Click <span className="text-emerald-300 font-semibold">Enquire on WhatsApp</span> to get the guaranteed best package directly from the owner.
          </p>
        </div>
      </section>

      {/* Group Stay Inquiry Banner */}
      <section className="mt-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950/40 via-black to-emerald-900/40 border border-emerald-500/30 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="relative z-10 space-y-4">
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest bg-emerald-500/20 px-3.5 py-1 rounded-full border border-emerald-500/30">
              Planning a Big Family or Friends Group Trip?
            </span>
            <h3 className="font-heading text-2xl sm:text-4xl font-bold text-white">
              Cottages & Villas for Groups Up to 25 Guests
            </h3>
            <p className="text-white/80 text-sm max-w-xl mx-auto font-light">
              Enjoy private compound parking, open terrace campfires, homemade South Indian food service, and seamless Salem transfers all coordinated together.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={customRoomUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3.5 rounded-2xl transition-all shadow-lg hover:shadow-green-500/30 cursor-pointer text-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Check Dates on WhatsApp ({WHATSAPP_PHONE_DISPLAY})</span>
              </a>
              <a
                href="tel:+919489648021"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-medium px-6 py-3.5 rounded-2xl transition-all border border-white/20 text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Call Owner Directly</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
