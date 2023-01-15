/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const AuthHandler = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { currentUser, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (["/login", "/signup"].includes(pathname)) return;
    if (!localStorage.getItem("token") || (!currentUser && isLoading === false))
      navigate("/login");
    else if (currentUser?.role === "manager" && pathname === "/employee")
      // prevent employee from accessing home route
      navigate("/home");
    else if (currentUser?.role === "employee" && pathname === "/home")
      // prevent manager from accessing employee route
      navigate("/employee");
  }, [currentUser, isLoading, pathname]);

  return null;
};

export default AuthHandler;
