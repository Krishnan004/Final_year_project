import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../../context/Context";
import Loading from "../../context/Loading";

const ProtectedRoute = ({ children }) => {
  const { user, checkUserAuth } = useContext(Context);

  useEffect(() => {
    checkUserAuth();
  }, []);

  

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
