import { configureStore } from '@reduxjs/toolkit';
import categories from './slices/categories';
import user from './slices/user';
import chart from './slices/chart';
import topPools from './slices/topPools';
import getPoolById from './slices/poolById';
import {getNotificationReducer,
  addNotificationReducer,
  updateNotificationReducer,} from './slices/notification';


export const store = configureStore({
  reducer: {
    categories,
    user,
    chart,
    topPools,
    getPoolById,
    getNotification: getNotificationReducer,
    addNotification: addNotificationReducer,
    updateNotification: updateNotificationReducer,
  }
})

export type AppDispatch = typeof store.dispatch