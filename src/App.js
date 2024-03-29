//__REACT
import React, { Suspense, lazy, useEffect, useState } from "react";

//__REACT-DOM
import { Navigate, Route, Routes } from "react-router-dom";

//__REACT_REDUX
import { useSelector } from "react-redux";

//__ANTD
import { ConfigProvider, BackTop } from "antd";
import frFR from "antd/lib/locale/fr_FR";
import arEG from "antd/lib/locale/ar_EG";

//__CONFIG
import { loadFonts, loadImages } from "./services/functions/functions";
import ImageConfig from "./config.dev";
import { FontsConfig } from "./fontsConfig";

//__STYLING
import style from "./App.module.css";

//__COMPONENTS && LAZY COMPONENTS
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import Footer from "./components/Footer";
import { Traditional } from "./images";
const HomePage = lazy(() => import("./pages/HomePage"));
const TraditionalFoodPage = lazy(() => import("./pages/TraditionalFood"));

// Lazily load the component responsible for starting the simulation modal

function App() {
  // Initializing state for tracking the loading status of necessary assets
  const [appIsReady, setAppIsReady] = useState(false);

  // Retrieve the state indicating whether the simulation modal is open or closed
  const openModalSimulation = useSelector(
    (state) => state.application.modalSimulationIsOpened
  );

  // Retrieve the state indicating whether the Menu Drawer is open or closed

  // Retrieve the currently selected language from the application state
  const language = useSelector((state) => state.application.language);

  const [loading, setLoading] = useState(true);

  // Initialize locale state as null
  const [locale, setLocale] = useState(null);

  // useEffect hook to fetch fonts and images, then update loading state
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([loadFonts(FontsConfig), loadImages(ImageConfig)]);
      } catch (error) {
        console.error("Error while preparing:", error);
      } finally {
        setLoading(false);
        setAppIsReady(true);
      }
    };

    fetchData();
  }, []);

  // Update locale whenever language changes
  useEffect(() => {
    setLocale(language === "ar" ? arEG : frFR);
  }, [language]);

  if (!appIsReady) {
    return <Loader isLoading={loading} />;
  }

  return (
    <ConfigProvider
      locale={locale}
      theme={{
        components: {
          Button: { defaultHoverColor: "var(--color-secondary)" },
          Carousel: {
            colorBgContainer: "var(--color-primary)",
          },
        },
      }}
    >
      <div className={style.wrapper}>
        <header className={style.bgHeader}>
          <Navbar />
        </header>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={`/${language}/web/guest/acceuil`} />}
          />
          <Route
            path={`/${language}/web/guest/acceuil`}
            element={<HomePage language={language} />}
          />
          <Route
            path={`/${language}/web/guest/traditional`}
            element={
              <TraditionalFoodPage
                language={language}
                highDefinitionImgUrl={Traditional}
              />
            }
          />
        </Routes>
        <BackTop visibilityHeight={0} />
        <Footer />
      </div>
    </ConfigProvider>
  );
}

export default App;
