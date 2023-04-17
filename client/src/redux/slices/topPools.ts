import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../../api/index'

export const getTopPools = createAsyncThunk('getTopPools', async () => {
  const data = await api.fetchTopPools()
  const json = await data.json()
  return json
})
const topPoolsSlice = createSlice({
  name: "topPools",
  initialState: {
    isLoading: false,
    data: [],
    isError: false
  },
  extraReducers: (builder) => {
    builder.addCase(getTopPools.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getTopPools.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getTopPools.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      console.log('Error', action.payload);
    });
  },
  reducers: {}
})

export default topPoolsSlice.reducer