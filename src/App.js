import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Alert, Slide, Snackbar } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "./views/pages/Login";
import { useUserQuery } from "./api/auth";
import { actions } from "./redux/store/store";
import SignUp from "./views/pages/SignUp";
import AuthHandler from "./auth/AuthHandler";
import Home from "./views/pages/Home";
import DepartmentModal from "./components/shared/modals/department";
import Employee from "./views/pages/Employee";

const SlideUp = (p) => <Slide {...p} direction="up" />;

function App() {
  const [stopUserQuery, setStopUserQuery] = useState(false);
  const currentUserQuery = useUserQuery(null, {
    refetchOnMountOrArgChange: true, // Get the current user every time when reloading the page
    skip: !localStorage.getItem("token"),
  });

  const notifications = useSelector(
    (state) => state.notifications.notifications
  );
  const modal = useSelector((state) => state?.modal);

  useEffect(() => {
    if (!stopUserQuery) {
      // if state is false it sets the current user data
      actions.auth.setCurrentUser(currentUserQuery?.data?.data || null);
      actions.auth.setLoading(currentUserQuery?.isLoading);
    }
  }, [currentUserQuery, stopUserQuery]);

  return (
    <Fragment>
      <BrowserRouter>
        <AuthHandler />
        <Routes>
          <Route
            path="/login"
            element={<Login onStopUserQuery={setStopUserQuery} />}
          />
          <Route
            path="/signup"
            element={<SignUp onStopUserQuery={setStopUserQuery} />}
          />
          <Route path="/employee" element={<Employee />} />
          <Route path="/home" element={<Home />} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>

      {modal?.department?.open && (
        <DepartmentModal data={modal?.department?.data} />
      )}
      {notifications?.map(({ message, open, status }) => (
        <Snackbar
          key={message}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={open}
          autoHideDuration={3000}
          onClose={() => actions.notification.close(message)}
          TransitionComponent={SlideUp}
        >
          <Alert severity={status}>{message}</Alert>
        </Snackbar>
      ))}
    </Fragment>
  );
}

export default App;
