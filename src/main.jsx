import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ModeProvider from "./context/ModeProvider";
import { SupabaseProvider } from "@/context/SupabaseProvider.jsx";
import LoginProvider from "@/context/LoginProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SupabaseProvider>
        <ModeProvider>
          <LoginProvider>
            <App />
          </LoginProvider>
        </ModeProvider>
      </SupabaseProvider>
    </BrowserRouter>
  </StrictMode>
);
