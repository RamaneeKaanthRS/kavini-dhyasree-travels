'use client';

import { useState } from 'react';
import { MessageCircle, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { getWhatsAppUrl, openWhatsAppChat } from '@/lib/whatsapp';

interface InquiryFormProps {
  packageId?: string | null;
  packageName?: string;
}

export default function InquiryForm({ packageId = null, packageName }: InquiryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: packageName ? `I am interested in the "${packageName}" package. Please share pricing and itinerary details.` : '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const directWhatsAppUrl = getWhatsAppUrl(
    packageName 
      ? `Hello Kavini Dhyasree, I am inquiring about the "${packageName}" package. Please share details.`
      : `Hello Kavini Dhyasree, I would like to inquire about your travel packages and services.`
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccess(false);

    const whatsappMessage = [
      `Hello Kavini Dhyasree, I would like to make an inquiry:`,
      `*Name:* ${formData.name.trim()}`,
      `*Phone:* ${formData.phone.trim()}`,
      formData.email.trim() ? `*Email:* ${formData.email.trim()}` : null,
      packageName ? `*Package:* ${packageName}` : null,
      `*Message:* ${formData.message.trim()}`,
    ].filter(Boolean).join('\n');

    const chatUrl = getWhatsAppUrl(whatsappMessage);
    setSubmittedWhatsAppUrl(chatUrl);

    // Save inquiry to backend database/email in background
    try {
      await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          packageId,
        }),
      });
    } catch (err) {
      console.warn('Background inquiry save notice:', err);
    }

    // Open WhatsApp chat directly
    openWhatsAppChat(whatsappMessage);

    setSuccess(true);
    setLoading(false);
  };

  return (
    <div className="aurora-card p-6 sm:p-8 rounded-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
        <h3 className="text-xl font-bold text-foreground">Plan Your Dream Journey</h3>
        <a
          href={directWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-green-400 hover:text-green-300 font-semibold cursor-pointer transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Instant WhatsApp Chat</span>
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
      <p className="text-sm text-secondary mb-6">
        Submit details below to initiate an immediate chat with our travel consultant on WhatsApp.
      </p>

      {success ? (
        <div className="bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 p-5 rounded-2xl space-y-3">
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm text-emerald-300">Inquiry Ready on WhatsApp!</h4>
              <p className="text-xs text-emerald-200/80 mt-1">
                Your inquiry has been formatted. If WhatsApp didn't open automatically, click the button below to connect directly with our team.
              </p>
            </div>
          </div>
          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href={submittedWhatsAppUrl || directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-lg transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Continue in WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setSuccess(false);
                setFormData({ name: '', email: '', phone: '', message: '' });
              }}
              className="text-xs text-white/70 hover:text-white px-3 py-2 transition-colors cursor-pointer"
            >
              Send Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.global && (
            <div className="bg-red-500/20 border border-red-500/40 text-red-200 p-3 rounded-xl flex items-center space-x-2 text-xs">
              <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
              <span>{errors.global}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1" htmlFor="name">Your Name *</label>
            <input
              type="text"
              id="name"
              required
              placeholder="e.g. Ramesh Kumar"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#050505]/50 border border-primary/20 focus:border-primary focus:bg-[#050505] px-4 py-2.5 rounded-xl text-sm outline-none text-foreground transition-all"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1" htmlFor="phone">WhatsApp Phone Number *</label>
              <input
                type="tel"
                id="phone"
                required
                placeholder="e.g. 9876543210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#050505]/50 border border-primary/20 focus:border-primary focus:bg-[#050505] px-4 py-2.5 rounded-xl text-sm outline-none text-foreground transition-all"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1" htmlFor="email">Email Address (Optional)</label>
              <input
                type="email"
                id="email"
                placeholder="e.g. name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#050505]/50 border border-primary/20 focus:border-primary focus:bg-[#050505] px-4 py-2.5 rounded-xl text-sm outline-none text-foreground transition-all"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1" htmlFor="message">Your Requirements *</label>
            <textarea
              id="message"
              required
              rows={4}
              placeholder="Tell us about passenger count, trip dates, vehicle or stay preferences..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-[#050505]/50 border border-primary/20 focus:border-primary focus:bg-[#050505] px-4 py-2.5 rounded-xl text-sm outline-none text-foreground transition-all resize-none"
            />
            {errors.message && <p className="text-red-500 text-xs mt-1 font-medium">{errors.message}</p>}
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-green-500/20 cursor-pointer text-sm"
          >
            <MessageCircle className="h-4 w-4" />
            <span>{loading ? 'Opening WhatsApp...' : 'Inquire via WhatsApp'}</span>
          </motion.button>
        </form>
      )}
    </div>
  );
}
