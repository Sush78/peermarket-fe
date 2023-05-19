import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../../api/index'

export const getNotification = createAsyncThunk('getNotification', async ({ playerAddress }: { playerAddress: string }) => {
  debugger;
  const data = await api.fetchNotifications(playerAddress)
  const json = await data.json()
  return json
})
const getNotificationSlice = createSlice({
  name: "getNotification",
  initialState: {
    isLoading: false,
    notification: {} as Notification[],
    isError: false
  },
  extraReducers: (builder) => {
    builder.addCase(getNotification.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getNotification.fulfilled, (state, action) => {
      state.isLoading = false;
      state.notification = action.payload;
    });
    builder.addCase(getNotification.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      console.log('Error', action.payload);
    });
  },
  reducers: {
    getNotifications: (state, action) => {
      const { data } = action.payload
      state.notification = data as Notification[]
    },
  }
})

export const addNotifications = createAsyncThunk('addNotification', async ({ poolId, playerAddress }: { poolId: string, playerAddress: string }) => {
  const data = await api.addNotifications(poolId, playerAddress)
  const json = await data.json()
  return json
})

const addNotificationSlice = createSlice({
  name: "addNotification",
  initialState: {
    isLoading: false,
    notification: {} as Notification[],
    isError: false
  },
  extraReducers: (builder) => {
    builder.addCase(addNotifications.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addNotifications.fulfilled, (state, action) => {
      state.isLoading = false;
      state.notification = action.payload;
    });
    builder.addCase(addNotifications.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      console.log('Error', action.payload);
    });
  },
  reducers: {
    addNotification: (state, action) => {
      const { data } = action.payload
      state.notification = data as Notification[]
    },
  }
})

export const updateNotification = createAsyncThunk('updateNotification', async ({ notification }: { notification: Notification }) => {
  const data = await api.updateNotifications(notification)
  const json = await data.json()
  return json
})

const updateNotificationSlice = createSlice({
  name: "updateNotification",
  initialState: {
    isLoading: false,
    notification: {} as Notification[],
    isError: false
  },
  extraReducers: (builder) => {
    builder.addCase(updateNotification.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateNotification.fulfilled, (state, action) => {
      state.isLoading = false;
      state.notification = action.payload;
    });
    builder.addCase(updateNotification.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      console.log('Error', action.payload);
    });
  },
  reducers: {
    updateNotifications: (state, action) => {
      const { data } = action.payload
      state.notification = data as Notification[]
    },
  }
})

export const { getNotifications } = getNotificationSlice.actions;
export const getNotificationReducer = getNotificationSlice.reducer;

export const { addNotification } = addNotificationSlice.actions;
export const addNotificationReducer = addNotificationSlice.reducer;

export const { updateNotifications } = updateNotificationSlice.actions;
export const updateNotificationReducer = updateNotificationSlice.reducer;

export default {
getNotificationReducer,
addNotificationReducer,
updateNotificationReducer,
};