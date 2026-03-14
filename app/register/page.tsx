"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  EnvelopeIcon, 
  LockClosedIcon, 
  SparklesIcon,
  CheckBadgeIcon,
  ExclamationCircleIcon 
} from '@heroicons/react/24/outline';

import { registerUser } from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';

export default function RegisterPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Şifreler birbiriyle eşleşmiyor.');
      return;
    }

    setIsLoading(true);

    try {
      const data = await registerUser(email, password);
      setAuth(data.user, data.accessToken);
      router.push('/');
      router.refresh();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Kayıt işlemi başarısız.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-20 w-20 bg-secondary/5 rounded-[2.5rem] border border-secondary/10 mb-6">
            <CheckBadgeIcon className="h-10 w-10 text-secondary" />
          </div>
          <h1 className="text-5xl font-black text-foreground uppercase tracking-tighter italic">Yeni <span className="text-secondary">Yolculuk</span></h1>
        </div>

        <div className="bg-foreground/[0.02] border border-foreground/5 rounded-[3.5rem] p-10 sm:p-12 shadow-2xl backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {error && (
              <div className="bg-accent/5 border border-accent/10 p-5 rounded-2xl flex items-center gap-3 text-accent animate-shake">
                <ExclamationCircleIcon className="h-5 w-5 flex-shrink-0" />
                <p className="text-[11px] font-black uppercase tracking-widest">{error}</p>
              </div>
            )}

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-foreground/20 uppercase tracking-[0.3em] ml-5">E-Posta</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-6 flex items-center text-foreground/20 group-focus-within:text-secondary">
                    <EnvelopeIcon className="h-5 w-5" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    className="block w-full bg-background border border-foreground/5 rounded-3xl py-5 pl-16 pr-6 text-foreground focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all font-bold italic"
                    placeholder="yeni@manga.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-foreground/20 uppercase tracking-[0.3em] ml-5">Şifre</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-6 flex items-center text-foreground/20 group-focus-within:text-secondary">
                    <LockClosedIcon className="h-5 w-5" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    className="block w-full bg-background border border-foreground/5 rounded-3xl py-5 pl-16 pr-6 text-foreground focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all font-bold italic"
                    placeholder="En az 6 karakter"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-foreground/20 uppercase tracking-[0.3em] ml-5">Onay</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-6 flex items-center text-foreground/20 group-focus-within:text-secondary">
                    <LockClosedIcon className="h-5 w-5" />
                  </div>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                    className="block w-full bg-background border border-foreground/5 rounded-3xl py-5 pl-16 pr-6 text-foreground focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all font-bold italic"
                    placeholder="Tekrar yazın"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-secondary text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.25em] text-xs shadow-2xl hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>Macera Başlasın <SparklesIcon className="h-5 w-5" /></>
                )}
              </button>
            </div>
          </form>

          <div className="mt-12 text-center">
            <p className="text-[10px] font-black text-foreground/20 uppercase tracking-[0.2em]">Zaten sokağın parçası mısın?</p>
            <Link href="/login" className="inline-block mt-4 text-xs font-black text-secondary uppercase hover:underline italic">Giriş Yap</Link>
          </div>
        </div>
      </div>
      <style>{`@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } } .animate-shake { animation: shake 0.3s ease-in-out; }`}</style>
    </div>
  );
}