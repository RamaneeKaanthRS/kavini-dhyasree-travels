"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { ArrowRight, Car, ChevronDown, Sparkles } from "lucide-react";

interface HeroOverlayProps {
  heroFeaturedPkg: any;
  heroFeaturedImg: any;
}

// Blur in variants for the website intro on opening
const blurInVariant: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(20px)",
    y: 24,
  },
  visible: (delay: number) => ({
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 1.1,
      delay,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function HeroOverlay({ heroFeaturedPkg, heroFeaturedImg }: HeroOverlayProps) {
  return (
    <div
      className="relative z-10 min-h-screen w-full flex flex-col justify-between items-center px-4 sm:px-6 lg:px-8 pt-24 pb-12 pointer-events-auto"
    >
      {/* Subtle atmospheric vignette behind the text for maximum contrast & readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/70 pointer-events-none -z-10" />

      <div className="w-full flex-1 flex flex-col items-center justify-center text-center max-w-5xl mx-auto pt-10">
        
        {/* 1. Intro Eyebrow Badge (Blurs in first) */}
        <motion.div
          custom={0.15}
          initial="hidden"
          animate="visible"
          variants={blurInVariant}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-light uppercase tracking-[0.25em] text-white/90 mb-6 drop-shadow-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Welcome to Kavini Dhyasree</span>
        </motion.div>

        {/* 2. Main Majestic Title (Blurs in with deep impact) */}
        <motion.h1
          custom={0.3}
          initial="hidden"
          animate="visible"
          variants={blurInVariant}
          className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-medium text-white tracking-tight leading-none drop-shadow-2xl mb-4"
        >
          Kavini Dhyasree<span className="text-white/40">.</span>
        </motion.h1>

        {/* 3. Accented Calligraphic Tagline (Blurs in) */}
        <motion.div
          custom={0.45}
          initial="hidden"
          animate="visible"
          variants={blurInVariant}
          className="flex items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm md:text-base lg:text-lg font-light tracking-[0.3em] uppercase text-white/90 mb-6 drop-shadow-lg"
        >
          <span className="h-[1px] w-8 sm:w-16 bg-white/40 hidden sm:inline-block" />
          <span className="font-calligraphy normal-case text-3xl sm:text-4xl md:text-5xl tracking-normal text-white">Best,</span>
          <span>You Will Ever</span>
          <span className="font-calligraphy normal-case text-3xl sm:text-4xl md:text-5xl tracking-normal text-white">Experience</span>
          <span className="h-[1px] w-8 sm:w-16 bg-white/40 hidden sm:inline-block" />
        </motion.div>

        {/* 4. Elegant Website Description (Blurs in) */}
        <motion.p
          custom={0.6}
          initial="hidden"
          animate="visible"
          variants={blurInVariant}
          className="text-sm sm:text-base md:text-lg text-white/80 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md mb-8 px-4"
        >
          Curated hill station getaways in Yercaud, handpicked luxury resorts, bespoke domestic & international tours, and 24/7 dedicated private chauffeurs.
        </motion.p>

        {/* 5. Primary Action CTAs (Blurs in) */}
        <motion.div
          custom={0.75}
          initial="hidden"
          animate="visible"
          variants={blurInVariant}
          className="flex flex-wrap items-center justify-center gap-3.5 pointer-events-auto"
        >
          <Link
            href="/all-in-one-booking"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-xl hover:scale-105 border border-emerald-400/30"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>All-in-One Booking</span>
          </Link>
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-white/90 transition-all shadow-xl hover:scale-105"
          >
            <span>Tour Packages</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/cars"
            className="inline-flex items-center gap-2 bg-black/40 hover:bg-black/60 text-white backdrop-blur-md px-6 py-3.5 rounded-full border border-white/20 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all hover:scale-105"
          >
            <Car className="w-3.5 h-3.5 text-emerald-400" />
            <span>Cars from ₹1,800</span>
          </Link>
          <Link
            href="/off-road"
            className="inline-flex items-center gap-2 bg-black/40 hover:bg-black/60 text-white backdrop-blur-md px-6 py-3.5 rounded-full border border-white/20 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all hover:scale-105"
          >
            <span>Off-Road Trails</span>
          </Link>
        </motion.div>


      </div>

      {/* 6. Featured Package Floating Card - Bottom Left */}
      <motion.div
        custom={0.9}
        initial="hidden"
        animate="visible"
        variants={blurInVariant}
        className="absolute bottom-10 left-6 sm:left-12 max-w-xs sm:max-w-sm pointer-events-auto hidden md:block"
      >
        <Link href={heroFeaturedPkg ? `/packages/${heroFeaturedPkg.slug}` : "/packages"} className="group block">
          <div className="p-5 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/15 transition-all duration-500 hover:bg-black/50 hover:border-white/30 shadow-2xl">
            <div className="text-[10px] tracking-widest uppercase text-amber-300/90 mb-1.5 font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Featured Experience</span>
            </div>
            <h3 className="font-heading text-xl text-white mb-3 pr-4 line-clamp-1">
              {heroFeaturedPkg?.title || "Explore Our Packages"}
            </h3>
            
            <div className="relative h-28 w-full rounded-xl overflow-hidden mb-3">
              <Image 
                src={heroFeaturedImg?.url || "/images/yercaud/emerald_lake.jpg"} 
                alt={heroFeaturedPkg?.title || "Destinations"}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            
            <div className="flex justify-between items-center text-[11px] uppercase tracking-widest text-white/90">
              <span className="text-white/70">{heroFeaturedPkg?.duration || "Exclusive Tour"}</span>
              <span className="text-white border-b border-white/60 pb-0.5 group-hover:border-white transition-colors">View Details</span>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* 7. Scroll Indicator - Bottom Center */}
      <motion.div
        custom={0.95}
        initial="hidden"
        animate="visible"
        variants={blurInVariant}
        className="flex flex-col items-center gap-1.5 text-white/70 pointer-events-none mt-auto drop-shadow-md"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-light text-white/60">Scroll to Explore</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-white/80" />
      </motion.div>
    </div>
  );
}
