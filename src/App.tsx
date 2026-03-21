/** @jsxImportSource @emotion/react */

import { Global, css } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
import AppRouter from "./routes/AppRouter";

const GlobalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const queryClient = new QueryClient();

function App() {
  // const showLoader = useLoading();

  return (
    <QueryClientProvider client={queryClient}>
      {/* 2. HelmetProvider로 내부 전체를 감싸줍니다 */}
      <HelmetProvider>
        <Global styles={GlobalStyles} />
        <AppRouter />
        <Toaster position="top-center" />
        {import.meta.env.MODE === "development" && <ReactQueryDevtools />}
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
