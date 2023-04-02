import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index'

export const getCategories = createAsyncThunk('getCategories', async () => {
  const data = await api.fetchCategories()
  const json = await data.json()
  return json.categories
})

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    isLoading: false,
    data: [],
    isError: false
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      console.log('Error', action.payload);
    });
  },
  reducers: {}
})

export default categoriesSlice.reducer