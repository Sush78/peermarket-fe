import { createSlice } from '@reduxjs/toolkit';
const chartSlice = createSlice({
  name: "chart",
  initialState: {
    chartData: {}
  },
  reducers: {
    addDataToChart: (state: any, action) => {
      state.chartData = (action.payload)
    }
  }
})

export const { addDataToChart } = chartSlice.actions
export default chartSlice.reducer

