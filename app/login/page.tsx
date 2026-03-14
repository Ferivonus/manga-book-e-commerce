"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  EnvelopeIcon, 
  LockClosedIcon, 
  ArrowRightIcon,
  SparklesIcon,
  ExclamationCircleIcon 
} from '@heroicons/react/24/outline';

import { loginUser } from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const data = await loginUser(email, password);
      
      // data objesi lib/api.ts içinde zaten tiplendirilmiştir
      setAuth(data.user, data.accessToken);
      
      router.push('/');
      router.refresh();
    } catch (err) {
      // 'any' yerine tip kontrolü (Type Guarding)
      const errorMessage = err instanceof Error ? err.message : 'Beklenmedik bir hata oluştu.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-20 w-20 bg-foreground/[0.03] rounded-[2.5rem] border border-foreground/5 mb-6">
            <SparklesIcon className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-5xl font-black text-foreground uppercase tracking-tighter italic">Tekrar <span className="text-primary">Hoş Geldin</span></h1>
        </div>

        <div className="bg-foreground/[0.02] border border-foreground/5 rounded-[3.5rem] p-10 sm:p-12 shadow-2xl backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {error && (
              <div className="bg-accent/5 border border-accent/10 p-5 rounded-2xl flex items-center gap-3 text-accent animate-shake">
                <ExclamationCircleIcon className="h-5 w-5 flex-shrink-0" />
                <p className="text-[11px] font-black uppercase tracking-widest">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-foreground/20 uppercase tracking-[0.3em] ml-5">E-Posta</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-6 flex items-center text-foreground/20 group-focus-within:text-primary">
                    <EnvelopeIcon className="h-5 w-5" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    className="block w-full bg-background border border-foreground/5 rounded-3xl py-5 pl-16 pr-6 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold italic"
                    placeholder="ornek@manga.com"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center px-5">
                  <label className="text-[10px] font-black text-foreground/20 uppercase tracking-[0.3em]">Şifre</label>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-6 flex items-center text-foreground/20 group-focus-within:text-primary">
                    <LockClosedIcon className="h-5 w-5" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    className="block w-full bg-background border border-foreground/5 rounded-3xl py-5 pl-16 pr-6 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold italic"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.25em] text-xs shadow-2xl hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>Sokağa Giriş Yap <ArrowRightIcon className="h-4 w-4" /></>
              )}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-[10px] font-black text-foreground/20 uppercase tracking-[0.2em]">Hesabın yok mu?</p>
            <Link href="/register" className="inline-block mt-4 text-xs font-black text-primary uppercase hover:underline italic">Yolculuğa Başla</Link>
          </div>
        </div>
      </div>
      <style>{`@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } } .animate-shake { animation: shake 0.3s ease-in-out; }`}</style>
    </div>
  );
}