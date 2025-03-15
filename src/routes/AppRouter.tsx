/** @jsxImportSource @emotion/react */
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { PRIVATE_ROUTES, PUBLIC_ROUTES, ROUTES } from "@/constants/routes";
import LeftSideBar from "@/components/Layout/SideBar";

function AppRouter() {
  return (
    <Router>
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
    </Router>
  );
}

export default AppRouter;
