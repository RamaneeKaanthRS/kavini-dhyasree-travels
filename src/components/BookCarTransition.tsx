"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Car } from "lucide-react";

export default function BookCarTransition() {
  const router = useRouter();

  // Prefetch car rental page immediately
  useEffect(() => {
    router.prefetch("/car-rental");
  }, [router]);

  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("trigger-car-transition"));
  };

  return (
    <button 
      type="button"
      onClick={handleClick}
      className="group relative z-30 inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 uppercase tracking-widest text-sm cursor-pointer pointer-events-auto select-none"
    >
      <Car className="w-4 h-4 transition-transform group-hover:scale-110 pointer-events-none" />
      <span className="pointer-events-none">Book your Car</span>
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 pointer-events-none" />
    </button>
  );
}
