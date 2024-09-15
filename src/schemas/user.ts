import * as Yup from "yup";

export const signUpSchema = Yup.object().shape({
  userId: Yup.string()
    .required("아이디를 입력하세요.")
    .min(5, "5자~15자로 입력해 주세요.")
    .max(15, "5자~15자로 입력해 주세요.")
    .matches(/^[A-Za-z0-9]+$/, "알파벳과 숫자만 입력해주세요."),
  email: Yup.string()
    .required("이메일을 입력하세요.")
    .email("유효한 이메일 주소를 입력해 주세요."),
});

export const loginSchema = Yup.object().shape({
  userId: Yup.string()
    .required("아이디를 입력하세요.")
    .min(5, "5자~15자로 입력해 주세요.")
    .max(15, "5자~15자로 입력해 주세요.")
    .matches(/^[A-Za-z0-9]+$/, "알파벳과 숫자만 입력해주세요."),
});
