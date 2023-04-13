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
    updateStatsObj: (state: any, action) => {
      const { choice, amount } = action.payload
      const index = state.data.statsObj.labels.indexOf(choice)
      state.data.statsObj.data[index] += amount
      console.log(index, state.data.statsObj.data[index])
    }
  }
})

export const { updateStatsObj } = poolByIdSlice.actions
export default poolByIdSlice.reducer