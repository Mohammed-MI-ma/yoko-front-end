import { configureStore } from "@reduxjs/toolkit";
import applicationReducer from "./reducers/applicationService/applicationSlice";
import contactReducer from "./reducers/applicationService/contact/contactSlice";

const store = configureStore({
  reducer: {
    application: applicationReducer,
    contact: contactReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
