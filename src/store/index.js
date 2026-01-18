import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./slices/adminSlice.js";

const store = configureStore({
  reducer: {
    adminSlice,
  },
});

export default store;
