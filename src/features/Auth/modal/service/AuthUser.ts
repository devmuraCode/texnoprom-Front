import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpsClient } from "@/services/httpClient";

export const authUser = createAsyncThunk(
  "type/postData",
  async (data: any) => {
    try {
      const response = await httpsClient.post("/users/", data);
      response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const loginUser = createAsyncThunk(
  "type/postData",
  async (data: any) => {
    try {
      const response = await httpsClient.post("/users/token/", data);
      response.data;
      
    } catch (err) {
      console.log(err);
    }
  }
);
