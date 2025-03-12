import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../../context/Context";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(Context);

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
