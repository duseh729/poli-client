/** @jsxImportSource @emotion/react */

import { Global, css } from "@emotion/react";
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

function App() {
  return (
    <>
      <Global styles={GlobalStyles} />
      <AppRouter />;
    </>
  );
}

export default App;
