/** @jsxImportSource @emotion/react */
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as S from "./style";
import { logIn } from "@/api/user";
import { useUserStore } from "@/stores/index";
import { LoginData } from "@/types/user";
import { loginSchema } from "@/schemas/user";
import { HTTP_STATUS } from "@/constants/http";
import { ROUTES } from "@/constants/routes";

const LoginPage = () => {
  const setUser = useUserStore((state) => state.setUser);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await logIn(data);
      if (response) {
        setUser(response);
        navigate(ROUTES.MAIN);
      }
    } catch (error) {
      if (
        isAxiosError(error) &&
        error?.response?.status === HTTP_STATUS.UNAUTHORIZED
      ) {
        setError("userId", {
          type: "manual",
          message: "존재하지 않는 회원입니다.",
        });
        console.log("error", error);
      } else {
        console.error("error", error);
        setError("userId", {
          type: "manual",
          message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
        });
      }
    }
  };

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Title>로그인</S.Title>
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
            <S.ErrorText>{errors.userId?.message}</S.ErrorText>
          </S.InputWrapper>
          <S.Button type="submit">로그인</S.Button>
        </S.InputContainer>
        <S.Text>
          계정이 없으신가요? <S.StyledLink to="/signup">회원가입</S.StyledLink>
        </S.Text>
      </S.Form>
    </S.Container>
  );
};

export default LoginPage;
