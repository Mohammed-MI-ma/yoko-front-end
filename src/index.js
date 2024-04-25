import React from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import Store from "./store";
import "animate.css";
import "./index.css";

// Initialize i18n with proper error handling
try {
  i18n.use(Backend).init({
    fallbackLng: "fr",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      ar: {
        translation: require("./i18n/ar/translation.json"),
      },
      fr: {
        translation: require("./i18n/fr/translation.json"),
      },
    },
  });
} catch (error) {
  console.error("Error initializing i18n:", error);
}

// Ensure the root element exists before rendering the app
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element with id 'root' not found.");
}

// Render the app using createRoot
const root = createRoot(rootElement);

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
