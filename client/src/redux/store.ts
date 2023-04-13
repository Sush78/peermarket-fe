import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import categories from './slices/categories';
import user from './slices/user';
import chart from './slices/chart';
import topPools from './slices/topPools';
import getPoolById from './slices/poolById';


export const store = configureStore({
  reducer: {
    categories,
    user,
    chart,
    topPools,
    getPoolById
  }
})

export type AppDispatch = typeof store.dispatch