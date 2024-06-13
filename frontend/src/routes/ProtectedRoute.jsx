import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const ProtectedRoute = ({ element }) => {
  const { token } = useContext(StoreContext);

  if (!token) {
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;