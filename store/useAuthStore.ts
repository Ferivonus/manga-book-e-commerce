import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// --- TİP TANIMLAMALARI ---
export interface AuthUser {
  id: number;
  email: string;
  name: string | null;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  
  // Aksiyonlar
  setAuth: (user: AuthUser, token: string) => void;
  updateUser: (name: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      // Giriş yapınca veya kayıt olunca çağrılır
      setAuth: (user: AuthUser, token: string) => {
        set({
          user,
          token,
          isAuthenticated: true,
        });
      },

      // Profil güncelleme (isim değiştirme) sonrası state'i tazelemek için
      updateUser: (name: string) => {
        set((state: AuthState) => ({
          user: state.user ? { ...state.user, name } : null,
        }));
      },

      // Güvenli çıkış
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'auth-storage', // LocalStorage anahtar ismi
    }
  )
);