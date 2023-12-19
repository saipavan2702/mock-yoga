import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    age: "",
    batch: "",
    paymentStatu: false,
  },
};

export const authSlice = createSlice({
  setInfo: (state, action) => {
    state.info = action.payload;
  },
  setLogOut: (state) => {
    state.info = initialState;
  },
});

export const { setInfo, setLogOut } = authSlice.actions;
export default authSlice.reducer;
