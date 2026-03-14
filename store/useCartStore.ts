import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string; // Cilt ID'si
  volumeId: number;
  title: string;
  seriesTitle: string;
  price: number;
  imageUrl: string;
  quantity: number;
  volumeNumber: number | null;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (newItem: CartItem) => {
        set((state: CartState) => {
          const existingItem = state.items.find((item: CartItem) => item.id === newItem.id);
          if (existingItem) {
            return {
              items: state.items.map((item: CartItem) =>
                item.id === newItem.id
                  ? { ...item, quantity: item.quantity + newItem.quantity }
                  : item
              ),
            };
          }
          return { items: [...state.items, newItem] };
        });
      },

      removeItem: (id: string) => {
        set((state: CartState) => ({
          items: state.items.filter((item: CartItem) => item.id !== id),
        }));
      },

      updateQuantity: (id: string, quantity: number) => {
        set((state: CartState) => ({
          items: state.items.map((item: CartItem) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        return get().items.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0);
      },

      getTotalItems: () => {
        return get().items.reduce((total: number, item: CartItem) => total + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);