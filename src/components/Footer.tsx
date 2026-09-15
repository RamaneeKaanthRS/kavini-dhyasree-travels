import Link from 'next/link';
import { Compass, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-20 w-full bg-[#050505] text-white/80 border-t border-white/10 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 text-white font-bold text-xl cursor-pointer">
              <Compass className="h-6 w-6 text-primary" />
              <span>Kavini Dhyasree</span>
            </Link>
            <p className="text-sm text-primary/80">
              Creating unforgettable travel experiences across South India, North India, and global international destinations.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-emerald-400 transition-colors cursor-pointer">Home</Link></li>
              <li><Link href="/all-in-one-booking" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors cursor-pointer">★ All-in-One Booking</Link></li>
              <li><Link href="/cars" className="hover:text-emerald-400 transition-colors cursor-pointer">Cars & Travel Services</Link></li>
              <li><Link href="/off-road" className="hover:text-emerald-400 transition-colors cursor-pointer">Off-Road Experiences</Link></li>
              <li><Link href="/experiences" className="hover:text-emerald-400 transition-colors cursor-pointer">Yercaud Experiences</Link></li>
              <li><Link href="/rooms" className="hover:text-emerald-400 transition-colors cursor-pointer">Rooms & Cottages</Link></li>
              <li><Link href="/packages" className="hover:text-emerald-400 transition-colors cursor-pointer">Tour Packages</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Yercaud & Tours</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/cars" className="hover:text-emerald-400 transition-colors cursor-pointer">Swift / Innova / Ertiga</Link></li>
              <li><Link href="/off-road" className="hover:text-emerald-400 transition-colors cursor-pointer">4x4 Mountain Trails</Link></li>
              <li><Link href="/experiences" className="hover:text-emerald-400 transition-colors cursor-pointer">Private Estate & Waterfalls</Link></li>
              <li><Link href="/rooms" className="hover:text-emerald-400 transition-colors cursor-pointer">Hill Stay from ₹1,999/day</Link></li>
              <li><Link href="/packages?category=Hill+Station" className="hover:text-emerald-400 transition-colors cursor-pointer">Hill Station Packages</Link></li>
            </ul>
          </div>


          <div className="space-y-3">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact Info</h3>
            <div className="flex items-start space-x-2 text-sm">
              <Phone className="h-4 w-4 text-primary shrink-0 mt-1" />
              <div>
                <p>+91 94896 48021</p>
                <p>+91 94883 07936</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="h-4 w-4 text-primary shrink-0" />
              <span>dhya6925@gmail.com</span>
            </div>
            <div className="flex items-start space-x-2 text-sm">
              <MapPin className="h-4 w-4 text-primary shrink-0 mt-1" />
              <span>Piliyur, Yercaud Tk, Salem Dt - 636602</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-xs text-white/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Kavini Dhyasree. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
