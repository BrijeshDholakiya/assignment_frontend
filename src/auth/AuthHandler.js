import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthHandler = () => {
  const navigate = useNavigate();

  const { currentUser, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!!localStorage.getItem("token")) return;
    if (!localStorage.getItem("token") || (!currentUser && isLoading === false))
      navigate("/login");
  }, [currentUser, isLoading]);

  return null;
};

export default AuthHandler;
