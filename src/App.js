import React, { useCallback, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { ConfigProvider, FloatButton, message } from "antd";

//__framer_motion
import { AnimatePresence } from "framer-motion";

import { loadFonts, loadImages } from "./services/functions/functions";
// Import your route configurations
import { routes } from "./routes";
import {
  ImageConfigsAtterrissage,
  ImageConfigsDelivery,
  ImageConfigsHome,
  ImageConfigsLogin,
} from "./config.dev";

import { FontsConfig } from "./fontsConfig";

//__components_static
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import Footer from "./components/Footer";

import axios from "axios";
import { fetchContactInfo } from "./actions/contactActions";
import {
  setDrawerOpenCart,
  setDrawerOpenSettings,
} from "./reducers/applicationService/applicationSlice";
import SettingsAdminDrawer from "./components/SettingsAdminDrawer";

import style from "./App.module.css";

import { ROLE } from "./utils/roles";
import CartDrawer from "./components/CartDrawer";
import { setCart } from "./reducers/applicationService/marketPlace/marketPlaceSlice";

//__languages
import frFR from "antd/lib/locale/fr_FR";
import arEG from "antd/lib/locale/ar_EG";

function App() {
  const location = useLocation();
  const { t } = useTranslation();
  const d = useDispatch();

  const [appIsReady, setAppIsReady] = useState(false);
  const user = useSelector((state) => state.auth?.userInfo);

  //App_lang_global_state
  const language = useSelector((state) => state.application.language);

  //Is_log_In_global_state
  const isLoggedIn = useSelector((state) => state.application.isLoggedIn);

  //open_Card_global_state
  const openCart = useSelector((state) => state.application.drawerOpenCart);

  const openSettings = useSelector(
    (state) => state.application.drawerOpenSettings
  );

  //__loading
  const [loading, setLoading] = useState(true);

  //__language_Local
  const [locale, setLocale] = useState(null);

  //__settings_drawer
  const onClose = () => d(setDrawerOpenSettings(false));

  //__cart_drawer
  const onCloseCart = () => d(setDrawerOpenCart(false));

  useEffect(() => {
    setLocale(language === "ar" ? arEG : frFR);
  }, [language]);

  //Api
  const retreiveCart = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URI_DEV}api/application/cart/${user?.id}`
      );
      if (response.status === 200) {
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
        await Promise.all([loadFonts(FontsConfig)]);
        switch (location.pathname) {
          //ok
          case "/":
            await Promise.all([loadImages(ImageConfigsAtterrissage)]);
            break;
          case "web/guest/pageAtterrissage":
            await Promise.all([loadImages(ImageConfigsAtterrissage)]);
            //ok
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
    console.log("fuck");
  }, [isLoggedIn, location.pathname]);

  //CONTACT_API
  /*
  const dispatchFetchContactInfo = useCallback(() => {
    d(fetchContactInfo());
    retreiveCart();
  }, [d]);

  useEffect(() => {
    dispatchFetchContactInfo();
  }, [dispatchFetchContactInfo]);
*/
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

        {/**__content */}
        <AnimatePresence mode="wait">
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} {...route} />
            ))}
          </Routes>
        </AnimatePresence>
        {/**__content */}

        <FloatButton.BackTop visibilityHeight={0} style={{ bottom: "100px" }} />
        <Footer />
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
