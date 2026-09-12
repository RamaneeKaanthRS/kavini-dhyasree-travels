'use client';

import { MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export default function WhatsAppCTA() {
  const whatsappUrl = getWhatsAppUrl('Hello Kavini Dhyasree, I would like to inquire about your Yercaud stays, off-road experiences, and travel services.');

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 cursor-pointer shadow-green-500/25 group duration-200"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-out whitespace-nowrap text-sm font-medium">
        Chat with Us
      </span>
    </a>
  );
}
