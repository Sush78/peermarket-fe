import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isUserLoggedIn: false
  },
  reducers: {
    loginUser: (state) => {
      state.isUserLoggedIn = true
    }
  }
})

export const { loginUser } = userSlice.actions
export default userSlice.reducer