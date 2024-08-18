import { configureStore } from "@reduxjs/toolkit"
import taxSlice from "../reducers/taxSlice"

export const store = configureStore({
  reducer: {
    taxCalculator: taxSlice,
  },
})
