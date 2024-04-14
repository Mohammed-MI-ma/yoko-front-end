import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";

export const searchProductMeiliSearchByCategory = createAsyncThunk(
  "marketPlace/searchProductByCategory",
  async ({ query, category }, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API_URI_DEV}api/application/product/search`,
        { query, category }, // Include the category in the request body
        config
      );

      if (response.status === 200) {
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
