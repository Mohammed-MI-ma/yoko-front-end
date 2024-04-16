import { createSlice } from "@reduxjs/toolkit";
import { searchProductMeiliSearchByCategory } from "./marketPlaceActions";

const initialState = {
  sections: null,
  minPrice: 5,
  maxPrice: 1000,
  brand: false,
  products: [],
  cartME: [],
};
const marketPlaceSlice = createSlice({
  name: "marketPlace",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.products = action.payload.hits;
      state.totalPages = Math.ceil(action.payload.hits.length / ITEMS_PER_PAGE);
    },

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setIsAllowedToAddNewProduct: (state, action) => {
      state.isAllowedToAddNewProduct = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    findObjectById: (state, action) => {
      const { id } = action.payload;
      const foundObject = state.products.data.find((obj) => obj._id === id);
      state.specificObject = foundObject ? { ...foundObject } : null;
    },
    setNewest4Products: (state, action) => {
      state.newest4Products = action.payload;
    },
    setPopular4KitchenProducts: (state, action) => {
      state.popular4KitchenProducts = action.payload;
    },
    setPopular4BeautyProducts: (state, action) => {
      state.popular4BeautyProducts = action.payload;
    },
    setPopular4HomeProducts: (state, action) => {
      state.popular4HomeProducts = action.payload;
    },
    setPopular4SportsProducts: (state, action) => {
      state.popular4SportsProducts = action.payload;
    },
    setProductInCart: (state, action) => {
      state.productsInCart = action.payload;
    },
    setCart: (state, action) => {
      state.cartME = action.payload;
    },

    updateProductQuantity: (state, action) => {
      const { quantity, productId } = action.payload;

      // Find the index of the product in the products array
      const productIndex = state.cartME.findIndex(
        (product) => product?._id === productId
      );

      // If the product exists, update its quantity
      if (productIndex !== -1) {
        const updatedProducts = [...state.products];
        updatedProducts[productIndex] = {
          ...updatedProducts[productIndex],
          quantity: quantity,
        };

        return {
          ...state,
          products: updatedProducts,
        };
      }

      // If the product does not exist, return the current state
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProductMeiliSearchByCategory.pending, (state) => {
        state.loadingSearch = true;
        state.error = null;
      })
      .addCase(
        searchProductMeiliSearchByCategory.fulfilled,
        (state, action) => {
          state.loadingSearch = false;
          state.error = null;
          state.products = action.payload;
          state.totalPages = Math.ceil(
            action.payload?.data?.length / ITEMS_PER_PAGE
          );
        }
      )
      .addCase(searchProductMeiliSearchByCategory.rejected, (state, action) => {
        state.loadingSearch = false;
        state.error = action.error.message;
      });
  },
});

export const {
  updateSearchInputEmptyState,
  setProducts,
  setCurrentPage,
  setError,
  clearError,
  findObjectById,
  loadingProduct,
  setIsAllowedToAddNewProduct,
  //marketPlace
  setNewest4Products,
  setPopular4KitchenProducts,
  setPopular4BeautyProducts,
  setPopular4HomeProducts,
  setPopular4SportsProducts,
  setProductInCart,
  setCart,
  updateProductQuantity,
} = marketPlaceSlice.actions;

export default marketPlaceSlice.reducer;

const ITEMS_PER_PAGE = 20;
