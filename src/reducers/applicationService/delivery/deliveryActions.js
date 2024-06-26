import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";

export const searchDeliveryBoyMeiliSearch = createAsyncThunk(
  "delivery/searchDeliveryBoy",
  async ({ query, t }, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API_URI_DEV}api/application/delivery-boy/search?query=${query}`,
        config
      );

      if (response.status === 200) {
        //  message.success(t("fileAttenteActualise"));

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
export const addDeliveryBoy = createAsyncThunk(
  "delivery/addDeliveryBoy",
  async (deliveryBoyData, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API_URI_DEV}api/application/delivery-boy`,
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
export const updateDeliveryBoy = createAsyncThunk(
  "delivery/updateDeliveryBoy",
  async ({ id, deliveryBoyData }, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_API_URI_DEV}api/application/delivery-boy/${id}`,
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
export const deleteDeliveryBoy = createAsyncThunk(
  "delivery/deleteDeliveryBoy",
  async ({ id }, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_API_URI_DEV}api/application/delivery-boy/${id}`,
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
