import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const useMockApi = import.meta.env.VITE_USE_MOCK_API === "true";

if (process.env.NODE_ENV === "development" && useMockApi) {
  const { worker } = await import("./mocks/browser");
  worker.start();
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
