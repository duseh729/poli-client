/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Header from "@/components/Home/Header";
import Main from "@/components/Home/Main";
import LinkButton from "@/components/Home/LinkButton";

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
