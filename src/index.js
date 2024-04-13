import React from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import "animate.css";

//__COMPONENTS
import App from "./App";

//__STYLING
import "./index.css";

import { Provider } from "react-redux";
//__STORE
import Store from "./store";

// Initialize i18n
i18n
  .use(Backend)
  //.use(LanguageDetector)
  .init({
    fallbackLng: "fr", // Fallback language
    debug: false, // Disable debug mode in production
    interpolation: {
      escapeValue: false, // Not needed for React
    },
    resources: {
      ar: {
        translation: require("./i18n/ar/translation.json"), // Arabic translation
      },
      fr: {
        translation: require("./i18n/fr/translation.json"), // French translation
      },
      en: {
        translation: require("./i18n/en/translation.json"), // English translation
      },
    },
  });

// Render the app using createRoot
const root = createRoot(document.getElementById("root"));
root.render(
  <I18nextProvider i18n={i18n}>
    <React.StrictMode>
      <Provider store={Store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </React.StrictMode>
  </I18nextProvider>
);
