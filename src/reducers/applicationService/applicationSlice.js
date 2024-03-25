import { createSlice } from "@reduxjs/toolkit";

// Define initial state for language
const initialState = {
  language: "fr", // Default language
  sideMenuIsOpened: false,
  modalSimulationIsOpened: false,
  sitePrimaryFontRegular: "Primary-Regular-ar",
  siteDirection: "rtl",
  promoVideoOpened: false,
  firstPageOn: true,
  secondPageOn: false,
  thirdPageOn: false,
};

// Define slice for language
const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setFirstPageOn: (state, action) => {
      return {
        ...state,
        firstPageOn: true,
        secondPageOn: false,
      };
    },
    setSecondPageOn: (state, action) => {
      return {
        ...state,
        firstPageOn: false,
        secondPageOn: true,
      };
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
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
  },
});

export const {
  setLanguage,
  setSideMenuIsOpened,
  setModalSimulationIsOpened,
  setPrimaryRegularFont,
  setSiteDirection,
  setPromoVideoOpened,
  setFirstPageOn,
  setSecondPageOn,
  setThirdPageOn,
} = applicationSlice.actions;

export default applicationSlice.reducer;
