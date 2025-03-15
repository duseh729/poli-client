/** @jsxImportSource @emotion/react */

import { Global, css } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppRouter from "./routes/AppRouter";

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
  return (
    <QueryClientProvider client={queryClient}>
      <Global styles={GlobalStyles} />
      <AppRouter />
      {import.meta.env.MODE === "development" && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}

export default App;
