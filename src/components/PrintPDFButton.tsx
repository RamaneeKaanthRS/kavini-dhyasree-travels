'use client';

import { Download } from 'lucide-react';

import { motion } from 'framer-motion';

export default function PrintPDFButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handlePrint}
      className="inline-flex items-center space-x-2 border border-primary/20 hover:bg-primary/5 text-foreground px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer w-full justify-center print:hidden"
    >
      <Download className="h-4 w-4" />
      <span>Download PDF Itinerary</span>
    </motion.button>
  );
}
