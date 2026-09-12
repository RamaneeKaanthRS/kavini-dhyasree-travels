import Link from 'next/link';
import { db } from '@/lib/db';
import ThreeDCameraScroll from '@/components/ThreeDCameraScroll';
import { Compass, MapPin, Clock, Users, ArrowRight, MessageCircle, ArrowUpRight } from 'lucide-react';
import type { Metadata } from 'next';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: "Tour Packages – Yercaud, South India, North India & International",
  description:
    "Browse premium tour packages from Kavini Dhyasree. Yercaud hill station getaways, South India temple tours, North India heritage trips & international holidays. Enquire for best prices.",
  alternates: { canonical: "/packages" },
  openGraph: {
    title: "Tour Packages – Kavini Dhyasree, Yercaud",
    description:
      "Discover curated tour packages for Yercaud, Kerala, Goa, Rajasthan & international destinations. Custom itineraries with premium stays.",
    url: "https://kavinidhyasree.com/packages",
  },
};

export const revalidate = 60; // ISR validation

interface PageProps {
  searchParams: Promise<{ category?: string; sort?: string }>;
}

export default async function PackagesPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const category = searchParams.category;
  const sort = searchParams.sort;

  // Build query
  const where: any = { active: true };
  if (category) {
    where.category = category;
  }

  let orderBy: any = { lastUpdated: 'desc' };
  if (sort === 'price-low') {
    orderBy = { price: 'asc' };
  } else if (sort === 'price-high') {
    orderBy = { price: 'desc' };
  }

  const packages = await db.package.findMany({
    where,
    orderBy,
    include: { images: true }
  });

  const categories = ['South India', 'North India', 'International', 'Hill Station'];

  return (
    <div className="relative min-h-screen text-white pt-24 pb-10 overflow-hidden">
      {/* 3D SCROLL BACKGROUND (Mountain peaks, lush tea/coffee valleys & hill cottages) */}
      <ThreeDCameraScroll
        sequence="full_length"
        startFrame={0}
        endFrame={320}
        overlayClassName="bg-gradient-to-b from-black/75 via-black/50 to-black/85"
      />

      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl">Explore Our Tour Packages</h1>
          <p className="text-secondary">Find the perfect escape tailored to your journey. From the southern backwaters to international destinations.</p>
        </div>

        {/* Filters */}
        <div className="aurora-card p-6 rounded-2xl mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/packages"
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                !category 
                  ? 'bg-emerald-500 border-emerald-500 text-white font-bold shadow-sm shadow-emerald-500/25' 
                  : 'bg-white/5 border-white/15 text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              All Packages
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/packages?category=${encodeURIComponent(cat)}${sort ? `&sort=${sort}` : ''}`}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  category === cat
                    ? 'bg-emerald-500 border-emerald-500 text-white font-bold shadow-sm shadow-emerald-500/25'
                    : 'bg-white/5 border-white/15 text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>


        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => {
            const heroImage = pkg.images.find(img => img.isHero) || pkg.images[0];
            const imageUrl = heroImage?.url || '/images/yercaud/emerald_lake.jpg';
            
            return (
              <div key={pkg.id} className="aurora-card overflow-hidden rounded-3xl aurora-card-hover flex flex-col h-full">
                <div className="relative h-56 w-full shrink-0">
                  <img 
                    src={imageUrl} 
                    alt={pkg.title} 
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[#050505]/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-foreground border border-primary/20">
                    {pkg.category}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-1 text-xs text-secondary font-semibold">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{pkg.destination}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-foreground leading-tight">
                      {pkg.title}
                    </h3>
                    
                    <p className="text-xs text-secondary line-clamp-2">
                      {pkg.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-secondary font-medium bg-primary/5 p-2.5 rounded-xl border border-primary/10">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3.5 w-3.5 text-primary" />
                        <span>{pkg.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-3.5 w-3.5 text-primary" />
                        <span>Min Group: {pkg.minGroupSize}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-primary/10 mt-6 gap-2">
                    <a
                      href={getWhatsAppUrl(`Hello Kavini Dhyasree, I am inquiring about the "${pkg.title}" package (${pkg.duration}). Please share pricing and details.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/inq cursor-pointer block"
                    >
                      <p className="text-xxs uppercase tracking-wider text-secondary font-bold">Pricing</p>
                      <p className="text-sm font-bold text-green-400 group-hover/inq:text-green-300 flex items-center gap-1 transition-colors">
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Enquire on WhatsApp</span>
                      </p>
                    </a>
                    
                    <Link 
                      href={`/packages/${pkg.slug}`} 
                      className="inline-flex items-center justify-center bg-white hover:bg-white/90 text-black font-bold px-4 py-2.5 rounded-xl text-xs transition-colors cursor-pointer shrink-0 shadow-md"
                    >
                      <span>Details</span>
                      <ArrowRight className="h-4 w-4 ml-1.5 text-black" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          {packages.length === 0 && (
            <div className="col-span-3 text-center py-20 aurora-card rounded-3xl">
              <p className="text-secondary font-medium">No tour packages match your filters.</p>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
