import { configureStore } from "@reduxjs/toolkit";
import applicationReducer from "./reducers/applicationService/applicationSlice";
import contactReducer from "./reducers/applicationService/contact/contactSlice";
import authReducer from "./reducers/authService/authSlice";
import deliverReducer from "./reducers/applicationService/delivery/deliverySlice";
import productReducer from "./reducers/applicationService/product/productSlice";
import marketPlaceReducer from "./reducers/applicationService/marketPlace/marketPlaceSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    delivery: deliverReducer,
    product: productReducer,
    marketPlace: marketPlaceReducer,
    application: applicationReducer,
    contact: contactReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
