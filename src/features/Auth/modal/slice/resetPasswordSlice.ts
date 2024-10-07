import { createSlice } from "@reduxjs/toolkit";
import { resetPassword } from "../service/ResetPassword";

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        // @ts-ignore
        state.error = action.payload || "Не удалось сбросить пароль";
      });
  },
});

export const { resetState } = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
