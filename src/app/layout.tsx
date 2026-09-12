import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import CarTransitionOverlay from "@/components/CarTransitionOverlay";
import { Cormorant, Montserrat, Great_Vibes } from "next/font/google";
import { cn } from "@/lib/utils";

const cormorant = Cormorant({ subsets: ['latin'], variable: '--font-cormorant', weight: ['400', '500', '600', '700'] });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', weight: ['300', '400', '500', '600', '700'] });
const greatVibes = Great_Vibes({ subsets: ['latin'], variable: '--font-calligraphy', weight: ['400'] });

export const metadata: Metadata = {
  title: {
    default: "Kavini Dhyasree | Best Travel Agency & Hotel Stays in Yercaud, Salem",
    template: "%s | Kavini Dhyasree – Yercaud Travel & Hotels",
  },
  description:
    "Kavini Dhyasree is Yercaud's premier travel service offering luxury hotel stays & cottages, 4x4 off-road trails, Salem ↔ Yercaud car rentals, and curated tour packages. Book your dream hill station getaway today.",
  keywords: [
    "Yercaud travel agency",
    "Yercaud hotels",
    "Yercaud tour packages",
    "Yercaud hill station",
    "best hotels in Yercaud",
    "Yercaud accommodation",
    "Yercaud resort booking",
    "Salem to Yercaud car rental",
    "Yercaud off road",
    "Yercaud sightseeing",
    "South India tour packages",
    "North India tour packages",
    "Kavini Dhyasree",
    "Yercaud stays",
    "Yercaud stay packages",
    "Yercaud honeymoon packages",
    "Yercaud family trip",
    "Yercaud budget hotels",
    "Yercaud luxury stay",
    "Salem travel agent",
    "Tamil Nadu hill station tours",
  ],
  authors: [{ name: "Kavini Dhyasree" }],
  creator: "Kavini Dhyasree",
  publisher: "Kavini Dhyasree",
  metadataBase: new URL("https://kavinidhyasree.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kavini Dhyasree | Best Travel Agency & Hotel Stays in Yercaud, Salem",
    description:
      "Book premium Yercaud hotel stays, 4x4 off-road trails & Salem ↔ Yercaud car rentals. South India, North India & International tours from Yercaud's most trusted travel team.",
    url: "https://kavinidhyasree.com",
    siteName: "Kavini Dhyasree",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/travel_hero.jpg",
        width: 1200,
        height: 630,
        alt: "Kavini Dhyasree – Premium Travel & Hotel Stays in Yercaud",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kavini Dhyasree | Yercaud Travel Agency & Hotel Stays",
    description:
      "Premium Yercaud hotel stays, 4x4 off-road trails & car services. Book your Yercaud hill station getaway with Tamil Nadu's trusted travel team.",
    images: ["/travel_hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "IN-TN",
    "geo.placename": "Yercaud, Salem, Tamil Nadu",
    "geo.position": "11.7748;78.2091",
    "ICBM": "11.7748, 78.2091",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["TravelAgency", "LocalBusiness", "LodgingBusiness"],
  name: "Kavini Dhyasree",
  description:
    "Premier travel service in Yercaud offering luxury hotel stays, 4x4 off-road adventures, and car rental services across Salem and Yercaud.",
  url: "https://kavinidhyasree.com",
  telephone: ["+919489648021", "+919488307936"],
  email: "dhya6925@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Piliyur",
    addressLocality: "Yercaud",
    addressRegion: "Tamil Nadu",
    postalCode: "636602",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 11.7748,
    longitude: 78.2091,
  },
  areaServed: [
    { "@type": "City", name: "Yercaud" },
    { "@type": "City", name: "Salem" },
    { "@type": "State", name: "Tamil Nadu" },
    { "@type": "Country", name: "India" },
  ],
  serviceType: [
    "Hotel Accommodation",
    "Tour Packages",
    "Car Rentals",
    "Off-Road Adventures",
    "Hill Station Tours",
  ],
  priceRange: "₹₹",
  image: "/travel_hero.jpg",
  sameAs: ["https://wa.me/919489648021"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("antialiased", montserrat.variable, cormorant.variable, greatVibes.variable)} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-montserrat bg-background text-foreground">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <WhatsAppCTA />
        <CarTransitionOverlay />
      </body>
    </html>
  );
}
