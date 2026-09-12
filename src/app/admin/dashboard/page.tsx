'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Inbox, 
  Settings, 
  History, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit, 
  Download, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Save, 
  X,
  PlusCircle,
  Eye
} from 'lucide-react';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  createdAt: string;
  package?: { title: string } | null;
}

interface ItineraryDay {
  dayNumber: number;
  title: string;
  description: string;
}

interface PricingTier {
  label: string;
  price: number | string;
}

interface Media {
  url: string;
  altText: string;
  isHero: boolean;
}

interface Package {
  id: string;
  title: string;
  slug: string;
  destination: string;
  duration: string;
  category: string;
  description: string;
  inclusions: string;
  exclusions: string;
  terms: string;
  refundPolicy: string;
  tripCode: string;
  minGroupSize: number;
  price: number;
  active: boolean;
  itinerary: ItineraryDay[];
  pricingTiers: PricingTier[];
  images: Media[];
}

interface AuditLog {
  id: string;
  action: string;
  details: string;
  adminEmail: string;
  timestamp: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'inquiries' | 'packages' | 'audit'>('inquiries');
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  // Package Form States
  const [showPackageForm, setShowPackageForm] = useState(false);
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  
  // Package Form Fields
  const [pkgTitle, setPkgTitle] = useState('');
  const [pkgSlug, setPkgSlug] = useState('');
  const [pkgDestination, setPkgDestination] = useState('');
  const [pkgDuration, setPkgDuration] = useState('');
  const [pkgCategory, setPkgCategory] = useState('South India');
  const [pkgDescription, setPkgDescription] = useState('');
  const [pkgInclusions, setPkgInclusions] = useState('');
  const [pkgExclusions, setPkgExclusions] = useState('');
  const [pkgTerms, setPkgTerms] = useState('');
  const [pkgRefundPolicy, setPkgRefundPolicy] = useState('');
  const [pkgTripCode, setPkgTripCode] = useState('');
  const [pkgMinGroupSize, setPkgMinGroupSize] = useState(2);
  const [pkgPrice, setPkgPrice] = useState<number | string>('');
  const [pkgActive, setPkgActive] = useState(true);
  
  // Dynamic relation lists
  const [pkgItinerary, setPkgItinerary] = useState<ItineraryDay[]>([]);
  const [pkgPricingTiers, setPkgPricingTiers] = useState<PricingTier[]>([]);
  const [pkgImages, setPkgImages] = useState<Media[]>([]);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const res = await fetch('/api/admin/check');
      if (!res.ok) {
        router.push('/admin/login');
      } else {
        fetchDashboardData();
      }
    } catch {
      router.push('/admin/login');
    }
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [inquiriesRes, packagesRes, auditRes] = await Promise.all([
        fetch('/api/admin/inquiries'),
        fetch('/api/admin/packages'),
        fetch('/api/admin/audit')
      ]);

      if (inquiriesRes.ok) setInquiries(await inquiriesRes.json());
      if (packagesRes.ok) setPackages(await packagesRes.json());
      if (auditRes.ok) setAuditLogs(await auditRes.json());
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch {
      router.push('/admin/login');
    }
  };

  const handleInquiryStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
        // Refresh logs
        const auditRes = await fetch('/api/admin/audit');
        if (auditRes.ok) setAuditLogs(await auditRes.json());
      }
    } catch (err) {
      console.error('Failed to update inquiry status:', err);
    }
  };

  // CSV Exporter
  const exportInquiriesToCSV = () => {
    if (inquiries.length === 0) return;
    
    const headers = ['Inquiry ID', 'Client Name', 'Email', 'Phone', 'Package Reference', 'Status', 'Date Submitted', 'Requirements'];
    const rows = inquiries.map(inq => [
      inq.id,
      inq.name,
      inq.email,
      inq.phone,
      inq.package?.title || 'General Enquiry',
      inq.status,
      new Date(inq.createdAt).toLocaleString(),
      `"${inq.message.replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Inquiries_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEditPackage = (pkg: Package) => {
    setEditingPackageId(pkg.id);
    setPkgTitle(pkg.title);
    setPkgSlug(pkg.slug);
    setPkgDestination(pkg.destination);
    setPkgDuration(pkg.duration);
    setPkgCategory(pkg.category);
    setPkgDescription(pkg.description);
    setPkgInclusions(pkg.inclusions);
    setPkgExclusions(pkg.exclusions);
    setPkgTerms(pkg.terms);
    setPkgRefundPolicy(pkg.refundPolicy);
    setPkgTripCode(pkg.tripCode);
    setPkgMinGroupSize(pkg.minGroupSize);
    setPkgPrice(pkg.price);
    setPkgActive(pkg.active);
    
    setPkgItinerary(pkg.itinerary);
    setPkgPricingTiers(pkg.pricingTiers);
    setPkgImages(pkg.images);
    
    setFormError('');
    setFormSuccess('');
    setShowPackageForm(true);
  };

  const handleNewPackage = () => {
    setEditingPackageId(null);
    setPkgTitle('');
    setPkgSlug('');
    setPkgDestination('');
    setPkgDuration('');
    setPkgCategory('South India');
    setPkgDescription('');
    setPkgInclusions('');
    setPkgExclusions('');
    setPkgTerms('');
    setPkgRefundPolicy('');
    setPkgTripCode('');
    setPkgMinGroupSize(2);
    setPkgPrice('');
    setPkgActive(true);
    
    setPkgItinerary([{ dayNumber: 1, title: '', description: '' }]);
    setPkgPricingTiers([{ label: 'Double Sharing', price: '' }]);
    setPkgImages([{ url: '', altText: '', isHero: true }]);
    
    setFormError('');
    setFormSuccess('');
    setShowPackageForm(true);
  };

  const handleSavePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    const payload = {
      title: pkgTitle,
      slug: pkgSlug,
      destination: pkgDestination,
      duration: pkgDuration,
      category: pkgCategory,
      description: pkgDescription,
      inclusions: pkgInclusions,
      exclusions: pkgExclusions,
      terms: pkgTerms,
      refundPolicy: pkgRefundPolicy,
      tripCode: pkgTripCode,
      minGroupSize: pkgMinGroupSize,
      price: pkgPrice,
      active: pkgActive,
      images: pkgImages.filter(img => img.url),
      itinerary: pkgItinerary.filter(day => day.title),
      pricingTiers: pkgPricingTiers.filter(t => t.label && t.price),
    };

    try {
      const url = editingPackageId ? `/api/admin/packages/${editingPackageId}` : '/api/admin/packages';
      const method = editingPackageId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setFormSuccess('Package saved successfully!');
        setTimeout(() => {
          setShowPackageForm(false);
          fetchDashboardData();
        }, 1500);
      } else {
        setFormError(data.error || 'Failed to save package.');
      }
    } catch {
      setFormError('Network error saving package.');
    }
  };

  const handleDeletePackage = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this package? This cannot be undone.')) return;

    try {
      const res = await fetch(`/api/admin/packages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchDashboardData();
      } else {
        alert('Failed to delete package.');
      }
    } catch {
      alert('Network error deleting package.');
    }
  };

  return (
    <div className="min-h-screen bg-primary/10/70">
      {/* Header */}
      <header className="bg-[#050505] border-b border-primary/10 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center space-x-3">
          <span className="bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-xl text-sm">Admin</span>
          <h1 className="text-xl font-bold text-foreground">Kavini Dhyasree Dashboard</h1>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center space-x-2 text-secondary hover:text-red-600 font-semibold text-xs border border-primary/30 hover:border-red-200 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </header>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Navigation Sidebar */}
        <aside className="md:col-span-1 space-y-2">
          <button
            onClick={() => { setActiveTab('inquiries'); setShowPackageForm(false); }}
            className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'inquiries' && !showPackageForm
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
                : 'bg-[#050505] border border-primary/10 hover:bg-primary/5 text-foreground'
            }`}
          >
            <Inbox className="h-5 w-5" />
            <span>Customer Inquiries</span>
            {inquiries.filter(i => i.status === 'New').length > 0 && (
              <span className="bg-orange-500 text-white font-extrabold text-xxs px-2 py-0.5 rounded-full shrink-0 ml-auto">
                {inquiries.filter(i => i.status === 'New').length}
              </span>
            )}
          </button>

          <button
            onClick={() => { setActiveTab('packages'); setShowPackageForm(false); }}
            className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
              (activeTab === 'packages' || showPackageForm)
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
                : 'bg-[#050505] border border-primary/10 hover:bg-primary/5 text-foreground'
            }`}
          >
            <Settings className="h-5 w-5" />
            <span>Tour Packages CRUD</span>
          </button>

          <button
            onClick={() => { setActiveTab('audit'); setShowPackageForm(false); }}
            className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'audit' && !showPackageForm
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
                : 'bg-[#050505] border border-primary/10 hover:bg-primary/5 text-foreground'
            }`}
          >
            <History className="h-5 w-5" />
            <span>Audit Trail Log</span>
          </button>
        </aside>

        {/* Dynamic Display Panel */}
        <main className="md:col-span-3">
          
          {loading ? (
            <div className="text-center py-20 bg-[#050505] border border-primary/10 rounded-3xl">
              <p className="text-secondary font-medium">Loading panel dashboard data...</p>
            </div>
          ) : showPackageForm ? (
            /* Create/Edit Package Form */
            <div className="bg-[#050505] border border-primary/10 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="text-xl font-bold text-foreground">
                  {editingPackageId ? 'Edit Tour Package' : 'Create Tour Package'}
                </h3>
                <button
                  onClick={() => setShowPackageForm(false)}
                  className="p-1 hover:bg-primary/10 rounded-xl cursor-pointer"
                >
                  <X className="h-6 w-6 text-secondary" />
                </button>
              </div>

              <form onSubmit={handleSavePackage} className="space-y-6">
                {formError && (
                  <div className="bg-red-50 border border-red-200 text-red-800 p-3.5 rounded-xl flex items-center space-x-2 text-xs">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <span>{formError}</span>
                  </div>
                )}
                {formSuccess && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-xl flex items-center space-x-2 text-xs">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    <span>{formSuccess}</span>
                  </div>
                )}

                {/* Base Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1">Package Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Wonders of Ooty & Pykara"
                      value={pkgTitle}
                      onChange={(e) => {
                        setPkgTitle(e.target.value);
                        if (!editingPackageId) {
                          setPkgSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
                        }
                      }}
                      className="w-full bg-primary/5 border border-primary/20 focus:border-primary focus:bg-[#050505] px-4 py-2.5 rounded-xl text-sm outline-none text-foreground transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1">Slug URL Path</label>
                    <input
                      type="text"
                      required
                      placeholder="wonders-of-ooty-pykara"
                      value={pkgSlug}
                      onChange={(e) => setPkgSlug(e.target.value)}
                      className="w-full bg-primary/5 border border-primary/20 focus:border-primary focus:bg-[#050505] px-4 py-2.5 rounded-xl text-sm outline-none text-foreground transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-foreground mb-1">Destination State/Region</label>
                    <input
                      type="text"
                      required
                      placeholder="Ooty, Tamil Nadu"
                      value={pkgDestination}
                      onChange={(e) => setPkgDestination(e.target.value)}
                      className="w-full bg-primary/5 border border-primary/20 focus:border-primary focus:bg-[#050505] px-4 py-2.5 rounded-xl text-sm outline-none text-foreground transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1">Trip Duration</label>
                    <input
                      type="text"
                      required
                      placeholder="3 Days / 2 Nights"
                      value={pkgDuration}
                      onChange={(e) => setPkgDuration(e.target.value)}
                      className="w-full bg-primary/5 border border-primary/20 focus:border-primary focus:bg-[#050505] px-4 py-2.5 rounded-xl text-sm outline-none text-foreground transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1">Category</label>
                    <select
                      value={pkgCategory}
                      onChange={(e) => setPkgCategory(e.target.value)}
                      className="w-full bg-primary/5 border border-primary/20 focus:border-primary focus:bg-[#050505] px-4 py-2.5 rounded-xl text-sm outline-none text-foreground transition-all cursor-pointer"
                    >
                      <option value="South India">South India</option>
                      <option value="North India">North India</option>
                      <option value="International">International</option>
                      <option value="Hill Station">Hill Station</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1">Trip Code ID</label>
                    <input
                      type="text"
                      required
                      placeholder="SAT-OTY-03"
                      value={pkgTripCode}
                      onChange={(e) => setPkgTripCode(e.target.value)}
                      className="w-full bg-primary/5 border border-primary/20 focus:border-primary focus:bg-[#050505] px-4 py-2.5 rounded-xl text-sm outline-none text-foreground transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1">Min Group Size</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={pkgMinGroupSize}
                      onChange={(e) => setPkgMinGroupSize(parseInt(e.target.value))}
                      className="w-full bg-primary/5 border border-primary/20 focus:border-primary focus:bg-[#050505] px-4 py-2.5 rounded-xl text-sm outline-none text-foreground transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1">Base Price Starts (₹)</label>
                    <input
                      type="number"
                      required
                      value={pkgPrice}
                      onChange={(e) => setPkgPrice(e.target.value)}
                      className="w-full bg-primary/5 border border-primary/20 focus:border-primary focus:bg-[#050505] px-4 py-2.5 rounded-xl text-sm outline-none text-foreground transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1">Publish Status</label>
                    <select
                      value={pkgActive ? 'true' : 'false'}
                      onChange={(e) => setPkgActive(e.target.value === 'true')}
                      className="w-full bg-primary/5 border border-primary/20 focus:border-primary focus:bg-[#050505] px-4 py-2.5 rounded-xl text-sm outline-none text-foreground transition-all cursor-pointer"
                    >
                      <option value="true">Published Live</option>
                      <option value="false">Draft / Hidden</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">Overview Description</label>
                  <textarea
                    rows={4}
                    value={pkgDescription}
                    onChange={(e) => setPkgDescription(e.target.value)}
                    className="w-full bg-primary/5 border border-primary/20 focus:border-primary focus:bg-[#050505] px-4 py-2.5 rounded-xl text-sm outline-none text-foreground transition-all resize-none"
                  />
                </div>

                {/* Images */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b pb-2">
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Media Gallery Links</h4>
                    <button
                      type="button"
                      onClick={() => setPkgImages([...pkgImages, { url: '', altText: '', isHero: false }])}
                      className="inline-flex items-center space-x-1 text-xxs font-bold text-primary hover:text-primary/90 transition-colors cursor-pointer"
                    >
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span>Add Image URL</span>
                    </button>
                  </div>
                  {pkgImages.map((img, idx) => (
                    <div key={idx} className="flex gap-4 items-end bg-primary/10/30 p-3 rounded-xl border border-primary/10">
                      <div className="flex-grow">
                        <label className="block text-xxs font-bold text-secondary mb-1">Unsplash/CDN Image URL</label>
                        <input
                          type="text"
                          required
                          value={img.url}
                          onChange={(e) => {
                            const copy = [...pkgImages];
                            copy[idx].url = e.target.value;
                            setPkgImages(copy);
                          }}
                          className="w-full bg-[#050505] border border-primary/20 px-3 py-2 rounded-lg text-xs outline-none text-foreground"
                        />
                      </div>
                      <div className="w-40">
                        <label className="block text-xxs font-bold text-secondary mb-1">Alt Text (SEO)</label>
                        <input
                          type="text"
                          value={img.altText}
                          onChange={(e) => {
                            const copy = [...pkgImages];
                            copy[idx].altText = e.target.value;
                            setPkgImages(copy);
                          }}
                          className="w-full bg-[#050505] border border-primary/20 px-3 py-2 rounded-lg text-xs outline-none text-foreground"
                        />
                      </div>
                      <div className="flex items-center space-x-2 pb-2">
                        <input
                          type="radio"
                          id={`hero-${idx}`}
                          name="hero-image"
                          checked={img.isHero}
                          onChange={() => {
                            const copy = pkgImages.map((item, i) => ({ ...item, isHero: i === idx }));
                            setPkgImages(copy);
                          }}
                          className="cursor-pointer"
                        />
                        <label htmlFor={`hero-${idx}`} className="text-xxs font-bold text-foreground cursor-pointer">Hero</label>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPkgImages(pkgImages.filter((_, i) => i !== idx))}
                        className="p-2 text-secondary hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Day-Wise Itinerary */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b pb-2">
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Day-Wise Itinerary Builder</h4>
                    <button
                      type="button"
                      onClick={() => setPkgItinerary([...pkgItinerary, { dayNumber: pkgItinerary.length + 1, title: '', description: '' }])}
                      className="inline-flex items-center space-x-1 text-xxs font-bold text-primary hover:text-primary/90 transition-colors cursor-pointer"
                    >
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span>Add Itinerary Day</span>
                    </button>
                  </div>
                  {pkgItinerary.map((day, idx) => (
                    <div key={idx} className="space-y-2 bg-primary/10/30 p-4 rounded-2xl border border-primary/10">
                      <div className="flex gap-4 items-center">
                        <span className="bg-emerald-500 text-white font-extrabold px-3 py-1 rounded-lg text-xs shadow-sm">Day {day.dayNumber}</span>
                        <div className="flex-grow">
                          <input
                            type="text"
                            required
                            placeholder="Day Activity Title (e.g. Arrival & Check-in)"
                            value={day.title}
                            onChange={(e) => {
                              const copy = [...pkgItinerary];
                              copy[idx].title = e.target.value;
                              setPkgItinerary(copy);
                            }}
                            className="w-full bg-[#050505] border border-primary/20 px-3 py-2 rounded-lg text-xs outline-none text-foreground"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const filtered = pkgItinerary.filter((_, i) => i !== idx);
                            // Renumber remaining
                            const renumbered = filtered.map((d, i) => ({ ...d, dayNumber: i + 1 }));
                            setPkgItinerary(renumbered);
                          }}
                          className="p-2 text-secondary hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        required
                        placeholder="Day Activity description summary..."
                        value={day.description}
                        onChange={(e) => {
                          const copy = [...pkgItinerary];
                          copy[idx].description = e.target.value;
                          setPkgItinerary(copy);
                        }}
                        className="w-full bg-[#050505] border border-primary/20 px-3 py-2 rounded-lg text-xs outline-none text-foreground resize-none"
                      />
                    </div>
                  ))}
                </div>

                {/* Pricing Tiers */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b pb-2">
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Pricing Tiers</h4>
                    <button
                      type="button"
                      onClick={() => setPkgPricingTiers([...pkgPricingTiers, { label: '', price: '' }])}
                      className="inline-flex items-center space-x-1 text-xxs font-bold text-primary hover:text-primary/90 transition-colors cursor-pointer"
                    >
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span>Add Pricing Option</span>
                    </button>
                  </div>
                  {pkgPricingTiers.map((tier, idx) => (
                    <div key={idx} className="flex gap-4 bg-primary/10/30 p-3 rounded-xl border border-primary/10 items-end">
                      <div className="flex-grow">
                        <label className="block text-xxs font-bold text-secondary mb-1">Tier Label (e.g. Double Occupancy)</label>
                        <input
                          type="text"
                          required
                          value={tier.label}
                          onChange={(e) => {
                            const copy = [...pkgPricingTiers];
                            copy[idx].label = e.target.value;
                            setPkgPricingTiers(copy);
                          }}
                          className="w-full bg-[#050505] border border-primary/20 px-3 py-2 rounded-lg text-xs outline-none text-foreground"
                        />
                      </div>
                      <div className="w-48">
                        <label className="block text-xxs font-bold text-secondary mb-1">Price per Head (₹)</label>
                        <input
                          type="number"
                          required
                          value={tier.price}
                          onChange={(e) => {
                            const copy = [...pkgPricingTiers];
                            copy[idx].price = e.target.value;
                            setPkgPricingTiers(copy);
                          }}
                          className="w-full bg-[#050505] border border-primary/20 px-3 py-2 rounded-lg text-xs outline-none text-foreground"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setPkgPricingTiers(pkgPricingTiers.filter((_, i) => i !== idx))}
                        className="p-2 text-secondary hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Lists & Policy details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1">Inclusions (separate with semicolons ;)</label>
                    <textarea
                      rows={3}
                      placeholder="Premium hotel stay;Sightseeing AC Cab;Driver allowance"
                      value={pkgInclusions}
                      onChange={(e) => setPkgInclusions(e.target.value)}
                      className="w-full bg-primary/5 border border-primary/20 focus:border-primary focus:bg-[#050505] px-4 py-2.5 rounded-xl text-xs outline-none text-foreground transition-all resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1">Exclusions (separate with semicolons ;)</label>
                    <textarea
                      rows={3}
                      placeholder="Air/Train ticket;Personal expenses;Lunch"
                      value={pkgExclusions}
                      onChange={(e) => setPkgExclusions(e.target.value)}
                      className="w-full bg-primary/5 border border-primary/20 focus:border-primary focus:bg-[#050505] px-4 py-2.5 rounded-xl text-xs outline-none text-foreground transition-all resize-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1">Important Terms</label>
                    <textarea
                      rows={3}
                      placeholder="Provide check-in ID details..."
                      value={pkgTerms}
                      onChange={(e) => setPkgTerms(e.target.value)}
                      className="w-full bg-primary/5 border border-primary/20 focus:border-primary focus:bg-[#050505] px-4 py-2.5 rounded-xl text-xs outline-none text-foreground transition-all resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1">Cancellation & Refund Policy</label>
                    <textarea
                      rows={3}
                      placeholder="Provide refund tier timings..."
                      value={pkgRefundPolicy}
                      onChange={(e) => setPkgRefundPolicy(e.target.value)}
                      className="w-full bg-primary/5 border border-primary/20 focus:border-primary focus:bg-[#050505] px-4 py-2.5 rounded-xl text-xs outline-none text-foreground transition-all resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl transition-all cursor-pointer shadow-lg shadow-emerald-500/25"
                >
                  <Save className="h-5 w-5" />
                  <span>Save Package & Publish</span>
                </button>
              </form>
            </div>
          ) : activeTab === 'inquiries' ? (
            /* Customer Inquiries Tab */
            <div className="bg-[#050505] border border-primary/10 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Inquiry Leads</h3>
                  <p className="text-xs text-secondary">Track and respond to tour package bookings and cab quotes.</p>
                </div>
                {inquiries.length > 0 && (
                  <button
                    onClick={exportInquiriesToCSV}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold border border-primary/30 hover:bg-primary/10 px-3.5 py-2 rounded-xl text-foreground cursor-pointer"
                  >
                    <Download className="h-4.5 w-4.5 text-primary" />
                    <span>Export CSV</span>
                  </button>
                )}
              </div>

              <div className="overflow-hidden border border-primary/20 rounded-2xl">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-sky-100 text-xs sm:text-sm">
                    <thead className="bg-primary/5 text-left font-bold text-secondary uppercase tracking-wider text-xxs">
                      <tr>
                        <th className="px-6 py-3">Client Info</th>
                        <th className="px-6 py-3">Reference Page</th>
                        <th className="px-6 py-3">Requirements</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3 text-right">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-sky-100 text-foreground">
                      {inquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-primary/10/20">
                          <td className="px-6 py-4 space-y-1">
                            <p className="font-bold text-foreground">{inq.name}</p>
                            <p className="text-xxs text-secondary">{inq.phone}</p>
                            <p className="text-xxs text-secondary">{inq.email}</p>
                          </td>
                          <td className="px-6 py-4 font-semibold text-xs text-secondary">
                            {inq.package?.title || 'General Enquiry'}
                          </td>
                          <td className="px-6 py-4 max-w-xs">
                            <p className="line-clamp-2 text-xs text-secondary whitespace-pre-wrap">{inq.message}</p>
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={inq.status}
                              onChange={(e) => handleInquiryStatusChange(inq.id, e.target.value)}
                              className={`px-3 py-1.5 rounded-xl text-xxs font-bold outline-none cursor-pointer border ${
                                inq.status === 'New' 
                                  ? 'bg-orange-50 border-orange-200 text-orange-800' 
                                  : inq.status === 'Contacted' 
                                  ? 'bg-primary/10 border-primary/30 text-secondary'
                                  : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Booked">Booked</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-right text-xxs font-medium text-secondary">
                            {new Date(inq.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}

                      {inquiries.length === 0 && (
                        <tr>
                          <td colSpan={5} className="text-center py-12 text-secondary font-medium">
                            No inquiries recorded yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : activeTab === 'packages' ? (
            /* Packages List Tab */
            <div className="bg-[#050505] border border-primary/10 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Package Inventory</h3>
                  <p className="text-xs text-secondary">Create, edit, or delete travel catalogs.</p>
                </div>
                <button
                  onClick={handleNewPackage}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white px-3.5 py-2.5 rounded-xl cursor-pointer shadow-md shadow-emerald-500/20"
                >
                  <Plus className="h-4.5 w-4.5" />
                  <span>Create Package</span>
                </button>
              </div>

              <div className="overflow-hidden border border-primary/20 rounded-2xl">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-sky-100 text-xs sm:text-sm">
                    <thead className="bg-primary/5 text-left font-bold text-secondary uppercase tracking-wider text-xxs">
                      <tr>
                        <th className="px-6 py-3">Trip Code</th>
                        <th className="px-6 py-3">Package Detail</th>
                        <th className="px-6 py-3">Category</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3 text-right">Base Price</th>
                        <th className="px-6 py-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-sky-100 text-foreground">
                      {packages.map((pkg) => (
                        <tr key={pkg.id} className="hover:bg-primary/10/20">
                          <td className="px-6 py-4 font-bold text-foreground text-xs">{pkg.tripCode}</td>
                          <td className="px-6 py-4">
                            <p className="font-bold text-foreground leading-tight">{pkg.title}</p>
                            <p className="text-xxs text-secondary mt-1">{pkg.destination} | {pkg.duration}</p>
                          </td>
                          <td className="px-6 py-4 font-semibold text-xs text-secondary">{pkg.category}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xxs font-bold ${
                              pkg.active 
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                                : 'bg-gray-100 text-gray-700 border border-gray-200'
                            }`}>
                              {pkg.active ? 'Published' : 'Draft'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right font-extrabold text-foreground">₹{pkg.price.toLocaleString()}</td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex justify-center space-x-2">
                              <button
                                onClick={() => handleEditPackage(pkg)}
                                className="p-2 border border-primary/20 hover:bg-primary/10 rounded-lg text-secondary cursor-pointer"
                                title="Edit Package"
                              >
                                <Edit className="h-4.5 w-4.5" />
                              </button>
                              <button
                                onClick={() => handleDeletePackage(pkg.id)}
                                className="p-2 border border-red-100 hover:bg-red-50 rounded-lg text-red-600 cursor-pointer"
                                title="Delete Package"
                              >
                                <Trash2 className="h-4.5 w-4.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {packages.length === 0 && (
                        <tr>
                          <td colSpan={6} className="text-center py-12 text-secondary font-medium">
                            No packages created yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            /* Audit Log Tab */
            <div className="bg-[#050505] border border-primary/10 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-bold text-foreground">Admin Audit Trail Logs</h3>
                <p className="text-xs text-secondary">Chronological history of state-changing modifications.</p>
              </div>

              <div className="overflow-hidden border border-primary/20 rounded-2xl">
                <div className="max-h-[500px] overflow-y-auto">
                  <table className="min-w-full divide-y divide-sky-100 text-xs">
                    <thead className="bg-primary/5 text-left font-bold text-secondary uppercase tracking-wider text-xxs sticky top-0">
                      <tr>
                        <th className="px-6 py-3">Action</th>
                        <th className="px-6 py-3">Details</th>
                        <th className="px-6 py-3">Admin Identity</th>
                        <th className="px-6 py-3 text-right">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-sky-100 text-secondary bg-[#050505]">
                      {auditLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-primary/10/10">
                          <td className="px-6 py-4 font-bold text-foreground uppercase tracking-wide text-xxs">
                            {log.action.replace(/_/g, ' ')}
                          </td>
                          <td className="px-6 py-4 max-w-sm whitespace-pre-wrap">{log.details}</td>
                          <td className="px-6 py-4 text-secondary">{log.adminEmail}</td>
                          <td className="px-6 py-4 text-right text-xxs font-medium text-secondary">
                            {new Date(log.timestamp).toLocaleString()}
                          </td>
                        </tr>
                      ))}

                      {auditLogs.length === 0 && (
                        <tr>
                          <td colSpan={4} className="text-center py-12 text-secondary font-medium">
                            No actions logged.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
