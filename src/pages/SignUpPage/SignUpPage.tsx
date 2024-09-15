/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as S from "./SignUpPage";
import { checkUserExistence, signUp } from "@/api/user";
import poliMdLogo from "@/assets/poli-md-logo.svg";
import poliSmText from "@/assets/poli-sm-text.svg";
import { SignUpData } from "@/types/user";
import { signUpSchema } from "@/schemas/user";


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

  const setUserIdError = (message: string) => {
    setError("userId", {
      type: "manual",
      message,
    });
  };

  const onSubmit = async (data: SignUpData) => {
    try {
      const { exists } = await checkUserExistence(data.userId);
      
      if (exists) {
        setUserIdError("이미 존재하는 아이디입니다.");
        return;
      }

      await signUp(data);
      navigate("/login");
    } catch (error) {
      console.error("error", error);
      
      if (error instanceof AxiosError) {
        setUserIdError("서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      } else {
        setUserIdError("알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      }
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
            <S.Input {...register("userId")} type="text" placeholder="아이디*" />
            <S.FocusText className="focus-text">아이디*</S.FocusText>
            <S.ErrorText>{errors.userId && errors.userId.message}</S.ErrorText>
          </S.InputWrapper>
          <S.InputWrapper>
            <S.Input {...register("email")} type="text" placeholder="이메일*" />
            <S.FocusText className="focus-text">이메일*</S.FocusText>
            <S.ErrorText>{errors.email && errors.email.message}</S.ErrorText>
          </S.InputWrapper>
        </S.InputContainer>
        <S.Button type="submit">회원가입</S.Button>
        <S.Text>
          이미 계정이 있으신가요? <S.StyledLink to="/login">로그인</S.StyledLink>
        </S.Text>
      </S.Form>
    </S.Container>
  );
};

export default SignUpPage;