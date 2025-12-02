/** @jsxImportSource @emotion/react */
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import ReactGA from "react-ga4";

import ProtectedRoute from "./ProtectedRoute";
import { PRIVATE_ROUTES, PUBLIC_ROUTES, ROUTES } from "@/constants/routes";
import LeftSideBar from "@/components/Layout/SideBar";

function AppRouter() {
  const location = useLocation();

  useEffect(() => {
    // 페이지가 변경될 때마다 pageview 전송
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]);

  return (
    <Routes>
      {PUBLIC_ROUTES.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={
            <ProtectedRoute requireAuth={false}>{element}</ProtectedRoute>
          }
        />
      ))}

      <Route element={<LeftSideBar />}>
        {PRIVATE_ROUTES.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute requireAuth={true}>{element}</ProtectedRoute>
            }
          />
        ))}
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
    </Routes>
  );
}

export default function AppRouterWrapper() {
  // Router는 최상위에서 감싼 Wrapper 필요(useLocation 사용하려면)
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}
