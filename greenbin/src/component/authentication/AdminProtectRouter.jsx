import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../../context/Context";

const AdminProtectRouter = ({ children }) => {
  const { admin } = useContext(Context);

  return admin ? children : <Navigate to="/admine/login" replace />;
};

export default AdminProtectRouter;
