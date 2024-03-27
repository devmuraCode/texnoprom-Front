import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../types/type";

interface ShoppingCartState {
  items: CartItem[];
  totalPrice: number;
}

const initialState: ShoppingCartState = {
  items: JSON.parse(localStorage.getItem("shoppingCart") || "[]"),
  totalPrice: calculateTotalPrice(
    JSON.parse(localStorage.getItem("shoppingCart") || "[]")
  ),
};

function calculateTotalPrice(items: CartItem[]): number {
  // @ts-ignore
  return items.reduce((total, item) => total + item.price * item.stock_quantity,
    0
  );
}

const ShoppingSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const { id } = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === id);
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].stock_quantity++;
      } else {
        state.items.push({ ...action.payload, stock_quantity: 1 });
      }
      state.totalPrice = calculateTotalPrice(state.items);
      localStorage.setItem("shoppingCart", JSON.stringify(state.items));
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
        state.totalPrice = calculateTotalPrice(state.items);
        localStorage.setItem("shoppingCart", JSON.stringify(state.items));
      }
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.items[index].stock_quantity++;
        state.totalPrice = calculateTotalPrice(state.items);
        localStorage.setItem("shoppingCart", JSON.stringify(state.items));
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        if (state.items[index].stock_quantity > 1) {
          state.items[index].stock_quantity--;
        } else {
          state.items.splice(index, 1);
        }
        state.totalPrice = calculateTotalPrice(state.items);
        localStorage.setItem("shoppingCart", JSON.stringify(state.items));
      }
    },
  },
});

export const { addItem, removeItem, increaseQuantity, decreaseQuantity } =
  ShoppingSlice.actions;

export default ShoppingSlice.reducer;
