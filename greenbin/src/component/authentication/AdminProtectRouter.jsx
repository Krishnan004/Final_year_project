import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../../context/Context";

const AdminProtectRouter = ({ children }) => {
  const { admin } = useContext(Context);

  console.log("protect router admin:", admin);

  

  return admin ? children : <Navigate to="/admine/login" replace />;
};


export default AdminProtectRouter;
