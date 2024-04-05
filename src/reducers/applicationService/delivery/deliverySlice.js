import { createSlice } from "@reduxjs/toolkit";
import { searchDeliveryBoyMeiliSearch } from "./deliveryActions";

// Define initial state for delivery
const initialState = {
  isSearchDeliveryBoyInputEmpty: true,
  loadingSearch: false,
  deliveryBoys: [],
  currentPage: 1,
  totalPages: 0,
  error: null,
};

// Define slice for delivery
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
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateSearchInputEmptyState: (state, action) => {
      state.isSearchDeliveryBoyInputEmpty = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchDeliveryBoyMeiliSearch.pending, (state) => {
        state.loadingSearch = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(searchDeliveryBoyMeiliSearch.fulfilled, (state, action) => {
        state.loadingSearch = false;
        state.error = null;
        state.deliveryBoys = action.payload.hits;
        state.totalPages = Math.ceil(
          action.payload.hits.length / ITEMS_PER_PAGE
        );
      })
      .addCase(searchDeliveryBoyMeiliSearch.rejected, (state, action) => {
        state.loadingSearch = false;
        state.error = action.error.message; // Store the error message
      });
  },
});

export const {
  updateSearchInputEmptyState,
  setDeliveryBoys,
  setCurrentPage,
  setError,
  clearError,
  isSearchDeliveryBoyInputEmpty,
} = deliverySlice.actions;

export default deliverySlice.reducer;

// Constants
const ITEMS_PER_PAGE = 20;
