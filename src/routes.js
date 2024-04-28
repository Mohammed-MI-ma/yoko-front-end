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

export const routes = [
  {
    path: "/",
    element: (
      <CustomSuspense id="AtterrissagePage">
        <AtterrissagePage />
      </CustomSuspense>
    ),
  },
  //__atterissageRoute
  {
    path: "/web/guest/pageAtterrissage",
    element: (
      <CustomSuspense id="AtterrissagePage1">
        <AtterrissagePage />
      </CustomSuspense>
    ),
  },
  //__homeRoute
  {
    path: "/web/guest/acceuil",
    element: (
      <CustomSuspense id="HomePage">
        <HomePage />
      </CustomSuspense>
    ),
  },
  //__traditionalRoute
  {
    path: "/web/guest/traditional",
    element: (
      <CustomSuspense id="traditional">
        <TraditionalFoodPage />
      </CustomSuspense>
    ),
  },
  //__yokoEatRoute
  {
    path: "/web/guest/eat",
    element: (
      <CustomSuspense id="YOKOEatPage">
        <YOKOEatPage />
      </CustomSuspense>
    ),
  },
  //__yokoCartRoute
  {
    path: "/web/guest/cart",
    element: (
      <CustomSuspense id="CartPage">
        <CartPage />
      </CustomSuspense>
    ),
  },
  //__deliveryRoute
  {
    path: "/web/guest/delivery",
    element: (
      <CustomSuspense id="delivery">
        <DeliveryBoyPage />
      </CustomSuspense>
    ),
  },
  //__marketRoute
  {
    path: "/web/guest/market",
    element: (
      <CustomSuspense id="market">
        <MarketPage />
      </CustomSuspense>
    ),
  },
  //__marketRoute__fruits
  {
    path: "/web/guest/market/Fruits",
    element: (
      <CustomSuspense id="Fruits">
        <MarketPage />
      </CustomSuspense>
    ),
  },
  //__marketRoute__vegetables&Herbs
  {
    path: "/web/guest/market/Vegetables&Herbs",
    element: (
      <CustomSuspense id="Vegetables">
        <MarketPage />
      </CustomSuspense>
    ),
  },
  // TODO: //AUTHENTICATION ROUTES

  //__loginRoute
  {
    path: "/yoko/account/log-in",
    element: (
      <CustomSuspense id="log">
        <LoginPage />
      </CustomSuspense>
    ),
  },
  //__loginAdminRoute
  {
    path: "/yoko/account/log-in-admin",
    element: (
      <CustomSuspense id="admin">
        <AdminLoginPage />
      </CustomSuspense>
    ),
  },

  // TODO: //ADMIN DASHBOARD ROUTE
  {
    path: "/yoko/account/dashboard",
    element: (
      <CustomSuspense id="dashboard">
        <DashboardPage />
      </CustomSuspense>
    ),
  },
  // TODO: //404 ROUTE
  {
    path: "*",
    element: (
      <CustomSuspense id="404">
        <NotFoundPage />
      </CustomSuspense>
    ),
  },
];
