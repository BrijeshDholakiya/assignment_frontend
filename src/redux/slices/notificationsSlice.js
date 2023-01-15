import { createSlice } from "@reduxjs/toolkit";

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
  },
  reducers: {
    add: (state, action) => {
      state.notifications.push({
        message: action.payload.message,
        status: action.payload.status,
        open: true,
      });
    },
    close: (state, action) => {
      state.notifications = state.notifications.filter(
        (n) => n.message !== action.payload
      );
    },
  },
});

export const { add, close } = notificationsSlice.actions;
export default notificationsSlice.reducer;
