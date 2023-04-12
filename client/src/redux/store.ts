import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import categories from './slices/categories';
import user from './slices/user';
import chart from './slices/chart';


export const store = configureStore({
  reducer: {
    categories,
    user,
    chart
  }
})

export type AppDispatch = typeof store.dispatch