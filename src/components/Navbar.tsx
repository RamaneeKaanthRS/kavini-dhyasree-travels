'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Search, Heart, User, ShoppingBag, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRentalsClick = (e: React.MouseEvent) => {
    if (pathname !== '/car-rental') {
      e.preventDefault();
      setIsOpen(false);
      window.dispatchEvent(new CustomEvent('trigger-car-transition'));
    }
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "bg-black/80 backdrop-blur-md py-4" : "bg-transparent py-6"
    )}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left Navigation Links */}
          <div className="hidden xl:flex items-center space-x-6 text-sm font-medium tracking-wide">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <Link href="/all-in-one-booking" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              All-in-One Booking
            </Link>
            <Link href="/cars" className="hover:text-emerald-400 transition-colors">Cars</Link>
            <Link href="/off-road" className="hover:text-emerald-400 transition-colors">Off-Road</Link>
            <Link href="/experiences" className="hover:text-emerald-400 transition-colors">Experiences</Link>
            <Link href="/rooms" className="hover:text-emerald-400 transition-colors">Rooms</Link>
            <Link href="/packages" className="hover:text-white/70 transition-colors">Packages</Link>
          </div>

          {/* Fallback for medium screens (md to xl) */}
          <div className="hidden md:flex xl:hidden items-center space-x-4 text-xs font-medium tracking-wide">
            <Link href="/all-in-one-booking" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">All-in-One</Link>
            <Link href="/cars" className="hover:text-emerald-400 transition-colors">Cars</Link>
            <Link href="/off-road" className="hover:text-emerald-400 transition-colors">Off-Road</Link>
            <Link href="/rooms" className="hover:text-emerald-400 transition-colors">Rooms</Link>
            <Link href="/packages" className="hover:text-white/70 transition-colors">Packages</Link>
          </div>

          {/* Center Logo */}
          <div className="flex-1 md:flex-none flex justify-center">
            <Link href="/" className="font-heading text-2xl sm:text-3xl tracking-wide flex items-center gap-2">
              <span>Kavini Dhyasree</span>
            </Link>
          </div>

          {/* Right Action / WhatsApp Contact */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://wa.me/919489648021"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-full transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
            >
              <span>Enquire</span>
            </a>
            <a
              href="tel:+919489648021"
              className="text-xs text-white/80 hover:text-white border border-white/20 px-3 py-1.5 rounded-full transition-all"
            >
              Call
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hover:text-white/70 transition-colors cursor-pointer p-2"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" strokeWidth={1.5} /> : <Menu className="w-6 h-6" strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-2xl border-t border-white/10 flex flex-col items-center py-6 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-base tracking-wide hover:text-white/70 transition-colors">Home</Link>
          <Link href="/all-in-one-booking" onClick={() => setIsOpen(false)} className="text-base font-bold text-emerald-400 tracking-wide hover:text-emerald-300 transition-colors bg-emerald-500/10 border border-emerald-500/30 px-6 py-2 rounded-full">
            ⭐ All-in-One Booking
          </Link>
          <Link href="/cars" onClick={() => setIsOpen(false)} className="text-base font-medium text-emerald-400 tracking-wide hover:text-emerald-300 transition-colors">Cars & Travel Services</Link>
          <Link href="/off-road" onClick={() => setIsOpen(false)} className="text-base font-medium text-emerald-400 tracking-wide hover:text-emerald-300 transition-colors">Off-Road Trails</Link>
          <Link href="/experiences" onClick={() => setIsOpen(false)} className="text-base font-medium text-emerald-400 tracking-wide hover:text-emerald-300 transition-colors">Yercaud Experiences</Link>
          <Link href="/rooms" onClick={() => setIsOpen(false)} className="text-base font-medium text-emerald-400 tracking-wide hover:text-emerald-300 transition-colors">Rooms & Cottages</Link>
          <Link href="/packages" onClick={() => setIsOpen(false)} className="text-base tracking-wide hover:text-white/70 transition-colors">Tour Packages</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="text-base tracking-wide hover:text-white/70 transition-colors">About Us</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="text-base tracking-wide hover:text-white/70 transition-colors">Contact</Link>
          
          <div className="w-3/4 pt-4 border-t border-white/10 flex flex-col gap-2.5 items-center">
            <a
              href="https://wa.me/919489648021"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-xl text-xs"
            >
              WhatsApp Enquiry (+91 94896 48021)
            </a>
            <a
              href="tel:+919489648021"
              className="w-full text-center bg-white/10 hover:bg-white/20 text-white font-medium py-2.5 rounded-xl text-xs"
            >
              Call Directly
            </a>
          </div>
        </div>
      )}

    </nav>
  );
}
