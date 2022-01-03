import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, redirectTo }) {
  const Authenticated = localStorage.getItem("Authenticated");
  console.log("Processing ProtectedRoute...");
  return Authenticated ? children : <Navigate to={redirectTo} />;
}

export default ProtectedRoute;