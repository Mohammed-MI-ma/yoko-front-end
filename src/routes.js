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
      <CustomSuspense key="AtterrissagePage">
        <AtterrissagePage />
      </CustomSuspense>
    ),
  },
  //__atterissageRoute
  {
    path: "/web/guest/pageAtterrissage",
    element: (
      <CustomSuspense key="AtterrissagePage1">
        <AtterrissagePage />
      </CustomSuspense>
    ),
  },
  //__homeRoute
  {
    path: "/web/guest/acceuil",
    element: (
      <CustomSuspense key="HomePage">
        <HomePage />
      </CustomSuspense>
    ),
  },
  //__traditionalRoute
  {
    path: "/web/guest/traditional",
    element: (
      <CustomSuspense key="traditional">
        <TraditionalFoodPage />
      </CustomSuspense>
    ),
  },
  //__yokoEatRoute
  {
    path: "/web/guest/eat",
    element: (
      <CustomSuspense key="YOKOEatPage">
        <YOKOEatPage />
      </CustomSuspense>
    ),
  },
  //__yokoCartRoute
  {
    path: "/web/guest/cart",
    element: (
      <CustomSuspense key="CartPage">
        <CartPage />
      </CustomSuspense>
    ),
  },
  //__deliveryRoute
  {
    path: "/web/guest/delivery",
    element: (
      <CustomSuspense key="delivery">
        <DeliveryBoyPage />
      </CustomSuspense>
    ),
  },
  //__marketRoute
  {
    path: "/web/guest/market",
    element: (
      <CustomSuspense key="market">
        <MarketPage />
      </CustomSuspense>
    ),
  },
  //__marketRoute__fruits
  {
    path: "/web/guest/market/Fruits",
    element: (
      <CustomSuspense key="Fruits">
        <MarketPage />
      </CustomSuspense>
    ),
  },
  //__marketRoute__vegetables&Herbs
  {
    path: "/web/guest/market/Vegetables&Herbs",
    element: (
      <CustomSuspense key="Vegetables">
        <MarketPage />
      </CustomSuspense>
    ),
  },
  // TODO: //AUTHENTICATION ROUTES

  //__loginRoute
  {
    path: "/yoko/account/log-in",
    element: (
      <CustomSuspense key="log">
        <LoginPage />
      </CustomSuspense>
    ),
  },
  //__loginAdminRoute
  {
    path: "/yoko/account/log-in-admin",
    element: (
      <CustomSuspense key="admin">
        <AdminLoginPage />
      </CustomSuspense>
    ),
  },

  // TODO: //ADMIN DASHBOARD ROUTE
  {
    path: "/yoko/account/dashboard",
    element: isAdminAuthenticated() ? (
      <CustomSuspense key="dashboard">
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
      <CustomSuspense key="404">
        <NotFoundPage />
      </CustomSuspense>
    ),
  },
];
