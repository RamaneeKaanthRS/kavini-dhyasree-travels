'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Day {
  id: string;
  dayNumber: number;
  title: string;
  description: string;
}

export default function ItineraryAccordion({ days }: { days: Day[] }) {
  const [openDays, setOpenDays] = useState<Record<string, boolean>>({
    [days[0]?.id]: true // Open first day by default
  });

  const toggleDay = (id: string) => {
    setOpenDays(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const sortedDays = [...days].sort((a, b) => a.dayNumber - b.dayNumber);

  return (
    <div className="space-y-4">
      {sortedDays.map((day) => {
        const isOpen = openDays[day.id];
        return (
          <div key={day.id} className="aurora-card rounded-2xl overflow-hidden border border-primary/20">
            <button
              onClick={() => toggleDay(day.id)}
              className="w-full flex items-center justify-between p-5 bg-[#050505]/40 hover:bg-primary/5 transition-colors text-left cursor-pointer focus:outline-none"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-emerald-500 text-white font-bold h-10 w-10 rounded-xl flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20">
                  D{day.dayNumber}
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm sm:text-base">{day.title}</h4>
                  <p className="text-xxs text-secondary font-semibold uppercase tracking-wider mt-0.5">Day {day.dayNumber}</p>
                </div>
              </div>
              <div>
                <motion.div
                  initial={false}
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-5 w-5 text-primary" />
                </motion.div>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="p-5 border-t border-primary/20 bg-[#050505]/85 text-sm text-secondary leading-relaxed">
                    <p>{day.description}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
