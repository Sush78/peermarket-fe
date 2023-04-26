import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../../api/index'

export const getPoolById = createAsyncThunk('getPoolById', async (id: string) => {
  const data = await api.fetchPoolById(id)
  const json = await data.json()
  return json
})
const poolByIdSlice = createSlice({
  name: "getPoolById",
  initialState: {
    isLoading: false,
    data: {},
    isError: false
  },
  extraReducers: (builder) => {
    builder.addCase(getPoolById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getPoolById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getPoolById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      console.log('Error', action.payload);
    });
  },
  reducers: {
    updateChart: (state: any, action) => {
      const { data, amounts, timestamps, totalVolume } = action.payload
      state.data.data = data
      state.data.amounts = amounts
      state.data.timestamps = timestamps
      state.data.totalVolume = totalVolume
    },
    clearPoolData: (state: any) => {
      state.data = {}
    }
  }
})

export const { updateChart, clearPoolData } = poolByIdSlice.actions
export default poolByIdSlice.reducer