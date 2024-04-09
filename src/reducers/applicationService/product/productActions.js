import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";

export const searchProductMeiliSearch = createAsyncThunk(
  "product/searchProduct",
  async ({ query, t }, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        `http://localhost:5000/api/application/product/search?query=${query}`,
        config
      );

      if (response.status === 200) {
        message.success(t("fileAttenteActualise"));

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
export const addProduct = createAsyncThunk(
  "delivery/addDeliveryBoy",
  async (deliveryBoyData, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        `http://localhost:5000/api/application/delivery-boy`,
        deliveryBoyData,
        config
      );

      if (response.status === 200) {
        // Handle successful search response
        console.log("famille", response.status);
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
export const updateProduct = createAsyncThunk(
  "delivery/updateDeliveryBoy",
  async ({ id, deliveryBoyData }, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/api/application/delivery-boy/${id}`,
        deliveryBoyData,
        config
      );
      if (response.status === 200) {
        message.success(response.data.message);
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
export const deleteProduct = createAsyncThunk(
  "delivery/deleteDeliveryBoy",
  async ({ id }, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/application/delivery-boy/${id}`,
        config
      );
      if (response.status === 200) {
        message.success(response.data.message);
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
