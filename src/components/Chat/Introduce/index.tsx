/** @jsxImportSource @emotion/react */
import * as S from "./style.ts";
import poliMdLogo from "@/assets/poli-md-logo.svg";
import poliLgText from "@/assets/poli-lg-text.svg";
import affiDavitLogo from "@/assets/affidavit.svg";
import messageLogo from "@/assets/message.svg";
import notificationLogo from "@/assets/notification.svg";

type IntroduceProps = {
  handleNextStep: () => void;
  isEnableNext: boolean;
};

const Introduce = ({ handleNextStep, isEnableNext }: IntroduceProps) => {
  return (
    <S.Container>
      <S.LogoContainer>
        <img src={poliMdLogo} alt="POLI Logo" css={S.logoStyle} />
        <img src={poliLgText} alt="POLI Text" css={S.textLogoStyle} />
      </S.LogoContainer>
      <S.Subtitle>
        사이버범죄 대처의 모든 것, <span css={S.boldStyle}>POLI</span>에게
        물어보세요.
        <br />
        대처 상담부터 진술서 작성까지 한 번에 이루어집니다.
      </S.Subtitle>
      <S.CardContainer>
        <S.Card onClick={handleNextStep}>
          <S.CardIcon src={affiDavitLogo} alt="Affidavit Icon" />
          <S.CardName>만능 진술서 도우미</S.CardName>
          <S.CardText>
            진술서 편하게 작성하고
            <br />
            싶은데 도와줘.
          </S.CardText>
        </S.Card>
        <S.Card onClick={handleNextStep}>
          <S.CardIcon src={messageLogo} alt="Message Icon" />
          <S.CardName>나만의 대처 방안 가이드</S.CardName>
          <S.CardText>
            내 사건에 대한 적절한
            <br /> 대처 방안을 알려줘요.
          </S.CardText>
        </S.Card>
        <S.Card onClick={handleNextStep}>
          <S.CardIcon src={notificationLogo} alt="Notification Icon" />
          <S.CardName>유능한 사례 • 판례 콜렉터</S.CardName>
          <S.CardText>
            내 사건과 유사한 사례나
            <br /> 판례가 있어?
          </S.CardText>
        </S.Card>
      </S.CardContainer>
      <S.StartButton onClick={handleNextStep} disabled={!isEnableNext}>
        시작하기
      </S.StartButton>
      <S.Footer>
        폴리가 제공한 법률상담에 대해 어떠한 민사, 형사상의 책임도 지지
        않습니다. 최종 결정에는 반드시 변호사의 조력을 받으십시오.
      </S.Footer>
    </S.Container>
  );
};

export default Introduce;
