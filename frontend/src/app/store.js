import { configureStore } from "@reduxjs/toolkit";
import controlReducer from "../slices/control/controlSlice";

export const store = configureStore({
  reducer: {
    control: controlReducer,
  },
});
