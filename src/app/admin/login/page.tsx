'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ShieldAlert, KeyRound } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, token }),
      });

      const data = await res.json();
      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Authentication failed. Please check credentials.');
      }
    } catch {
      setError('A connection error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="aurora-bg min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-foreground">Admin Console</h2>
          <p className="text-sm text-secondary">Enter credentials and 2FA token to access the secure dashboard.</p>
        </div>

        <div className="aurora-card p-8 rounded-3xl border border-primary/20 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-3.5 rounded-xl flex items-center space-x-2 text-xs">
                <ShieldAlert className="h-5 w-5 text-red-600 shrink-0" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-foreground mb-1" htmlFor="email">Admin Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                  <Mail className="h-4.5 w-4.5" />
                </span>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="admin@sathishannatravels.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#050505]/50 border border-primary/20 focus:border-primary focus:bg-[#050505] pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none text-foreground transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1" htmlFor="password">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                  <Lock className="h-4.5 w-4.5" />
                </span>
                <input
                  type="password"
                  id="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#050505]/50 border border-primary/20 focus:border-primary focus:bg-[#050505] pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none text-foreground transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1" htmlFor="token">2FA Authenticator Token (6-digit)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                  <KeyRound className="h-4.5 w-4.5" />
                </span>
                <input
                  type="text"
                  id="token"
                  required
                  maxLength={6}
                  placeholder="123456"
                  value={token}
                  onChange={(e) => setToken(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-[#050505]/50 border border-primary/20 focus:border-primary focus:bg-[#050505] pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none text-foreground transition-all tracking-widest font-semibold"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/25 cursor-pointer"
            >
              {loading ? 'Authenticating...' : 'Secure Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
