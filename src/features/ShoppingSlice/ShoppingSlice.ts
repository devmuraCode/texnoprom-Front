import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../type";

interface ShoppingCartState {
  items: CartItem[];
}

const initialState: ShoppingCartState = {
  items: JSON.parse(localStorage.getItem("shoppingCart") || "[]"), // Загрузка данных из localStorage при инициализации
};

const ShoppingSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
      localStorage.setItem("shoppingCart", JSON.stringify(state.items)); // Сохранение данных в localStorage после добавления элемента
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
        localStorage.setItem("shoppingCart", JSON.stringify(state.items)); // Сохранение данных в localStorage после удаления элемента
      }
    },
  },
});

export const { addItem, removeItem } = ShoppingSlice.actions;

export default ShoppingSlice.reducer;
