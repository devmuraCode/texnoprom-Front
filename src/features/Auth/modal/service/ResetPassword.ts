import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "@/services/http";

export const resetPassword = createAsyncThunk(
  "type/postData",
  async (data: any) => {
    try {
      const response = await http.request.post("/users/reset_password/", data);
      response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

