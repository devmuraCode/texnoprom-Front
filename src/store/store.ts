import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import cartReducer from '@/features/ShoppingSlice/CartSlice';
import { authReducer } from "@/features/Auth/modal/slice/userAuthSlice";
import resetPasswordSlice from "@/features/Auth/modal/slice/resetPasswordSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    loginForm: authReducer,
    resetPassword: resetPasswordSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
