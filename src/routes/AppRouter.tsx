/** @jsxImportSource @emotion/react */
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { ROUTES } from "@/constants/routes";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import SignUpPage from "@/pages/SignUpPage";
import MainPage from "@/pages/MainPage";
import ChatPage from "@/pages/ChatPage";
import LeftSideBar from "@/components/Layout/SideBar";

const publicRoutes = [
  { path: ROUTES.HOME, element: <HomePage /> },
  { path: ROUTES.LOGIN, element: <LoginPage /> },
  { path: ROUTES.SIGNUP, element: <SignUpPage /> },
];

const protectedRoutes = [
  { path: ROUTES.MAIN, element: <MainPage /> },
  { path: ROUTES.CHAT_ID, element: <ChatPage /> },
];

function AppRouter() {
  return (
    <Router>
      <Routes>
        {publicRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute requireAuth={false}>{element}</ProtectedRoute>
            }
          />
        ))}
        <Route element={<LeftSideBar />}>
          {protectedRoutes.map(({ path, element }) => (
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
