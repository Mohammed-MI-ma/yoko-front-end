import { configureStore } from "@reduxjs/toolkit";
import applicationReducer from "./reducers/applicationService/applicationSlice";

const store = configureStore({
  reducer: {
    application: applicationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
