import { createSlice } from "@reduxjs/toolkit";

const open = true;
const emptyObj = { open: false, data: null };
const handlePayload = ({ payload: data }) => ({ open, data });

const initialState = {
  department: emptyObj,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openDepartment: (state, action) => {
      state.department = handlePayload(action);
    },
    closeDepartment: (state, action) => {
      state.department = emptyObj;
    },
  },
});

export const { openDepartment, closeDepartment } = modalSlice.actions;
export default modalSlice.reducer;
