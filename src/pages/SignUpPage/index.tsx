/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as S from "./style";
import { checkUserExistence, signUp } from "@/api/user";
import poliMdLogo from "@/assets/poli-md-logo.svg";
import poliSmText from "@/assets/poli-sm-text.svg";
import { SignUpData } from "@/types/user";
import { signUpSchema } from "@/schemas/user";
import { ROUTES } from "@/constants/routes";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: SignUpData) => {
    try {
      const { exists } = await checkUserExistence(data.userId);
      if (exists) {
        setError("userId", {
          type: "manual",
          message: "이미 존재하는 아이디 입니다.",
        });
        return;
      }
      await signUp(data);
      navigate(ROUTES.LOGIN);
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.LogoContainer>
          <img src={poliMdLogo} alt="POLI" />
          <img src={poliSmText} alt="POLI Text" />
        </S.LogoContainer>
        <S.InputContainer>
          <S.InputWrapper>
            <S.Input
              {...register("userId")}
              type="text"
              placeholder="아이디*"
              hasError={!!errors.userId}
            />
            <S.FocusText className="focus-text" hasError={!!errors.userId}>
              아이디*
            </S.FocusText>
            <S.ErrorText>{errors.userId && errors.userId.message}</S.ErrorText>
          </S.InputWrapper>
          <S.InputWrapper>
            <S.Input
              {...register("userName")}
              type="text"
              placeholder="이름*"
              hasError={!!errors.userName}
            />
            <S.FocusText className="focus-text" hasError={!!errors.userName}>
              이름*
            </S.FocusText>
            <S.ErrorText>
              {errors.userName && errors.userName.message}
            </S.ErrorText>
          </S.InputWrapper>
        </S.InputContainer>
        <S.Button type="submit">회원가입</S.Button>
        <S.Text>
          이미 계정이 있으신가요?{" "}
          <S.StyledLink to="/login">로그인</S.StyledLink>
        </S.Text>
      </S.Form>
    </S.Container>
  );
};

export default SignUpPage;
