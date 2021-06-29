import { configureStore } from '@reduxjs/toolkit';
import basketReducer from '@slice/basketSlice';

export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
});
