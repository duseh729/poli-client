import { setupWorker } from "msw/browser";
import { handlers } from "./handlers.ts";
import { seedMockData } from "./seedData.ts";

// Mock 모드 시작 시 시드 데이터 주입
seedMockData();

export const worker = setupWorker(...handlers);
