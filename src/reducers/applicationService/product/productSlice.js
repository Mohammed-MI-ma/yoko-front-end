import { createSlice } from "@reduxjs/toolkit";
import {
  addProduct,
  deleteProduct,
  searchProductMeiliSearch,
  updateProduct,
} from "./productActions";

const initialState = {
  loadingSearch: false,
  loadingProduct: false,
  products: [],
  currentPage: 1,
  totalPages: 0,
  error: null,
  isAllowedToAddNewProduct: false,
  specificObject: {
    name: "",
    description: "",
    category: "Grocery Essentials",
    brand: "Afia",
    variants: [
      {
        attributes: {},
        sku: "",
        quantity: 0,
        price: 0,
        images: [],
      },
    ],
    ratings: [],
  },
  //MarketPlace
  newest4Products: [],
  popular4KitchenProducts: [],
  popular4BeautyProducts: [],
  popular4HomeProducts: [],
  popular4SportsProducts: [],
};
const productSlice = createSlice({
  name: "product",
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProductMeiliSearch.pending, (state) => {
        state.loadingSearch = true;
        state.error = null;
      })
      .addCase(searchProductMeiliSearch.fulfilled, (state, action) => {
        state.loadingSearch = false;
        state.error = null;
        state.products = action.payload;
        state.totalPages = Math.ceil(
          action.payload.data?.length / ITEMS_PER_PAGE
        );
      })
      .addCase(searchProductMeiliSearch.rejected, (state, action) => {
        state.loadingSearch = false;
        state.error = action.error.message;
      })
      //ADD
      .addCase(addProduct.pending, (state) => {
        state.loadingProduct = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loadingProduct = false;
        state.products = action.payload;

        state.error = null;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loadingProduct = false;
        state.error = action.error.message;
      })
      //UPDATE
      .addCase(updateProduct.pending, (state) => {
        state.loadingProduct = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loadingProduct = false;
        state.deliveryBoys = action.payload;
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loadingProduct = false;
        state.error = action.error.message;
      })
      //DELETE
      .addCase(deleteProduct.pending, (state) => {
        state.loadingProduct = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loadingProduct = false;
        state.products = action.payload;

        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loadingProduct = false;
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
} = productSlice.actions;

export default productSlice.reducer;

const ITEMS_PER_PAGE = 20;
