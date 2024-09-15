/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Header from "@/components/home/Header.tsx";
import Main from "@/components/home/Main.tsx";
import LinkButton from "@/components/home/LinkButton.tsx";

const HomePage = () => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <Header />
      <Main />
      <LinkButton />
    </div>
  );
};

export default HomePage;
