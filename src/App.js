import React, { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ConfigProvider, Spin, FloatButton, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence

import frFR from "antd/lib/locale/fr_FR";
import arEG from "antd/lib/locale/ar_EG";

import { loadFonts, loadImages } from "./services/functions/functions";
import {
  ImageConfigsDelivery,
  ImageConfigsGeneral,
  ImageConfigsHome,
  ImageConfigsLogin,
} from "./config.dev";

import { FontsConfig } from "./fontsConfig";
import axios from "axios";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import Footer from "./components/Footer";

import { fetchContactInfo } from "./actions/contactActions";
import { Rue_high, Rue_low } from "./images";
import LoginPage from "./pages/LoginPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import {
  setDrawerOpenCart,
  setDrawerOpenSettings,
} from "./reducers/applicationService/applicationSlice";
import DashboardPage from "./pages/DashboardPage";
import SettingsAdminDrawer from "./components/SettingsAdminDrawer";

import style from "./App.module.css";
import { ROLE } from "./utils/roles";
import CartDrawer from "./components/CartDrawer";
import { setCart } from "./reducers/applicationService/marketPlace/marketPlaceSlice";

const HomePage = lazy(() => import("./pages/HomePage"));
const MarketPage = lazy(() => import("./pages/MarketPage"));
const MarketPageBeauty = lazy(() => import("./pages/MarketPageBeauty"));
const MarketPageKitchen = lazy(() => import("./pages/MarketPageKitchen"));
const CartPage = lazy(() => import("./pages/CartPage"));

const TraditionalFoodPage = lazy(() => import("./pages/TraditionalFoodPage"));
const YOKOEatPage = lazy(() => import("./pages/YOKOEatPage"));
const DeliveryBoyPage = lazy(() => import("./pages/DeliveryBoyPage"));

const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const d = useDispatch();
  const user = useSelector((state) => state.auth?.userInfo);

  const language = useSelector((state) => state.application.language);
  const isLoggedIn = useSelector((state) => state.application.isLoggedIn);
  const openSettings = useSelector(
    (state) => state.application.drawerOpenSettings
  );
  const openCart = useSelector((state) => state.application.drawerOpenCart);
  const [loading, setLoading] = useState(true);
  const [locale, setLocale] = useState(null);

  const onClose = () => {
    d(setDrawerOpenSettings(false));
  };
  const onCloseCart = () => {
    d(setDrawerOpenCart(false));
  };
  const retreiveCart = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URI_DEV}api/application/cart/${user?.id}`
      );
      if (response.status === 200) {
        console.log("888888", response?.data?.items);
        d(setCart(response?.data?.items));
      } else {
        // Handle unexpected response status
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          message.success("Produit non  ajouté au panier");
        } else if (error.response.status === 429) {
          // Handle too many requests
        } else {
          // Handle other server errors
        }
      } else if (error.request) {
        // Handle server unreachable
      } else {
        // Handle other errors
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          loadFonts(FontsConfig),
          loadImages(ImageConfigsGeneral),
        ]);
        switch (location.pathname) {
          case "/":
            await Promise.all([loadImages(ImageConfigsHome)]);
            break;
          case "/web/guest/acceuil":
            await Promise.all([loadImages(ImageConfigsHome)]);
            break;
          case "/web/guest/delivery":
            if (!isLoggedIn)
              await Promise.all([loadImages(ImageConfigsDelivery)]);
            break;
          case "/yoko/account/log-in":
            if (!isLoggedIn) await Promise.all([loadImages(ImageConfigsLogin)]);
            break;

          default:
            break;
        }
      } catch (error) {
        console.error("Error while preparing:", error);
      } finally {
        setLoading(false);
        setAppIsReady(true);
      }
    };

    fetchData();
  }, [isLoggedIn, location.pathname]);

  useEffect(() => {
    setLocale(language === "ar" ? arEG : frFR);
  }, [language]);

  //CONTACT_API
  const dispatchFetchContactInfo = useCallback(() => {
    d(fetchContactInfo());
    retreiveCart();
  }, [d]);

  useEffect(() => {
    dispatchFetchContactInfo();
  }, [dispatchFetchContactInfo]);

  if (!appIsReady) {
    return <Loader isLoading={loading} />;
  }

  return (
    <ConfigProvider
      locale={locale}
      theme={{
        components: {
          Button: { defaultHoverColor: "#1d3034" },
          Carousel: {
            colorBgContainer: "#65b44a",
          },
        },
      }}
    >
      <div className={style.wrapper}>
        <header className={style.bgHeader}>
          <Navbar />
        </header>
        <AnimatePresence mode="wait">
          {" "}
          {/* Add AnimatePresence */}
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
                  <motion.div
                    initial={{ opacity: 0 }} // Initial animation state
                    animate={{ opacity: 1 }} // Animation when component enters
                    exit={{ opacity: 0 }} // Animation when component exits
                    key="homepage" // Add a unique key
                  >
                    <HomePage language={language} />
                  </motion.div>{" "}
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
            />
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
            />{" "}
            <Route
              path={`/web/guest/cart`}
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
                  <CartPage language={language} />
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
                >
                  {" "}
                  <motion.div
                    initial={{ opacity: 0 }} // Initial animation state
                    animate={{ opacity: 1, transition: { delay: 0.5 } }} // Animation when component enters
                    exit={{ opacity: 0 }} // Animation when component exits
                    key="homepage" // Add a unique key
                  >
                    <MarketPage />
                  </motion.div>
                </Suspense>
              }
            />
            <Route
              path={`/web/guest/market/beauty`}
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
                  {" "}
                  <motion.div
                    initial={{ opacity: 0 }} // Initial animation state
                    animate={{ opacity: 1, transition: { delay: 0.5 } }} // Animation when component enters
                    exit={{ opacity: 0 }} // Animation when component exits
                    key="beauty" // Add a unique key
                  >
                    <MarketPageBeauty />
                  </motion.div>
                </Suspense>
              }
            />{" "}
            <Route
              path={`/web/guest/market/Kitchen`}
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
                  {" "}
                  <motion.div
                    initial={{ opacity: 0 }} // Initial animation state
                    animate={{ opacity: 1, transition: { delay: 0.5 } }} // Animation when component enters
                    exit={{ opacity: 0 }} // Animation when component exits
                    key="Kitchen" // Add a unique key
                  >
                    <MarketPageKitchen />
                  </motion.div>
                </Suspense>
              }
            />
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
                )
              }
            />
            <Route
              path="*"
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
                  <NotFoundPage />
                </Suspense>
              }
            />
          </Routes>{" "}
        </AnimatePresence>

        <FloatButton.BackTop visibilityHeight={0} style={{ bottom: "100px" }} />
        {<Footer language={language} />}
        <SettingsAdminDrawer
          openSettings={openSettings}
          onClose={onClose}
          t={t}
        />
        <CartDrawer openCart={openCart} onCloseCart={onCloseCart} t={t} />
      </div>
    </ConfigProvider>
  );
}

export default App;

const isAdminAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem("userData"));
  return user && user.role === ROLE.admin;
};
