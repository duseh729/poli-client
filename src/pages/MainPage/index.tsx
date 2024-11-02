/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as S from "./style";
import Introduce from "@/components/Chat/Introduce";
import InfoCollection from "@/components/Chat/InfoCollection";

const MainPage = () => {
  const [showNextScreen, setShowNextScreen] = useState(1);
  const [isEnableNext, setIsEnableNext] = useState(true);

  const handleNextStep = () => {
    if (showNextScreen === 1) {
      setShowNextScreen(2);
      setIsEnableNext(false);
    }
  };

  return (
    <S.Container
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <S.Main>
        {showNextScreen === 1 ? (
          <Introduce
            handleNextStep={handleNextStep}
            isEnableNext={isEnableNext}
          />
        ) : (
          <InfoCollection
            setIsEnableNext={setIsEnableNext}
            isEnableNext={isEnableNext}
          />
        )}
      </S.Main>
    </S.Container>
  );
};

export default MainPage;
