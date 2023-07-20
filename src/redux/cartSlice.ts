
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Product,CartState } from '../models/types';

const initialState: CartState = {
  items: [],
  favorites: [],
  total: 0, // Başlangıçta toplam tutar 0 olacak
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const { id } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    increaseQuantity(state, action: PayloadAction<number>) {
      const existingItem = state.items.find((item) => item.id === action.payload);

      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    decreaseQuantity(state, action: PayloadAction<number>) {
      const existingItem = state.items.find((item) => item.id === action.payload);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      }
    },
    addToFavorites(state, action: PayloadAction<Product>) {
      state.favorites.push(action.payload);
    },
    removeFromFavorites(state, action: PayloadAction<number>) {
      state.favorites = state.favorites.filter((item) => item.id !== action.payload);
    },
    calculateTotal(state) {
      state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    clearCart(state) {
      state.items = [];
      state.total = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  addToFavorites,
  removeFromFavorites, 
  calculateTotal,
  clearCart

} = cartSlice.actions;
export default cartSlice.reducer;
