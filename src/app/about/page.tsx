import { Compass, Users, MapPin, Award } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Us – Yercaud's Trusted Travel Agency Since 2010",
  description:
    "Learn about Kavini Dhyasree, Yercaud's premier travel agency. Over a decade of curating premium South India tours, Yercaud hill station stays, 4x4 off-road trails, and reliable car rentals from Salem.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Kavini Dhyasree – Yercaud Travel Experts",
    description:
      "Founded in Yercaud, we specialize in premium tour packages, luxury hotel stays & car travel services across Tamil Nadu and beyond.",
    url: "https://kavinidhyasree.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="aurora-bg min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl">About Kavini Dhyasree</h1>
          <p className="text-secondary">Connecting travelers with premium, customized tour experiences for over a decade.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Our Story</h2>
            <p className="text-sm sm:text-base text-secondary leading-relaxed">
              Founded in Yercaud, Kavini Dhyasree started with a simple vision: to make the majestic beauty of South India accessible to travelers worldwide. Over the years, we have expanded our services from simple local hill station excursions to comprehensive domestic and international travel packages.
            </p>
            <p className="text-sm sm:text-base text-secondary leading-relaxed">
              We operate a premium, clean fleet of vehicles and maintain partnerships with 4-star and luxury hospitality brands to deliver exceptional comfort, safety, and cultural integration at unbeatable prices.
            </p>
          </div>
          
          <div className="relative h-64 sm:h-96 rounded-3xl overflow-hidden shadow-md border border-primary/10">
            <img
              src="/images/yercaud/ghat_road.jpg"
              alt="Scenic Yercaud Mountain Ghat Road"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="aurora-card p-8 rounded-3xl space-y-3">
            <h3 className="font-bold text-foreground text-base">Our Mission</h3>
            <p className="text-xs sm:text-sm text-secondary leading-relaxed">To design personalized travel plans that respect our clients' budgets and schedule requirements while maximizing travel satisfaction.</p>
          </div>
          <div className="aurora-card p-8 rounded-3xl space-y-3">
            <h3 className="font-bold text-foreground text-base">Our Fleet</h3>
            <p className="text-xs sm:text-sm text-secondary leading-relaxed">From comfortable sedans to high-capacity tempo travelers, all our vehicles undergo strict maintenance checks for optimal road safety.</p>
          </div>
          <div className="aurora-card p-8 rounded-3xl space-y-3">
            <h3 className="font-bold text-foreground text-base">Local Experts</h3>
            <p className="text-xs sm:text-sm text-secondary leading-relaxed">Our tour guides and cab drivers possess deep knowledge of regional heritage, food specialties, and secret view points.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
