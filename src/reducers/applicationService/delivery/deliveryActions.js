import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";

const BASE_URL = "http://localhost:7700"; // MeiliSearch server base URL

export const searchDeliveryBoyMeiliSearch = createAsyncThunk(
  "delivery/searchDeliveryBoy",
  async ({ query }, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/indexes/deliveryboys/search`,
        { q: query },
        config
      );

      if (response.status === 200) {
        // Handle successful search response
        return response.data;
      } else {
        message.error("unexpectedError");
      }
    } catch (error) {
      console.error("An error occurred:", error);

      return rejectWithValue(error.response.data);
    }
  }
);
