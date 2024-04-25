// routes.js
import React, { lazy } from "react";
import CustomSuspense from "./components/CustomSuspense";
import { ROLE } from "./utils/roles";
import { Navigate } from "react-router-dom";

//__lazy_loaded_components
const HomePage = lazy(() => import("./pages/HomePage"));
const TraditionalFoodPage = lazy(() => import("./pages/TraditionalFoodPage"));
const DeliveryBoyPage = lazy(() => import("./pages/DeliveryBoyPage"));
const YOKOEatPage = lazy(() => import("./pages/YOKOEatPage"));
const MarketPage = lazy(() => import("./pages/MarketPage"));
const AtterrissagePage = lazy(() => import("./pages/AtterrissagePage"));

//________FruitsPage
const MarketPageFruits = lazy(() => import("./pages/MarketPageFruits"));

//________VegyPage
const MarketPageVegetablesHerbs = lazy(() =>
  import("./pages/MarketPageVegetables&Herbs")
);

const CartPage = lazy(() => import("./pages/CartPage"));

//__Authentication_components
const LoginPage = lazy(() => import("./pages/LoginPage"));
const AdminLoginPage = lazy(() => import("./pages/AdminLoginPage"));

//__Admin_component
const DashboardPage = lazy(() => import("./pages/DashboardPage"));

//__404_page
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const isAdminAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem("userData"));
  return user && user.role === ROLE.admin;
};

export const routes = [
  {
    path: "/",
    element: (
      <CustomSuspense>
        <AtterrissagePage />
      </CustomSuspense>
    ),
  },
  //__atterissageRoute
  {
    path: "/web/guest/pageAtterrissage",
    element: (
      <CustomSuspense>
        <AtterrissagePage />
      </CustomSuspense>
    ),
  },
  //__homeRoute
  {
    path: "/web/guest/acceuil",
    element: (
      <CustomSuspense>
        <HomePage />
      </CustomSuspense>
    ),
  },
  //__traditionalRoute
  {
    path: "/web/guest/traditional",
    element: (
      <CustomSuspense>
        <TraditionalFoodPage />
      </CustomSuspense>
    ),
  },
  //__yokoEatRoute
  {
    path: "/web/guest/eat",
    element: <YOKOEatPage />,
  },
  //__yokoCartRoute
  {
    path: "/web/guest/cart",
    element: <CartPage />,
  },
  //__deliveryRoute
  {
    path: "/web/guest/delivery",
    element: (
      <CustomSuspense>
        <DeliveryBoyPage />
      </CustomSuspense>
    ),
  },
  //__marketRoute
  {
    path: "/web/guest/market",
    element: (
      <CustomSuspense>
        <MarketPage />
      </CustomSuspense>
    ),
  },
  //__marketRoute__fruits
  {
    path: "/web/guest/market/Fruits",
    element: (
      <CustomSuspense>
        <MarketPageFruits />
      </CustomSuspense>
    ),
  },
  //__marketRoute__vegetables&Herbs
  {
    path: "/web/guest/market/Vegetables&Herbs",
    element: (
      <CustomSuspense>
        <MarketPageVegetablesHerbs />
      </CustomSuspense>
    ),
  },
  // TODO: //AUTHENTICATION ROUTES

  //__loginRoute
  {
    path: "/yoko/account/log-in",
    element: (
      <CustomSuspense>
        <LoginPage />
      </CustomSuspense>
    ),
  },
  //__loginAdminRoute
  {
    path: "/yoko/account/log-in-admin",
    element: (
      <CustomSuspense>
        <AdminLoginPage />
      </CustomSuspense>
    ),
  },

  // TODO: //ADMIN DASHBOARD ROUTE
  {
    path: "/yoko/account/dashboard",
    element: isAdminAuthenticated() ? (
      <CustomSuspense>
        <DashboardPage />
      </CustomSuspense>
    ) : (
      <Navigate to="/" replace />
    ),
  },
  // TODO: //404 ROUTE
  {
    path: "*",
    element: (
      <CustomSuspense>
        <NotFoundPage />
      </CustomSuspense>
    ),
  },
];
