'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Users, Fuel, Gauge, Shield, MessageCircle, Check, ArrowRight } from 'lucide-react';
import { VehicleService } from '@/data/cars';
import { buildVehicleEnquiryMessage, openWhatsAppChat } from '@/lib/whatsapp';

interface VehicleCardProps {
  vehicle: VehicleService;
  compact?: boolean;
}

export default function VehicleCard({ vehicle, compact = false }: VehicleCardProps) {
  const [selectedDuration, setSelectedDuration] = useState<string>(vehicle.availableDurations[0] || '1 Day');
  const [selectedOption, setSelectedOption] = useState<string>(vehicle.serviceOptions[0] || 'Standard');

  const handleWhatsAppEnquiry = () => {
    const message = buildVehicleEnquiryMessage({
      vehicleName: vehicle.name,
      duration: selectedDuration,
      serviceOption: selectedOption
    });
    openWhatsAppChat(message);
  };

  return (
    <div className="group relative rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col overflow-hidden shadow-2xl backdrop-blur-xl hover:-translate-y-1">
      {/* Vehicle Image Container */}
      <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-black/40">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        
        {/* Category & Popular Tag */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
          <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/60 text-white/90 border border-white/20 backdrop-blur-md">
            {vehicle.category}
          </span>
          {vehicle.popular && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/90 text-black shadow-lg">
              Popular Choice
            </span>
          )}
        </div>

        {/* Starting Price Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-emerald-400 font-bold block mb-0.5">
              Best Guaranteed Rate
            </span>
            <div className="text-white font-heading text-2xl sm:text-3xl font-bold flex items-baseline gap-1.5 drop-shadow-md">
              <span>₹{vehicle.startingPrice.toLocaleString('en-IN')}</span>
              <span className="text-xs font-normal text-white/70 tracking-normal font-sans">
                / {vehicle.priceNote.includes('pickup') ? 'pickup' : 'starting'}
              </span>
            </div>
          </div>
          <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full font-medium">
            Starting Price
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-5">
        <div>
          {/* Header */}
          <div className="mb-3">
            <h3 className="font-heading text-2xl font-bold text-white tracking-wide">
              {vehicle.name}
            </h3>
            <p className="text-xs text-white/70 font-light mt-1 line-clamp-2">
              {vehicle.tagline}
            </p>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 text-center my-3 bg-white/[0.02] rounded-xl px-2">
            <div className="flex flex-col items-center justify-center p-1">
              <Users className="w-4 h-4 text-emerald-400 mb-1" />
              <span className="text-[11px] font-medium text-white/90 truncate w-full">{vehicle.capacity}</span>
            </div>
            <div className="flex flex-col items-center justify-center p-1 border-x border-white/10">
              <Gauge className="w-4 h-4 text-emerald-400 mb-1" />
              <span className="text-[11px] font-medium text-white/90 truncate w-full">{vehicle.transmission}</span>
            </div>
            <div className="flex flex-col items-center justify-center p-1">
              <Fuel className="w-4 h-4 text-emerald-400 mb-1" />
              <span className="text-[11px] font-medium text-white/90 truncate w-full">{vehicle.fuelType}</span>
            </div>
          </div>

          {/* Key Feature Bullets */}
          <ul className="space-y-1.5 my-3 text-xs text-white/80">
            {vehicle.features.slice(0, compact ? 3 : 4).map((feat, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{feat}</span>
              </li>
            ))}
          </ul>

          {/* Interactive Option Selectors for WhatsApp Pre-fill */}
          <div className="space-y-3 pt-2">
            {/* Duration Selector */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-white/60 font-semibold mb-1.5">
                Select Duration / Trip
              </label>
              <div className="flex flex-wrap gap-1.5">
                {vehicle.availableDurations.map((dur) => (
                  <button
                    key={dur}
                    type="button"
                    onClick={() => setSelectedDuration(dur)}
                    className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                      selectedDuration === dur
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                    }`}
                  >
                    {dur}
                  </button>
                ))}
              </div>
            </div>

            {/* Service Option Selector */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-white/60 font-semibold mb-1.5">
                Service Requirement
              </label>
              <div className="flex flex-wrap gap-1.5">
                {vehicle.serviceOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelectedOption(opt)}
                    className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                      selectedOption === opt
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic CTA */}
        <div className="pt-3 border-t border-white/10">
          <div className="bg-black/40 rounded-xl p-2.5 mb-3 border border-white/5">
            <p className="text-[11px] text-white/60">
              <span className="text-emerald-400 font-semibold">WhatsApp Message Preview: </span>
              "{buildVehicleEnquiryMessage({
                vehicleName: vehicle.name,
                duration: selectedDuration,
                serviceOption: selectedOption
              })}"
            </p>
          </div>

          <button
            onClick={handleWhatsAppEnquiry}
            className="w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 active:scale-[0.98] text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-lg hover:shadow-green-500/30 cursor-pointer text-sm"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Enquire Now on WhatsApp</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
          <p className="text-[10px] text-center text-white/40 mt-2">
            * Final pricing varies by exact route, timings & seasonal availability.
          </p>
        </div>
      </div>
    </div>
  );
}
