import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "@/services/http";

export const loginUser = createAsyncThunk(
  "type/postData",
  async (data: any) => {
    try {
      const response = await http.request.post("/users/verify-phone/", data);
      response.data;
    } catch (err) {
      console.log(err);
    }
  }
);
