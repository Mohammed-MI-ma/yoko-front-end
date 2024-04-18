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
        `${process.env.REACT_APP_BASE_API_URI_DEV}api/application/product/search`,
        { query, category: "market" },
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
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (productData, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const newProductDAta = removeThumbUrl(productData);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API_URI_DEV}api/application/product`,
        { productData: newProductDAta },
        config
      );

      if (response.status === 200) {
        console.log("product", response.status);
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
function removeThumbUrl(product) {
  if (
    product.productData.variants &&
    Array.isArray(product.productData.variants)
  ) {
    product.productData.variants.forEach((variant) => {
      if (variant.images && Array.isArray(variant.images)) {
        variant.images.forEach((image) => {
          delete image?.thumbUrl;
          delete image?.uid;
          delete image?.lastModifiedDate;
          delete image?.percent;
          delete image?.name;
          delete image?.originFileObj;
          delete image?.size;
          delete image?.xhr;
        });
      }
    });
  }
  return product.productData;
}
