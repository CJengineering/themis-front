import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const auth = isAuthenticated();

  return auth ? <>{children}</> : <Navigate to="/signin" />;
};

function isAuthenticated() {
  const auth = localStorage.getItem("isAuthenticated");
  console.log(auth);
  return auth === "true";
}

export default ProtectedRoute;
