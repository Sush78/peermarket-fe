import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import categories from './slices/categories';
import user from './slices/user';


export const store = configureStore({
  reducer: {
    categories,
    user
  }
})

export type AppDispatch = typeof store.dispatch