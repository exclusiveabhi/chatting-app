import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

const store = configureStore({
  reducer: rootReducer,
  // Additional middleware and configuration if needed
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
