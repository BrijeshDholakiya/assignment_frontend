import { createSlice } from "@reduxjs/toolkit";

export const querySlice = createSlice({
  name: "query",
  initialState: {
    query: { page: 1 },
  },
  reducers: {
    selectQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const { selectQuery } = querySlice.actions;
export default querySlice.reducer;
