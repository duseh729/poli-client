/** @jsxImportSource @emotion/react */
import * as S from "./Introduce.ts";
import poliMdLogo from "@/assets/poli-md-logo.svg";
import poliLgText from "@/assets/poli-lg-text.svg";
import affiDavitLogo from "@/assets/affidavit.svg";
import messageLogo from "@/assets/message.svg";
import notificationLogo from "@/assets/notification.svg";


type IntroduceProps = {
  handleNextStep: () => void;
  isEnableNext: boolean;
}

const Introduce = ({ handleNextStep, isEnableNext }: IntroduceProps) => {
  return (
    <S.Container>
      <S.LogoContainer>
        <img src={poliMdLogo} alt="POLI Logo" css={S.logoStyle} />
        <img src={poliLgText} alt="POLI Text" css={S.textLogoStyle} />
      </S.LogoContainer>
      <S.Subtitle>
        사이버범죄 대처의 모든 것,{" "}
        <span css={S.boldStyle}>POLI</span>에게 물어보세요.
        <br />
        대처 상담부터 진술서 작성까지 한 번에 이루어집니다.
      </S.Subtitle>
      <S.CardContainer>
        <S.Card>
          <S.CardIcon src={affiDavitLogo} alt="Affidavit Icon" />
          <S.CardName>만능 진술서 도우미</S.CardName>
          <S.CardText>
            진술서 편하게 작성하고
            <br />
            싶은데 도와줘.
          </S.CardText>
        </S.Card>
        <S.Card>
          <S.CardIcon src={messageLogo} alt="Message Icon" />
          <S.CardName>나만의 대처 방안 가이드</S.CardName>
          <S.CardText>
            내 사건에 대한 적절한
            <br /> 대처 방안을 알려줘요.
          </S.CardText>
        </S.Card>
        <S.Card>
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
        폴리의 역할은 정보를 제공하는데 있으며, 형사적 상담 및 법률 상담이
        아닙니다. 본 페이지는 법적 효력이 없습니다.
      </S.Footer>
    </S.Container>
  );
};

export default Introduce;