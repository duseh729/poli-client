/** @jsxImportSource @emotion/react */
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { css } from "@emotion/react";
import ProtectedRoute from "./ProtectedRoute";
import InfoCollectionPage from "@/pages/InfoCollectionPage/InfoCollectionPage.tsx";
import ChatPage from "@/pages/ChatPage/ChatPage.tsx";
import HomePage from "@/pages/HomePage/HomePage.tsx";
import LoginPage from "@/pages/LoginPage/LoginPage.tsx";
import SignUpPage from "@/pages/SignUpPage/SignUpPage.tsx";
import LeftSideBar from "@/components/layout/LeftSideBar.tsx";
import { ROUTES } from "@/constants/routes";


const publicRoutes = [
  { path: ROUTES.HOME, element: <HomePage /> },
  { path: ROUTES.LOGIN, element: <LoginPage /> },
  { path: ROUTES.SIGNUP, element: <SignUpPage /> },
];

const protectedRoutes = [
  { path: ROUTES.CHAT, element: <InfoCollectionPage /> },
  { path: ROUTES.CHAT_ID, element: <ChatPage /> },
];

function AppRouter() {
  return (
    <Router>
      <div
        css={css`
          margin: 0 auto;
        `}
      >
        <Routes>
          {publicRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={<ProtectedRoute requireAuth={false}>{element}</ProtectedRoute>}
            />
          ))}
          <Route element={<LeftSideBar />}>
            {protectedRoutes.map(({ path, element }) => (
              <Route
                key={path}
                path={path}
                element={<ProtectedRoute requireAuth={true}>{element}</ProtectedRoute>}
              />
            ))}
          </Route>
          <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRouter;