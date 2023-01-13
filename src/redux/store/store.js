import _ from "lodash";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import authReducer, { authSlice } from "../slices/authSlice";
import modalReducer, { modalSlice } from "../slices/modalSlice";
import queryReducer, { querySlice } from "../slices/querySlice";
import notificationsReducer, {
  notificationsSlice,
} from "../slices/notificationsSlice";

import { authApi } from "../../api/auth";
import { departmentApi } from "../../api/department";

const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    notifications: notificationsReducer,
    query: queryReducer,
    [authApi.reducerPath]: authApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(departmentApi.middleware),
});

setupListeners(store.dispatch);

// Dispatch action with the help of actions method
const createActions = (slice) =>
  _.mapValues(
    slice?.actions,
    (actionCreator) => (payload) => store?.dispatch(actionCreator(payload))
  );

export const actions = {
  auth: createActions(authSlice),
  modal: createActions(modalSlice),
  notification: createActions(notificationsSlice),
  query: createActions(querySlice),
};

export default store;
