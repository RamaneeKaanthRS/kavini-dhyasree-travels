import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import ImageGallery from '@/components/ImageGallery';
import ItineraryAccordion from '@/components/ItineraryAccordion';
import InquiryForm from '@/components/InquiryForm';
import PrintPDFButton from '@/components/PrintPDFButton';
import { MotionDiv } from '@/components/Motion';
import { Clock, Users, MapPin, CheckCircle, XCircle, Info, Calendar, MessageCircle } from 'lucide-react';
import type { Metadata } from 'next';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await db.package.findUnique({ where: { slug }, select: { title: true, destination: true, description: true, category: true } });
  if (!pkg) return { title: 'Package Not Found' };
  return {
    title: `${pkg.title} – ${pkg.destination} Tour Package`,
    description: `${pkg.description?.slice(0, 155)}... Book this ${pkg.category} tour package from Kavini Dhyasree, Yercaud. Enquire for best price.`,
    alternates: { canonical: `/packages/${slug}` },
    openGraph: {
      title: `${pkg.title} – Kavini Dhyasree Tour Package`,
      description: `Explore ${pkg.destination} with this premium ${pkg.category} package. Includes accommodation, transport & curated itinerary.`,
      url: `https://kavinidhyasree.com/packages/${slug}`,
    },
  };
}

export const revalidate = 60; // ISR validation

export async function generateStaticParams() {
  try {
    const packages = await db.package.findMany({
      where: { active: true },
      select: { slug: true },
    });
    return packages.map((pkg) => ({
      slug: pkg.slug,
    }));
  } catch {
    return [];
  }
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PackageDetailPage(props: PageProps) {
  const params = await props.params;
  const { slug } = params;

  const pkg = await db.package.findUnique({
    where: { slug },
    include: {
      itinerary: true,
      images: true,
      pricingTiers: true,
    },
  });

  if (!pkg) {
    notFound();
  }

  const inclusionsList = pkg.inclusions.split(';').filter(Boolean);
  const exclusionsList = pkg.exclusions.split(';').filter(Boolean);

  return (
    <div className="aurora-bg min-h-screen py-12 print:bg-white print:py-0 print:text-black">
      {/* Print-only Header */}
      <div className="hidden print:block mb-8 border-b pb-4 text-center">
        <h1 className="text-3xl font-bold">Kavini Dhyasree</h1>
        <p className="text-sm">Premium Tour Itinerary Catalog | Trip Code: {pkg.tripCode}</p>
        <p className="text-xs">Email: dhya6925@gmail.com | Phone: +91 94896 48021 / +91 94883 07936</p>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Category */}
        <div className="flex items-center space-x-2 text-xs font-semibold text-secondary mb-6 print:hidden">
          <span>Packages</span>
          <span>/</span>
          <span>{pkg.category}</span>
          <span>/</span>
          <span className="text-foreground">{pkg.title}</span>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-8 print:col-span-12">
            <MotionDiv 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-2 text-sm font-bold text-primary mb-2">
                <MapPin className="h-4 w-4" />
                <span>{pkg.destination}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
                {pkg.title}
              </h1>
              <p className="text-xs text-secondary mt-2 font-medium print:block">
                Trip Code: <span className="font-bold text-foreground">{pkg.tripCode}</span> | Last Updated: {new Date(pkg.lastUpdated).toLocaleDateString()}
              </p>
            </MotionDiv>

            {/* Gallery */}
            <div className="print:hidden">
              <ImageGallery images={pkg.images} />
            </div>

            {/* Quick Specs */}
            <MotionDiv 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-3 gap-4 bg-[#050505]/60 border border-primary/20 p-4 rounded-2xl print:bg-transparent print:border-none print:p-0"
            >
              <div className="text-center p-2">
                <Clock className="h-5 w-5 mx-auto text-primary mb-1" />
                <p className="text-xxs uppercase font-bold text-secondary">Duration</p>
                <p className="text-xs sm:text-sm font-bold text-foreground mt-0.5">{pkg.duration}</p>
              </div>
              <div className="text-center p-2 border-x border-primary/20">
                <Users className="h-5 w-5 mx-auto text-primary mb-1" />
                <p className="text-xxs uppercase font-bold text-secondary">Min Group</p>
                <p className="text-xs sm:text-sm font-bold text-foreground mt-0.5">{pkg.minGroupSize} Person(s)</p>
              </div>
              <div className="text-center p-2">
                <Calendar className="h-5 w-5 mx-auto text-primary mb-1" />
                <p className="text-xxs uppercase font-bold text-secondary">Category</p>
                <p className="text-xs sm:text-sm font-bold text-foreground mt-0.5">{pkg.category}</p>
              </div>
            </MotionDiv>

            {/* Overview */}
            <MotionDiv 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              <h3 className="text-lg font-bold text-foreground border-b border-primary/20 pb-2">Tour Overview</h3>
              <p className="text-sm text-secondary leading-relaxed whitespace-pre-line">{pkg.description}</p>
            </MotionDiv>

            {/* Itinerary Accordion */}
            <MotionDiv 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4 print:break-before-page"
            >
              <h3 className="text-lg font-bold text-foreground border-b border-primary/20 pb-2">Day-Wise Itinerary</h3>
              <div className="print:hidden">
                <ItineraryAccordion days={pkg.itinerary} />
              </div>
              
              {/* Print-only static itinerary */}
              <div className="hidden print:block space-y-6">
                {pkg.itinerary.sort((a,b)=>a.dayNumber-b.dayNumber).map(day => (
                  <div key={day.id} className="border-l-2 border-primary pl-4 py-1">
                    <h4 className="font-bold text-sm">Day {day.dayNumber}: {day.title}</h4>
                    <p className="text-xs text-gray-700 mt-1">{day.description}</p>
                  </div>
                ))}
              </div>
            </MotionDiv>

            {/* Inclusions & Exclusions */}
            <MotionDiv 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 print:break-before-page"
            >
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground border-b border-primary/20 pb-2">Inclusions</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-secondary">
                  {inclusionsList.map((inc, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <CheckCircle className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground border-b border-primary/20 pb-2">Exclusions</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-secondary">
                  {exclusionsList.map((exc, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <XCircle className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </MotionDiv>

            {/* Enquire for Price */}
            <MotionDiv 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4 print:break-before-page"
            >
              <h3 className="text-lg font-bold text-foreground border-b border-primary/20 pb-2">Pricing</h3>
              <div className="aurora-card p-6 rounded-2xl border border-primary/20 flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-bold text-foreground">Enquire for Price</p>
                  <p className="text-xs text-secondary">Prices vary based on group size, season & room preference. Contact us for the best quote.</p>
                </div>
                <a
                  href={getWhatsAppUrl(`Hello Kavini Dhyasree, I would like to inquire about the "${pkg.title}" package (${pkg.duration}). Please share pricing and quote.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2.5 rounded-xl text-xs transition-colors cursor-pointer shrink-0 ml-4"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Get Quote on WhatsApp</span>
                </a>
              </div>
            </MotionDiv>

            {/* Terms and Refund */}
            <MotionDiv 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-primary/20 pt-8 print:break-before-page"
            >
              <div className="space-y-2">
                <h4 className="font-bold text-foreground text-sm flex items-center space-x-1.5">
                  <Info className="h-4 w-4 text-primary" />
                  <span>Important Terms</span>
                </h4>
                <p className="text-xs text-secondary leading-relaxed whitespace-pre-line">{pkg.terms}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-foreground text-sm flex items-center space-x-1.5">
                  <Info className="h-4 w-4 text-primary" />
                  <span>Cancellation & Refund Policy</span>
                </h4>
                <p className="text-xs text-secondary leading-relaxed whitespace-pre-line">{pkg.refundPolicy}</p>
              </div>
            </MotionDiv>
          </div>

          {/* Sidebar Inquiry */}
          <div className="lg:col-span-4 space-y-6 sticky top-24 print:hidden">
            <MotionDiv 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="aurora-card p-6 rounded-3xl border border-primary/30"
            >
              <p className="text-xxs uppercase tracking-wider text-secondary font-bold">Pricing</p>
              <h2 className="text-xl font-extrabold text-primary mt-1">Enquire for Price</h2>
              <p className="text-xxs text-secondary mt-1 font-medium">Contact us for the best rates tailored to your group size & preferences</p>
              <a
                href={getWhatsAppUrl(`Hello Kavini Dhyasree, I am inquiring about the "${pkg.title}" package (${pkg.duration}). Please share pricing details.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-2xl text-xs uppercase tracking-wider shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Inquire on WhatsApp</span>
              </a>
            </MotionDiv>
            
            <MotionDiv
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <InquiryForm packageId={pkg.id} packageName={pkg.title} />
            </MotionDiv>

            <PrintPDFButton />
          </div>
        </div>
      </div>
    </div>
  );
}
