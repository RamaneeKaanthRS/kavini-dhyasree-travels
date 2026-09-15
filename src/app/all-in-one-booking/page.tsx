import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Car, Compass, Home as HomeIcon, Phone, MessageSquare, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { VEHICLES_DATA } from '@/data/cars';
import { EXPERIENCES_DATA } from '@/data/experiences';
import { ROOMS_DATA } from '@/data/rooms';
import VehicleCard from '@/components/VehicleCard';
import OffroadCard from '@/components/OffroadCard';
import RoomCard from '@/components/RoomCard';
import WhyChooseUs from '@/components/WhyChooseUs';
import ThreeDCameraScroll from '@/components/ThreeDCameraScroll';

export const metadata: Metadata = {
  title: 'All-in-One Booking | Salem ↔ Yercaud Cars, Off-Road Trails & Stays',
  description: 'Book Salem ↔ Yercaud vehicle rentals (Swift, Ertiga, Innova), customized 4x4 off-road trails, and scenic mountain rooms & cottages in one place.',
};

export default function AllInOneBookingPage() {
  return (
    <div className="relative min-h-screen text-white pt-24 pb-6 sm:pb-8">
      {/* 3D SCROLL BACKGROUND (Overview of Mountain Ridge down to Hill Cottages) */}
      <ThreeDCameraScroll
        sequence="full_length"
        startFrame={0}
        endFrame={520}
        overlayClassName="bg-gradient-to-b from-black/70 via-black/50 to-black/85"
      />

      <div className="relative z-10">
      {/* HERO HEADER */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold tracking-wider uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Complete Mountain Travel Solution</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white">
            All-in-One <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">Booking</span> Hub
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-white/75 font-light leading-relaxed">
            Reserve your complete Salem ↔ Yercaud getaway: reliable mountain car fleet, thrilling private off-road trails, and cozy hill station rooms & cottages.
          </p>

          {/* Quick Jump Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <a
              href="#category-cars"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/40 text-xs sm:text-sm font-medium transition-all hover:scale-105"
            >
              <Car className="w-4 h-4 text-emerald-400" />
              <span>1. Car & Travel Fleet</span>
            </a>
            <a
              href="#category-offroad"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-amber-500/20 border border-white/15 hover:border-amber-500/40 text-xs sm:text-sm font-medium transition-all hover:scale-105"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>2. Off-Road Trails</span>
            </a>
            <a
              href="#category-rooms"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-teal-500/20 border border-white/15 hover:border-teal-500/40 text-xs sm:text-sm font-medium transition-all hover:scale-105"
            >
              <HomeIcon className="w-4 h-4 text-teal-400" />
              <span>3. Rooms & Cottages</span>
            </a>
          </div>

          {/* Direct WhatsApp Callout */}
          <div className="pt-2">
            <p className="text-xs text-white/50">
              Need immediate assistance? Chat directly on WhatsApp:{' '}
              <a
                href="https://wa.me/919489648021"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 underline hover:text-emerald-300 font-medium"
              >
                +91 94896 48021
              </a>{' '}
              or{' '}
              <a
                href="tel:+919488307936"
                className="text-emerald-400 underline hover:text-emerald-300 font-medium"
              >
                +91 94883 07936
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* CATEGORY 1: CAR & TRAVEL FLEET */}
      <section id="category-cars" className="px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
                <Car className="w-3.5 h-3.5" />
                <span>Category 1: Car & Travel Fleet</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                Salem ↔ Yercaud Vehicle Fleet
              </h2>
              <p className="text-white/70 text-sm sm:text-base mt-2 max-w-2xl font-light">
                Select duration and options below on any vehicle to generate your pre-filled, customized WhatsApp quotation instantly.
              </p>
            </div>
            <Link
              href="/cars"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <span>View Full Fleet Specs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VEHICLES_DATA.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY 2: OFF-ROAD & YERCAUD EXPERIENCES */}
      <section id="category-offroad" className="px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24 border-t border-white/10 bg-black/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
                <Compass className="w-3.5 h-3.5" />
                <span>Category 2: Off-Road & Yercaud Experiences</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                Untamed Yercaud Trails & Safaris
              </h2>
              <p className="text-white/70 text-sm sm:text-base mt-2 max-w-2xl font-light">
                Each off-road journey follows a separate dedicated route. Discover private coffee estates, secluded waterfalls, and panoramic viewpoints.
              </p>
            </div>
            <Link
              href="/off-road"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span>Explore Trail Maps</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EXPERIENCES_DATA.map((experience) => (
              <OffroadCard key={experience.id} experience={experience} />
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY 3: ROOMS & COTTAGES */}
      <section id="category-rooms" className="px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-3">
                <HomeIcon className="w-3.5 h-3.5" />
                <span>Category 3: Rooms, Cottages & Stays</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                Scenic Mountain Stays
              </h2>
              <p className="text-white/70 text-sm sm:text-base mt-2 max-w-2xl font-light">
                Authentic Yercaud accommodations from comfortable single rooms starting at ₹1,999/day to private cottages and homestays available upon direct enquiry.
              </p>
            </div>
            <Link
              href="/rooms"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-teal-400 hover:text-teal-300 transition-colors"
            >
              <span>View All Stays</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ROOMS_DATA.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="border-t border-white/10">
        <WhyChooseUs />
      </section>

      {/* BOTTOM ACTION BANNER */}
      <section className="px-4 sm:px-6 lg:px-8 pt-12 pb-6 max-w-5xl mx-auto text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/10 to-white/5 border border-white/15 backdrop-blur-xl shadow-2xl space-y-6">
          <h3 className="font-heading text-3xl sm:text-4xl font-bold text-white">
            Custom Itineraries & Group Bookings
          </h3>
          <p className="text-white/75 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Planning a corporate outing, family reunion, or customized multi-day mountain package? We tailor the complete experience for you.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="https://wa.me/919489648021?text=Hi%20Kavini%20Dhyasree%20Travels,%20I%20would%20like%20to%20customize%20an%20all-in-one%20booking%20for%20our%20Yercaud%20trip."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-3.5 rounded-full text-sm transition-all shadow-lg shadow-emerald-500/25 hover:scale-105"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Custom Enquiry</span>
            </a>
            <a
              href="tel:+919489648021"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-3.5 rounded-full text-sm border border-white/20 transition-all hover:scale-105"
            >
              <Phone className="w-4 h-4" />
              <span>Call +91 94896 48021</span>
            </a>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
