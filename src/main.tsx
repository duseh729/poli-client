import React from "react";
import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
import ReactGA from "react-ga4";
import App from "./App.tsx";
import "./index.css";

const useMockApi = import.meta.env.VITE_USE_MOCK_API === "true";

if (process.env.NODE_ENV === "development" && useMockApi) {
  const { worker } = await import("./mocks/browser");
  worker.start();
}

ReactGA.initialize("G-BPRFEGMZDZ");  // Google Analytics Measurement ID

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/react/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
  // Enable logs to be sent to Sentry
  enableLogs: true,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <App />
//  </React.StrictMode>,
);
