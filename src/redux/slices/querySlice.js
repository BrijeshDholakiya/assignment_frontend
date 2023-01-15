import { createSlice } from "@reduxjs/toolkit";

export const querySlice = createSlice({
  name: "query",
  initialState: {
    query: { page: 0 },
  },
  reducers: {
    selectQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const { selectQuery } = querySlice.actions; //name exporting for using in component directly
export default querySlice.reducer;
