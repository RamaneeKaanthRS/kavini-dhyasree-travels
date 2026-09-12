import InquiryForm from '@/components/InquiryForm';
import { Phone, Mail, MapPin, Compass } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Us – Book Tours, Stays & Cars in Yercaud, Salem",
  description:
    "Get in touch with Kavini Dhyasree for tour bookings, hotel reservations in Yercaud, and car rentals from Salem. Call +91 94896 48021 or fill our enquiry form.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Kavini Dhyasree – Yercaud Travel Agency",
    description:
      "Reach us for custom tour packages, Yercaud hotel stays & car rentals. Office: Piliyur, Yercaud Tk, Salem Dt – 636602.",
    url: "https://kavinidhyasree.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="aurora-bg min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl">Contact Us</h1>
          <p className="text-secondary">Have questions about packages, rooms, or vehicle rentals? Reach out to us anytime.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Info Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="aurora-card p-8 rounded-3xl space-y-6">
              <h3 className="text-xl font-bold text-foreground">Get In Touch</h3>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                Contact Kavini Dhyasree for personalized assistance, custom route scheduling, or bulk group bookings.
              </p>

              <div className="space-y-4 pt-4 border-t border-primary/10">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/20 p-2.5 rounded-xl text-primary shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xxs font-bold text-secondary uppercase">Call or WhatsApp</p>
                    <p className="text-sm font-semibold text-foreground mt-0.5">
                      +91 94896 48021<br />
                      +91 94883 07936
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/20 p-2.5 rounded-xl text-primary shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xxs font-bold text-secondary uppercase">Email Support</p>
                    <p className="text-sm font-semibold text-foreground mt-0.5">dhya6925@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/20 p-2.5 rounded-xl text-primary shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xxs font-bold text-secondary uppercase">Main Office</p>
                    <p className="text-sm font-semibold text-foreground mt-0.5 leading-relaxed">
                      Piliyur, Yercaud Tk,<br />Salem Dt - 636602
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="aurora-card p-6 rounded-2xl bg-primary/5 border border-primary/20">
              <h4 className="font-bold text-foreground text-sm mb-1">Direct Booking Assistance</h4>
              <p className="text-xs text-secondary leading-relaxed">If you need immediate verification of room availability or urgent travel coordination under 12 hours, please call our 24/7 client hotline directly.</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <InquiryForm />
          </div>
        </div>
      </div>
    </div>
  );
}
