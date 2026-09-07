import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { I18nProvider } from "./i18n/I18nContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Home from "./pages/Home";
import EmailCapture from "./components/EmailCapture";
import WhatsAppChat from "./components/WhatsAppChat";
import "./index.css";

function AppRoutes() {
  const location = useLocation();
  const langFromUrl = location.pathname.split("/")[1];
  const initialLang = (langFromUrl === "ar" || langFromUrl === "en") ? langFromUrl : "en";

  return (
    <I18nProvider initialLang={initialLang}>
      <EmailCapture variant="modal" />
      <WhatsAppChat />
      <Routes>
        <Route path="/" element={<Navigate to="/en" replace />} />
        <Route path=":lang" element={<Home />} />
        <Route path=":lang/product" element={<Navigate to={`/${initialLang}#product`} replace />} />
        <Route path=":lang/about" element={<Navigate to={`/${initialLang}#about`} replace />} />
        <Route path=":lang/faq" element={<Navigate to={`/${initialLang}#faq`} replace />} />
        <Route path=":lang/quiz" element={<Navigate to={`/${initialLang}#quiz`} replace />} />
        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
    </I18nProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
