'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Users, Bed, Check, MessageCircle, ArrowRight, Home, Sparkles } from 'lucide-react';
import { RoomAccommodation } from '@/data/rooms';
import { buildRoomEnquiryMessage, openWhatsAppChat } from '@/lib/whatsapp';

interface RoomCardProps {
  room: RoomAccommodation;
}

export default function RoomCard({ room }: RoomCardProps) {
  const [activeImage, setActiveImage] = useState<string>(room.primaryImage);
  const [selectedDuration, setSelectedDuration] = useState<string>('1 Night');
  const [guestCount, setGuestCount] = useState<string>(room.maxGuests > 5 ? '10-15 Guests' : '2 Guests');

  const handleEnquiry = () => {
    const message = buildRoomEnquiryMessage({
      roomName: room.name,
      guests: guestCount,
      duration: selectedDuration,
      isEnquiryOnly: room.isEnquiryOnly
    });
    openWhatsAppChat(message);
  };


  return (
    <div className="group relative rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 hover:border-emerald-500/30 transition-all duration-300 flex flex-col overflow-hidden shadow-2xl backdrop-blur-xl hover:-translate-y-1">
      {/* Image Showcase Container */}
      <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-black/40">
        <Image
          src={activeImage}
          alt={room.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        {/* Capacity Highlight Badge */}
        <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500 text-black shadow-lg flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            <span>{room.capacity}</span>
          </span>
          {room.popular && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-400 text-black flex items-center gap-1 shadow-md">
              <Sparkles className="w-3 h-3" />
              <span>Guest Favorite</span>
            </span>
          )}
        </div>

        {/* Thumbnail switcher if multiple images */}
        {room.galleryImages.length > 1 && (
          <div className="absolute top-4 right-4 z-10 flex gap-1.5 bg-black/60 p-1 rounded-xl backdrop-blur-md border border-white/20">
            {room.galleryImages.slice(0, 3).map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImage(img)}
                className={`relative w-8 h-8 rounded-lg overflow-hidden border-2 transition-all ${
                  activeImage === img ? 'border-emerald-400 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <Image src={img} alt="thumbnail" fill className="object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Starting Price Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-emerald-400 font-bold block mb-0.5">
              {room.isEnquiryOnly ? 'Tariff' : 'Starting Tariff'}
            </span>
            {room.isEnquiryOnly ? (
              <div className="text-white font-heading text-xl sm:text-2xl font-bold flex items-baseline gap-1.5 drop-shadow-md">
                <span className="text-amber-300">Enquiry Alone</span>
              </div>
            ) : (
              <div className="text-white font-heading text-2xl sm:text-3xl font-bold flex items-baseline gap-1.5 drop-shadow-md">
                <span>₹{room.startingPrice?.toLocaleString('en-IN')}</span>
                <span className="text-xs font-normal text-white/70 tracking-normal font-sans">
                  / day (Starting from ₹2,000/day)
                </span>
              </div>
            )}
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-full backdrop-blur-md border ${
            room.isEnquiryOnly
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-semibold'
              : 'bg-black/60 text-white/90 border-white/20'
          }`}>
            {room.isEnquiryOnly ? 'Enquiry Alone' : room.category}
          </span>
        </div>

      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-5">
        <div>
          <div className="mb-3">
            <h3 className="font-heading text-2xl font-bold text-white tracking-wide">
              {room.name}
            </h3>
            <p className="text-xs text-white/70 font-light mt-1">
              {room.tagline}
            </p>
          </div>

          <p className="text-xs text-white/80 font-light leading-relaxed mb-4">
            {room.description}
          </p>

          {/* Key Amenities */}
          <div className="space-y-2 mb-5">
            <span className="text-[11px] uppercase tracking-wider text-white/50 font-bold block">
              Amenities & Facilities:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {room.facilities.slice(0, 4).map((facility, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-white/90 bg-white/[0.02] p-2 rounded-xl border border-white/5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{facility}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Option Selectors */}
          <div className="space-y-3 pt-1">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-white/60 font-semibold mb-1.5">
                Expected Stay Duration
              </label>
              <div className="flex flex-wrap gap-1.5">
                {['1 Night', '2 Nights', '3+ Nights', 'Weekend Plan'].map((dur) => (
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

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-white/60 font-semibold mb-1.5">
                Guests Count
              </label>
              <div className="flex flex-wrap gap-1.5">
                {(room.maxGuests <= 5
                  ? ['1-2 Guests', '3-4 Guests', '5 Guests (Full Room)']
                  : ['5-10 Guests', '10-15 Guests', '16-25 Guests (Full Cottage)']
                ).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGuestCount(g)}
                    className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                      guestCount === g
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
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
            <span>Enquire on WhatsApp</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
          <p className="text-[10px] text-center text-white/40 mt-2">
            {room.isEnquiryOnly
              ? '* Cottage & Homestay rates provided upon enquiry alone based on group size & dates.'
              : '* Rooms starting from ₹2,000/day. Exact rate depends on dates, guests & package.'}
          </p>

        </div>
      </div>
    </div>
  );
}
