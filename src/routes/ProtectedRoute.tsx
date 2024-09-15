import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "@/stores/user";

type ProtectedRouteProps = {
  children: ReactNode;
  requireAuth: boolean;
}

function ProtectedRoute({ children, requireAuth }: ProtectedRouteProps) {
  const { userId } = useUserStore();

  if (requireAuth && !userId) {
    return <Navigate to="/" />;
  }

  if (!requireAuth && userId) {
    return <Navigate to="/chat" />;
  }
  
  return <>{children}</>;
}

export default ProtectedRoute;
