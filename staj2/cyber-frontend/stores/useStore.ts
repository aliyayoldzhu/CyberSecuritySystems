import { create } from "zustand";
import { InventoryItem } from "@/types/InventoryItem";

interface StoreState {
  favorites: InventoryItem[];
  cart: InventoryItem[];
  toggleFavorite: (item: InventoryItem) => void;
  isFavorite: (id: number) => boolean;
  addToCart: (item: InventoryItem) => void;
  removeFromCart: (id: number) => void;
  isInCart: (id: number) => boolean;
  clearCart: () => void;
}

export const useStore = create<StoreState>((set, get) => ({
  favorites: [],
  cart: [],

  toggleFavorite: (item) => {
    const isAlreadyFav = get().favorites.some((fav) => fav.id === item.id);
    set((state) => ({
      favorites: isAlreadyFav
        ? state.favorites.filter((fav) => fav.id !== item.id)
        : [...state.favorites, item],
    }));
  },

  isFavorite: (id) => get().favorites.some((fav) => fav.id === id),

  addToCart: (item) => {
    if (!get().cart.some((cartItem) => cartItem.id === item.id)) {
      set((state) => ({
        cart: [...state.cart, item],
      }));
    }
  },

  removeFromCart: (id) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    }));
  },

  isInCart: (id) => get().cart.some((item) => item.id === id),

  clearCart: () => set({ cart: [] }),
}));
