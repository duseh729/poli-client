/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import * as S from "./style";
import Introduce from "@/components/Chat/Introduce";
import InfoCollection from "@/components/Chat/InfoCollection";
import ImageCollection from "@/components/Chat/ImageCollection";
import SEO from "@/components/Common/SEO";

type InitMessageType = {
  place: string;
  date: string | undefined;
  time: string | undefined;
  situation: string;
  hasReported: boolean;
  isLegalProcedureOngoing: boolean;
};

const MainPage = () => {
  const location = useLocation();
  const [showNextScreen, setShowNextScreen] = useState(1);
  const [isEnableNext, setIsEnableNext] = useState(true);

  const [initMessage, setInitMessage] = useState<InitMessageType | null>(null);
  const [situationDescription, setSituationDescription] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (location.state?.showNextScreen) {
      setShowNextScreen(location.state.showNextScreen);
    }
  }, [location.state]);

  useEffect(() => {
    if (showNextScreen === 3 && containerRef.current) {
      containerRef.current.scrollTo(0, 0);
    }
    if (showNextScreen === 2 && containerRef.current) {
      containerRef.current.scrollTo(0, 0);
    }
  }, [showNextScreen]);

  const handleNextStep = () => {
    if (showNextScreen === 1) {
      setShowNextScreen(2);
      setIsEnableNext(false);
    } else if (showNextScreen === 2) {
      setShowNextScreen(3);
      setIsEnableNext(true);
    }
  };

  return (
    <>
      <SEO title="정보 입력" noindex={true} />

      <S.Container
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <S.Main>
          {showNextScreen === 1 ? (
            <Introduce handleNextStep={handleNextStep} />
          ) : showNextScreen === 2 ? (
            <InfoCollection
              handleNextStep={handleNextStep}
              setIsEnableNext={setIsEnableNext}
              isEnableNext={isEnableNext}
              initMessage={initMessage}
              setInitMessage={setInitMessage}
              situationDescription={situationDescription}
              setSituationDescription={setSituationDescription}
            />
          ) : (
            <ImageCollection
              initMessage={initMessage}
              situationDescription={situationDescription}
            />
          )}
        </S.Main>
      </S.Container>
    </>
  );
};

export default MainPage;
