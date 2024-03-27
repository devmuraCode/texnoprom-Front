import { createSlice } from "@reduxjs/toolkit";
import { IDataStoreStateType } from "../../../../store/StateSchema";
import { IAuthData } from "../type/userSchema";
import { authUser } from "../service/AuthUser";

const initialState: IDataStoreStateType<IAuthData> = {
  data: undefined,
  loading: false,
  error: undefined,
  fulfilled: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(authUser.pending, (state) => {
        state.error = undefined;
        state.loading = true;
      })
      .addCase(authUser.fulfilled, (state) => {
        state.loading = false;
        state.fulfilled = true;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const { actions: authActions } = authSlice;
export const { reducer: authReducer } = authSlice;