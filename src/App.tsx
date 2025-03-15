/** @jsxImportSource @emotion/react */

import { Global, css } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BeatLoader } from "react-spinners";
import { Toaster } from "react-hot-toast";
import AppRouter from "./routes/AppRouter";
import useLoading from "./hooks/useLoading";

const GlobalStyles = css`
  @font-face {
    font-family: "Wanted Sans";
    src: url("/fonts/WantedSans.ttf") format("truetype");
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: "Wanted Sans", sans-serif;
  }
`;

const queryClient = new QueryClient();

function App() {
  const showLoader = useLoading();

  return (
    <QueryClientProvider client={queryClient}>
      <Global styles={GlobalStyles} />
      <AppRouter />
      <Toaster position="top-center" />
      {showLoader && (
        <div
          css={css`
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.3);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
          `}
        >
          <BeatLoader color="#3498db" loading={showLoader} size={25} />
        </div>
      )}
      {import.meta.env.MODE === "development" && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}

export default App;
