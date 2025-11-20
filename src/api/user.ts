import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import * as Sentry from "@sentry/react";
import API from "./axios.ts";
import {
  SignUpRequest,
  SignUpResponse,
  UserExistenceResponse,
  LoginResponse,
  LoginRequest,
} from "@/types/user";

/**
 * detectHashingSuspicion
 * -----------------------
 * 📌 목적
 *  - 회원가입/로그인 등에서 전달된 userId가 정상적인 사람이 입력한 값인지,
 *    혹은 해시(SHA-1 / SHA-256 등) 또는 자동화된 시스템이 생성한 비정상 값인지
 *    사전에 감지하여 Sentry에 warning 로그를 남기기 위한 함수.
 *
 * 📌 왜 필요한가?
 *  - 과거 userId가 해시된 값으로 백엔드에 전달된 사례가 있어
 *    비정상 입력을 조기에 감지하고 추적할 필요가 있음.
 *  - 보안 의심 입력(too long, hex-only etc.)을 빠르게 모니터링해
 *    원인을 파악하고 재발 방지에 활용하려는 목적임.
 *
 * 📌 현재 구현된 감지 조건
 *    1) 길이가 40자 이상인 userId → SHA-1(40), SHA-256(64) 등 해시 길이와 유사
 *    2) 16진수(hex) 문자로만 이루어진 40자 이상 문자열 → 해시 패턴 가능성 증가
 *
 * 📌 향후 확장 계획
 *    - securityUtils/ 폴더로 분리하여 모든 입력 검증 공통 모듈로 관리
 *
 * @param userId 사용자가 입력한 아이디 문자열
 * @returns boolean (이상 패턴 감지 여부)
 */
function detectHashingSuspicion(userId: string) {
  if (!userId) return false;

  // SHA-1: 40 chars
  // SHA-256: 64 chars
  const hexHashPattern = /^[a-f0-9]{40,}$/i;

  // 1) 길이가 40자 이상 → hash 의심
  if (userId.length >= 40) {
    Sentry.captureMessage("⚠ Suspected hashing behavior (length ≥ 40)", {
      level: "warning",
      extra: { userId, length: userId.length },
    });
    return true;
  }

  // 2) 16진수만으로 이루어진 40자 이상 문자열 (SHA hash 패턴)
  if (hexHashPattern.test(userId)) {
    Sentry.captureMessage("⚠ Suspected hashing behavior (hex hash pattern)", {
      level: "warning",
      extra: { userId },
    });
    return true;
  }

  return false;
}

export const useSignUp = () => {
  return useMutation<SignUpResponse, Error, SignUpRequest>({
    mutationFn: async (data) => {
      const copy = { ...data, email: "123@naver.com" };

      // 해싱 의심 감지 로직 추가
      detectHashingSuspicion(copy.userId);

      const response = await API.post<SignUpResponse>("/user/sign-up", copy);
      return response.data;
    },
    onSuccess: () => {
      toast.success("회원가입이 완료되었습니다", {
        duration: 2000,
        style: {
          background: "#28a745",
          color: "#fff",
          fontSize: "16px",
        },
      });
    },
    onError: (error: Error) => {
      toast.error(error.message, {
        duration: 2000,
        style: {
          background: "#dc3545",
          color: "#fff",
          fontSize: "16px",
        },
      });
    },
  });
};

export const useLogIn = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async (data) => {
      const response = await API.get<LoginResponse>(`/user?id=${data.userId}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("로그인에 성공했습니다", {
        duration: 2000,
        style: {
          background: "#28a745",
          color: "#fff",
          fontSize: "16px",
        },
      });
    },
    onError: (error: Error) => {
      toast.error(error.message, {
        duration: 2000,
        style: {
          background: "#dc3545",
          color: "#fff",
          fontSize: "16px",
        },
      });
    },
  });
};

export const useCheckUserExistence = () => {
  return useMutation<UserExistenceResponse, Error, string>({
    mutationFn: async (userId) => {
      const response = await API.post<UserExistenceResponse>(
        `/user/id/exists?userId=${userId}`
      );
      return response.data;
    },
  });
};
