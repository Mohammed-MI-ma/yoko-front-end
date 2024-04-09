import { createSlice } from "@reduxjs/toolkit";
import {
  addDeliveryBoy,
  deleteDeliveryBoy,
  searchDeliveryBoyMeiliSearch,
  updateDeliveryBoy,
} from "./deliveryActions";

const initialState = {
  loadingSearch: false,
  loadingDeliveryBoy: false,
  deliveryBoys: [],
  currentPage: 1,
  totalPages: 0,
  error: null,
  isAllowedToAddNewDeliveryBoy: false,
  specificObject: null,
};
const deliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {
    setDeliveryBoys: (state, action) => {
      state.deliveryBoys = action.payload.hits;
      state.totalPages = Math.ceil(action.payload.hits.length / ITEMS_PER_PAGE);
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setIsAllowedToAddNewDeliveryBoy: (state, action) => {
      state.isAllowedToAddNewDeliveryBoy = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    findObjectById: (state, action) => {
      const { id } = action.payload;
      const foundObject = state.deliveryBoys.data.find((obj) => obj._id === id);
      state.specificObject = foundObject
        ? { ...foundObject, sex: foundObject.sex === "homme" ? 1 : 2 }
        : null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchDeliveryBoyMeiliSearch.pending, (state) => {
        state.loadingSearch = true;
        state.error = null;
      })
      .addCase(searchDeliveryBoyMeiliSearch.fulfilled, (state, action) => {
        state.loadingSearch = false;
        state.error = null;
        state.deliveryBoys = action.payload;
        state.totalPages = Math.ceil(
          action.payload.data.length / ITEMS_PER_PAGE
        );
      })
      .addCase(searchDeliveryBoyMeiliSearch.rejected, (state, action) => {
        state.loadingSearch = false;
        state.error = action.error.message;
      })
      //ADD
      .addCase(addDeliveryBoy.pending, (state) => {
        state.loadingDeliveryBoy = true;
        state.error = null;
      })
      .addCase(addDeliveryBoy.fulfilled, (state, action) => {
        state.loadingDeliveryBoy = false;
        state.deliveryBoys = action.payload;

        state.error = null;
      })
      .addCase(addDeliveryBoy.rejected, (state, action) => {
        state.loadingDeliveryBoy = false;
        state.error = action.error.message;
      })
      //UPDATE
      .addCase(updateDeliveryBoy.pending, (state) => {
        state.loadingDeliveryBoy = true;
        state.error = null;
      })
      .addCase(updateDeliveryBoy.fulfilled, (state, action) => {
        state.loadingDeliveryBoy = false;
        state.deliveryBoys = action.payload;
        state.error = null;
      })
      .addCase(updateDeliveryBoy.rejected, (state, action) => {
        state.loadingDeliveryBoy = false;
        state.error = action.error.message;
      })
      //DELETE
      .addCase(deleteDeliveryBoy.pending, (state) => {
        state.loadingDeliveryBoy = true;
        state.error = null;
      })
      .addCase(deleteDeliveryBoy.fulfilled, (state, action) => {
        state.loadingDeliveryBoy = false;
        state.deliveryBoys = action.payload;

        state.error = null;
      })
      .addCase(deleteDeliveryBoy.rejected, (state, action) => {
        state.loadingDeliveryBoy = false;
        state.error = action.error.message;
      });
  },
});

export const {
  updateSearchInputEmptyState,
  setDeliveryBoys,
  setCurrentPage,
  setError,
  clearError,
  findObjectById,
  loadingDeliveryBoy,
  setIsAllowedToAddNewDeliveryBoy,
} = deliverySlice.actions;

export default deliverySlice.reducer;

const ITEMS_PER_PAGE = 20;
