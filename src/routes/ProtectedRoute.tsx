import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "@/stores/user";
import { ROUTES } from "@/constants/routes";

type ProtectedRouteProps = {
  children: ReactNode;
  requireAuth: boolean;
}

function ProtectedRoute({ children, requireAuth }: ProtectedRouteProps) {
  const { userId } = useUserStore();

  if (requireAuth && !userId) {
    return <Navigate to={ROUTES.HOME} />;
  }

  if (!requireAuth && userId) {
    return <Navigate to={ROUTES.CHAT} />;
  }
  
  return <>{children}</>;
}

export default ProtectedRoute;
