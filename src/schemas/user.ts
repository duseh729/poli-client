import * as Yup from "yup";

export const signUpSchema = Yup.object().shape({
  userId: Yup.string()
    .required("아이디를 입력하세요.")
    .min(5, "5자~15자로 입력해 주세요.")
    .max(15, "5자~15자로 입력해 주세요.")
    .matches(/^[A-Za-z0-9]+$/, "알파벳과 숫자만 입력해주세요."),
  userName: Yup.string()
    .required("이름을 입력하세요.")
    .min(3, "3자~5자로 입력해 주세요.")
    .max(5, "3자~5자로 입력해 주세요.")
    .matches(
      /^[\u3131-\u318E\uAC00-\uD7A3a-zA-Z]+$/,
      "한글이나 알파벳만 입력해 주세요."
    ),
});

export const loginSchema = Yup.object().shape({
  userId: Yup.string()
    .required("아이디를 입력하세요.")
    .min(5, "5자~15자로 입력해 주세요.")
    .max(15, "5자~15자로 입력해 주세요.")
    .matches(/^[A-Za-z0-9]+$/, "알파벳과 숫자만 입력해주세요."),
});
