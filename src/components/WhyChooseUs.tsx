'use client';

import { ShieldCheck, Mountain, Clock, Award, PhoneCall, Sparkles } from 'lucide-react';

export default function WhyChooseUs() {
  const points = [
    {
      icon: Mountain,
      title: 'Salem ↔ Yercaud Specialists',
      desc: 'Expert mountain chauffeurs adept at smoothly navigating all 20 hairpin bends, fog, and steep ghat roads.'
    },
    {
      icon: ShieldCheck,
      title: 'Verified Stays & Private Trails',
      desc: 'Clean, safe accommodations (up to 25 pax) and exclusive private estate trails not open to ordinary tourist crowds.'
    },
    {
      icon: Award,
      title: 'Transparent Starting Rates',
      desc: 'Honest, upfront pricing starting from ₹1,800 for cabs and ₹2,000/day for rooms with zero surprise fees.'
    },
    {
      icon: Clock,
      title: 'Punctual Salem Pickups & Drops',
      desc: 'Always on-time pickups from Salem Junction Railway Station, Salem New Bus Stand, or your home/hotel doorstep.'
    },
    {
      icon: PhoneCall,
      title: 'Direct WhatsApp Booking',
      desc: 'No middleman app confusion. Chat directly with the owner to tailor your vehicle, timings, route, and cottage stay.'
    },
    {
      icon: Sparkles,
      title: 'Family & Group Friendly',
      desc: 'Safe, eco-conscious, strictly family-appropriate tours with pure nature immersion and zero alcohol promotions.'
    }
  ];

  return (
    <div className="w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
          The Salem ↔ Yercaud Difference
        </span>
        <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-wide">
          Why Travel & Stay With Us?
        </h2>
        <div className="w-16 h-0.5 bg-emerald-500 mx-auto"></div>
        <p className="text-white/80 text-sm sm:text-base font-light max-w-2xl mx-auto">
          We don't just provide cars or rooms — we create seamless, safe, and unforgettable Yercaud hill escapes backed by authentic local hospitality.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {points.map((pt, idx) => {
          const Icon = pt.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.01] border border-white/10 hover:border-emerald-500/30 transition-all duration-300 backdrop-blur-xl group hover:-translate-y-1 shadow-xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-white mb-2 tracking-wide">
                {pt.title}
              </h3>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                {pt.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
