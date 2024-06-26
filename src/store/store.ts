import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import cartReducer from '@/features/ShoppingSlice/CartSlice';
import { authReducer } from "@/features/Auth/modal/slice/userAuthSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    loginForm: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
