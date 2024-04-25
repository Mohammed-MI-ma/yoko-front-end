import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authService/authSlice";
import deliveryReducer from "./reducers/applicationService/delivery/deliverySlice";
import productReducer from "./reducers/applicationService/product/productSlice";
import marketPlaceReducer from "./reducers/applicationService/marketPlace/marketPlaceSlice";
import applicationReducer from "./reducers/applicationService/applicationSlice";
import contactReducer from "./reducers/applicationService/contact/contactSlice";

const reducers = {
  auth: authReducer,
  delivery: deliveryReducer,
  product: productReducer,
  marketPlace: marketPlaceReducer,
  application: applicationReducer,
  contact: contactReducer,
};

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
