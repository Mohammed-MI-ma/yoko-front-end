//__REACT
import React, { Suspense, lazy, useCallback, useEffect, useState } from "react";

//__REACT-DOM
import { Navigate, Route, Routes } from "react-router-dom";

//__REACT_REDUX
import { useDispatch, useSelector } from "react-redux";

//__ANTD
import {
  ConfigProvider,
  BackTop,
  Spin,
  Drawer,
  Layout,
  FloatButton,
} from "antd";
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
import { Rue_high, Rue_low } from "./images";
import LoginPage from "./pages/LoginPage";
import OurPartners from "./components/OurPartners";
import AdminLoginPage from "./pages/AdminLoginPage";
import { setDrawerOpenSettings } from "./reducers/applicationService/applicationSlice";
import { useTranslation } from "react-i18next";
import DashboardPage from "./pages/DashboardPage";

const HomePage = lazy(() => import("./pages/HomePage"));
const TraditionalFoodPage = lazy(() => import("./pages/TraditionalFoodPage"));
const YOKOEatPage = lazy(() => import("./pages/YOKOEatPage"));
const DeliveryBoyPage = lazy(() => import("./pages/DeliveryBoyPage"));

// Lazily load the component responsible for starting the simulation modal
const SettingsAdminDrawer = lazy(() =>
  import("./components/SettingsAdminDrawer")
);
function App() {
  // Initializing state for tracking the loading status of necessary assets
  const [appIsReady, setAppIsReady] = useState(false);
  const d = useDispatch();
  // Retrieve the state indicating whether the Menu Drawer is open or closed
  const { t } = useTranslation();
  // Retrieve the currently selected language from the application state
  const language = useSelector((state) => state.application.language);
  const openSettings = useSelector(
    (state) => state.application.drawerOpenSettings
  );

  const [loading, setLoading] = useState(true);

  // Initialize locale state as null
  const [locale, setLocale] = useState(null);
  const onClose = () => {
    d(setDrawerOpenSettings(false));
  };
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
          <Route path="/" element={<Navigate to={`/web/guest/acceuil`} />} />
          <Route
            path={`/web/guest/acceuil`}
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
            path={`/web/guest/traditional`}
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
            path={`/web/guest/eat`}
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
          <Route
            path={`/web/guest/delivery`}
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
                <DeliveryBoyPage
                  language={language}
                  highDefinitionImgUrl={Rue_high}
                  backgroundImageUrl={Rue_low}
                />
              </Suspense>
            }
          />
          <Route
            path={`/web/guest/market`}
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
              ></Suspense>
            }
          />{" "}
          <Route
            path={`/yoko/account/log-in`}
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
                <LoginPage
                  language={language}
                  highDefinitionImgUrl={Rue_high}
                  backgroundImageUrl={Rue_low}
                />
              </Suspense>
            }
          />
          <Route
            path={`/yoko/account/log-in-admin`}
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
                <AdminLoginPage
                  language={language}
                  highDefinitionImgUrl={Rue_high}
                  backgroundImageUrl={Rue_low}
                />
              </Suspense>
            }
          />
          <Route
            path={`/yoko/account/dashboard`}
            element={
              isAdminAuthenticated() ? (
                <DashboardPage />
              ) : (
                <Navigate to="/" replace />
              ) // Redirect unauthorized users to the home page
            }
          />
        </Routes>
        <FloatButton.BackTop visibilityHeight={0} />
        <div
          style={{
            position: "absolute",
            zIndex: 0,
            top: 0,
            opacity: "0",
            transform: "scale(0.1)",
          }}
        >
          <OurPartners vierge />
        </div>
        <Footer language={language} />
        <Suspense fallback={<div>Loading...</div>}>
          {openSettings && (
            <SettingsAdminDrawer
              openSettings={openSettings}
              onClose={onClose}
              t={t}
            />
          )}
        </Suspense>
      </div>
    </ConfigProvider>
  );
}

export default App;
const isAdminAuthenticated = () => {
  // Implement your authentication logic here
  // For example, check if the user is logged in and is an admin
  const user = JSON.parse(localStorage.getItem("userData"));
  return user && user.role === "admin"; // Assuming role is stored in the user object
};
