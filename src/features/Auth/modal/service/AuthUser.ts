import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "@/services/http";

export const authUser = createAsyncThunk(
  "type/postData",
  async (data: any) => {
    try {
      const response = await http.request.post("/users/", data);
      response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

