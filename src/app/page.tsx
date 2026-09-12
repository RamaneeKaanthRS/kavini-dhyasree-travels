import Link from 'next/link';
import { db } from '@/lib/db';
import InquiryForm from '@/components/InquiryForm';
import { CircularGallery, GalleryItem } from '@/components/ui/circular-gallery';
import { ShieldCheck, ThumbsUp, Award, Star, ArrowRight } from 'lucide-react';
import ThreeDCameraScroll from '@/components/ThreeDCameraScroll';
import HeroOverlay from '@/components/HeroOverlay';
import BookCarTransition from '@/components/BookCarTransition';

export const revalidate = 3600;

export default async function HomePage() {
  let featuredPackages: any[] = [];
  try {
    featuredPackages = await db.package.findMany({
      where: { active: true },
      take: 6,
      include: {
        images: true,
      },
    });
  } catch (err) {
    console.error('Error fetching featured packages:', err);
  }

  // Curated Collections with Authentic Stay Photos from Yercaud
  const stayGalleryItems: GalleryItem[] = [
    {
      common: 'Private Plantation Cottage',
      binomial: 'Exclusive Estate Haven | Enquire',
      photo: { url: '/stayphotos/stay_photo00001.jpeg', text: 'Plantation Cottage', by: 'Kavini Dhyasree' },
      href: '/rooms',
    },
    {
      common: 'Deluxe Balcony Hill Room',
      binomial: 'Valley Facing | from ₹2,000/day',
      photo: { url: '/stayphotos/stay_photo00014.jpeg', text: 'Deluxe Balcony Room', by: 'Kavini Dhyasree' },
      href: '/rooms',
    },
    {
      common: 'Spacious Family Hill Suite',
      binomial: '4 - 5 Guests | from ₹3,500/day',
      photo: { url: '/stayphotos/stay_photo00003.jpeg', text: 'Spacious Family Suite', by: 'Kavini Dhyasree' },
      href: '/rooms',
    },
    {
      common: 'Cozy Valley Retreat Room',
      binomial: 'Peaceful Mountain Stay | from ₹2,000/day',
      photo: { url: '/stayphotos/stay_photo00006.jpeg', text: 'Cozy Valley Room', by: 'Kavini Dhyasree' },
      href: '/rooms',
    },
    {
      common: 'Private Homestay Villa',
      binomial: 'Group Stays up to 25 Guests | Enquire',
      photo: { url: '/stayphotos/stay_photo00018.jpeg', text: 'Private Homestay Villa', by: 'Kavini Dhyasree' },
      href: '/rooms',
    },
    {
      common: 'Scenic Wooden Chalet Room',
      binomial: 'Sunrise Mountain Balcony | Enquire',
      photo: { url: '/stayphotos/stay_photo00004.jpeg', text: 'Wooden Chalet Room', by: 'Kavini Dhyasree' },
      href: '/rooms',
    },
    {
      common: 'Estate View Master Suite',
      binomial: 'Lush Coffee Plantation View | from ₹2,000/day',
      photo: { url: '/stayphotos/stay_photo00015.jpeg', text: 'Master Suite', by: 'Kavini Dhyasree' },
      href: '/rooms',
    },
    {
      common: 'Hillside Group Cottage',
      binomial: 'Campfire & Valley Lawn | Enquire',
      photo: { url: '/stayphotos/stay_photo00017.jpeg', text: 'Hillside Cottage', by: 'Kavini Dhyasree' },
      href: '/rooms',
    },
  ];

  const finalGalleryItems = stayGalleryItems;

  // Get the first featured package for the hero card
  const heroFeaturedPkg = featuredPackages[0];
  const heroFeaturedImg = heroFeaturedPkg?.images?.find((img: any) => img.isHero) || heroFeaturedPkg?.images?.[0];

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* 3D SCROLL BACKGROUND (Fixed canvas scrubbing smoothly with natural page scroll) */}
      <ThreeDCameraScroll sequence="full_length" startFrame={0} endFrame={838} showProgress={true} />

      {/* NATURAL CONTENT FLOW - NO ARTIFICIAL 800vh OR LOCKED OVERLAYS */}
      <div className="relative z-10 space-y-12 sm:space-y-20">
        
        {/* 1. IMMERSIVE HERO SECTION */}
        <HeroOverlay heroFeaturedPkg={heroFeaturedPkg} heroFeaturedImg={heroFeaturedImg} />

        {/* 2. REFINED STATS SECTION */}
        <section className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center divide-x divide-white/10 bg-black/40 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl">
            <div className="space-y-2">
              <h3 className="font-heading text-4xl sm:text-5xl font-light text-white drop-shadow-md">5000+</h3>
              <p className="text-xs uppercase tracking-widest text-white/70 drop-shadow-md">Happy Travelers</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-heading text-4xl sm:text-5xl font-light text-white drop-shadow-md">150+</h3>
              <p className="text-xs uppercase tracking-widest text-white/70 drop-shadow-md">Curated Tours</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-heading text-4xl sm:text-5xl font-light text-white drop-shadow-md">50+</h3>
              <p className="text-xs uppercase tracking-widest text-white/70 drop-shadow-md">Luxury Vehicles</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-heading text-4xl sm:text-5xl font-light text-white drop-shadow-md">99%</h3>
              <p className="text-xs uppercase tracking-widest text-white/70 drop-shadow-md">Satisfaction</p>
            </div>
          </div>
        </section>

        {/* 3. SALEM ↔ YERCAUD SPECIALISTS & CAR RENTALS */}
        <section className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="p-8 sm:p-12 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl">
            <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wider uppercase">
                <span>Salem ↔ Yercaud Specialists</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-white tracking-wide drop-shadow-md">
                Premium Car Rentals & Tours
              </h2>
              <div className="w-12 h-[1px] bg-white/20 mx-auto drop-shadow-md"></div>
              <p className="text-white/90 font-light leading-relaxed drop-shadow-md text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
                Experience the ultimate comfort and freedom with our luxury car rentals and hill packages. Whether for a scenic 20-hairpin ghat road transfer or an off-road safari, we have the perfect ride.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <BookCarTransition />
                <Link
                  href="/all-in-one-booking"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-7 py-3.5 rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm transition-all shadow-xl hover:scale-105"
                >
                  <span>All-in-One Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full border border-white/20 flex items-center justify-center text-white bg-black/30 backdrop-blur-md shadow-lg">
                  <ShieldCheck className="w-5 h-5 drop-shadow-md" strokeWidth={1} />
                </div>
                <h3 className="font-heading text-xl sm:text-2xl text-white tracking-wide drop-shadow-md">Safe & Reliable</h3>
                <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed drop-shadow-md">
                  Fully licensed drivers with 10+ years mountain ghat road expertise for your complete peace of mind.
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full border border-white/20 flex items-center justify-center text-white bg-black/30 backdrop-blur-md shadow-lg">
                  <ThumbsUp className="w-5 h-5 drop-shadow-md" strokeWidth={1} />
                </div>
                <h3 className="font-heading text-xl sm:text-2xl text-white tracking-wide drop-shadow-md">Ultimate Comfort</h3>
                <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed drop-shadow-md">
                  Travel in style with our pristine Swift, Innova, and Ertiga fleet, ensuring a relaxing hill climb.
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full border border-white/20 flex items-center justify-center text-white bg-black/30 backdrop-blur-md shadow-lg">
                  <Award className="w-5 h-5 drop-shadow-md" strokeWidth={1} />
                </div>
                <h3 className="font-heading text-xl sm:text-2xl text-white tracking-wide drop-shadow-md">Competitive Pricing</h3>
                <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed drop-shadow-md">
                  Transparent rates with no hidden fees starting at ₹1,800, giving you unmatched value for premium travel.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CURATED COLLECTIONS (CIRCULAR GALLERY) */}
        <section className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 overflow-hidden">
          <div className="w-full mb-6 sm:mb-8 text-center">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-white mb-2 drop-shadow-lg">
              Curated Collections
            </h2>
            <div className="w-12 h-[1px] bg-white/20 mx-auto mb-4 drop-shadow-md"></div>
            <div className="flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <Link
                href="/rooms"
                className="uppercase tracking-widest text-white/90 hover:text-white transition-colors pb-0.5 border-b border-transparent hover:border-white/40 drop-shadow-md"
              >
                Explore Stays & Rooms
              </Link>
              <span className="text-white/40">•</span>
              <Link
                href="/all-in-one-booking"
                className="uppercase tracking-widest text-emerald-400 hover:text-emerald-300 transition-colors pb-0.5 border-b border-emerald-400/50 hover:border-emerald-400 drop-shadow-md font-semibold"
              >
                All-in-One Booking Hub
              </Link>
            </div>
          </div>

          {finalGalleryItems.length > 0 ? (
            <div className="w-full h-[400px] relative drop-shadow-2xl">
              <CircularGallery items={finalGalleryItems} radius={290} autoRotateSpeed={0.10} />
            </div>
          ) : (
            <div className="mx-auto max-w-3xl px-4 w-full text-center py-16 border border-white/20 rounded-2xl bg-black/30 backdrop-blur-xl">
              <p className="text-white/80 font-light">Exquisite collections are being prepared. Return soon.</p>
            </div>
          )}
        </section>

        {/* 5. ELEGANT TESTIMONIALS */}
        <section className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="p-8 sm:p-12 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-12">
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-white tracking-wide drop-shadow-md">Echoes of Travel</h2>
              <div className="w-12 h-[1px] bg-white/20 mx-auto drop-shadow-md"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="flex flex-col items-center text-center space-y-6 px-4">
                <div className="flex space-x-1 text-white/80 drop-shadow-md">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>
                <p className="text-white font-light italic leading-relaxed text-lg font-heading drop-shadow-lg">
                  "A flawless trip to Yercaud. The resort selected was premium and our chauffeur was exceptionally knowledgeable on the 20 hairpin bends."
                </p>
                <div className="pt-4 drop-shadow-md">
                  <h4 className="text-xs uppercase tracking-widest text-white/90">Venkatesh S.</h4>
                  <p className="text-[10px] text-white/80 mt-1 uppercase">Salem, India</p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center space-y-6 px-4">
                <div className="flex space-x-1 text-white/80 drop-shadow-md">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>
                <p className="text-white font-light italic leading-relaxed text-lg font-heading drop-shadow-lg">
                  "The off-road private estate safari in Yercaud was breathtaking! Completely exclusive trails away from typical tourist spots."
                </p>
                <div className="pt-4 drop-shadow-md">
                  <h4 className="text-xs uppercase tracking-widest text-white/90">Priya Raman</h4>
                  <p className="text-[10px] text-white/80 mt-1 uppercase">Bangalore, India</p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center space-y-6 px-4">
                <div className="flex space-x-1 text-white/80 drop-shadow-md">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>
                <p className="text-white font-light italic leading-relaxed text-lg font-heading drop-shadow-lg">
                  "Outstanding car rental service with clean Innova and punctual pickup at Salem Junction. Premium luxury at reasonable rates."
                </p>
                <div className="pt-4 drop-shadow-md">
                  <h4 className="text-xs uppercase tracking-widest text-white/90">John Doe</h4>
                  <p className="text-[10px] text-white/80 mt-1 uppercase">London, UK</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. INQUIRY SECTION (Ends cleanly before the Footer) */}
        <section className="w-full mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 pb-12 sm:pb-16">
          <div className="text-center max-w-2xl mx-auto space-y-4 sm:space-y-6 mb-8 sm:mb-10">
            <h2 className="font-heading text-3xl sm:text-5xl font-medium text-white drop-shadow-md">Begin Your Journey</h2>
            <div className="w-12 h-[1px] bg-white/20 mx-auto drop-shadow-md"></div>
            <p className="text-white/90 font-light drop-shadow-md text-sm sm:text-base">Allow us to curate a personalized, premium itinerary for your next adventure.</p>
          </div>
          
          <div className="liquid-glass-heavy bg-black/40 p-6 sm:p-10 rounded-3xl shadow-2xl relative z-20 backdrop-blur-2xl border border-white/10">
            <InquiryForm />
          </div>
        </section>

      </div>
    </div>
  );
}
