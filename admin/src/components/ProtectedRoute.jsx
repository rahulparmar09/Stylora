import React from "react";
import { Navigate } from "react-router-dom";
import { adminSalon } from "../context/adminContext";

const ProtectedRoute = ({ children }) => {
  const { token } = adminSalon();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;