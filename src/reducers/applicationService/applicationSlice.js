import { createSlice } from "@reduxjs/toolkit";

// Define initial state for language
const initialState = {
  language: "fr", // Default language
  sideMenuIsOpened: false,
  modalSimulationIsOpened: false,
  sitePrimaryFontRegular: "Primary-Regular-ar",
  siteDirection: "rtl",
  promoVideoOpened: false,
  drawerOpenSettings: false,
  drawerOpenCart: false,

  dynamicWidth: null,
};

// Define slice for language
const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setDrawerOpenSettings: (state, action) => {
      state.drawerOpenSettings = action.payload;
    },
    setDrawerOpenCart: (state, action) => {
      state.drawerOpenCart = action.payload;
    },
    setPromoVideoOpened: (state, action) => {
      state.promoVideoOpened = action.payload;
    },

    setSideMenuIsOpened: (state, action) => {
      state.sideMenuIsOpened = action.payload;
    },
    setModalSimulationIsOpened: (state, action) => {
      state.modalSimulationIsOpened = action.payload;
    },
    setPrimaryRegularFont: (state, action) => {
      state.sitePrimaryFontRegular = action.payload;
    },
    setSiteDirection: (state, action) => {
      state.siteDirection = action.payload;
    },
    setDynamicWidth: (state, action) => {
      state.dynamicWidth = action.payload;
    },
  },
});

export const {
  setLanguage,
  setSideMenuIsOpened,
  setModalSimulationIsOpened,
  setPrimaryRegularFont,
  setSiteDirection,
  setPromoVideoOpened,
  setDynamicWidth,
  setDrawerOpenSettings,
  setDrawerOpenCart,
} = applicationSlice.actions;

export default applicationSlice.reducer;
