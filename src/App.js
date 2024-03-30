//__REACT
import React, { Suspense, lazy, useCallback, useEffect, useState } from "react";

//__REACT-DOM
import { Navigate, Route, Routes } from "react-router-dom";

//__REACT_REDUX
import { useDispatch, useSelector } from "react-redux";

//__ANTD
import { ConfigProvider, BackTop, Spin } from "antd";
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
import { LoadingOutlined } from "@ant-design/icons";
import { fetchContactInfo } from "./actions/contactActions";

const HomePage = lazy(() => import("./pages/HomePage"));
const TraditionalFoodPage = lazy(() => import("./pages/TraditionalFoodPage"));
const YOKOEatPage = lazy(() => import("./pages/YOKOEatPage"));

// Lazily load the component responsible for starting the simulation modal

function App() {
  // Initializing state for tracking the loading status of necessary assets
  const [appIsReady, setAppIsReady] = useState(false);
  const d = useDispatch();
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
  // useEffect hook to fetch contact info only once on component mount

  const dispatchFetchContactInfo = useCallback(() => {
    d(fetchContactInfo());
  }, [d]);

  useEffect(() => {
    dispatchFetchContactInfo();
  }, [dispatchFetchContactInfo]);
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
            element={
              <Suspense
                fallback={
                  <Spin
                    spinning
                    fullscreen
                    indicator={
                      <LoadingOutlined style={{ fontSize: 24 }} spin />
                    }
                  />
                }
              >
                <HomePage language={language} />
              </Suspense>
            }
          />
          <Route
            path={`/${language}/web/guest/traditional`}
            element={
              <Suspense
                fallback={
                  <Spin
                    spinning
                    fullscreen
                    indicator={
                      <LoadingOutlined style={{ fontSize: 24 }} spin />
                    }
                  />
                }
              >
                <TraditionalFoodPage language={language} />
              </Suspense>
            }
          />{" "}
          <Route
            path={`/${language}/web/guest/eat`}
            element={
              <Suspense
                fallback={
                  <Spin
                    spinning
                    fullscreen
                    indicator={
                      <LoadingOutlined style={{ fontSize: 24 }} spin />
                    }
                  />
                }
              >
                <YOKOEatPage language={language} />
              </Suspense>
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
