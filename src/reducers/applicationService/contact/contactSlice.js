import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    contactInfo: null,
    loading: false,
    error: null,
    page: 1, // Current page for pagination
    hasNextPage: false, // Indicates if there is a next page
    cache: {}, // Cache for storing fetched contact information
  },
  reducers: {
    setContactInfo(state, action) {
      state.contactInfo = action.payload;
      state.cache[action.payload.page] = action.payload.data; // Cache the fetched data
      state.hasNextPage = action.payload.hasNextPage; // Update hasNextPage flag
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    clearCache(state) {
      state.cache = {}; // Clear the cache
    },
    resetState(state) {
      state.contactInfo = null;
      state.loading = false;
      state.error = null;
      state.page = 1;
      state.hasNextPage = false;
      state.cache = {};
    },
  },
});

export const {
  setContactInfo,
  setLoading,
  setError,
  setPage,
  clearCache,
  resetState,
} = contactSlice.actions;

export default contactSlice.reducer;
