import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { Card, Divider } from "antd";

import useFontFamily from "../../utils/useFontFamily";

import {
  ProductOutlined,
  TruckOutlined,
  ContactsOutlined,
  StockOutlined,
} from "@ant-design/icons";

import BreadCrumb from "../../components/BreadCrumb";
import TruncatedText from "../../components/TruncatedText";
import ContactInfo from "../../components/ContactInfo";
import DeliveryBoy from "../../components/DeliveryBoy";
import ProductManager from "../../components/ProductManager";
import OrdersView from "../../components/OrdersView";
import AnimatesIcon from "../../components/AnimatesIcon";
import CenteredContainer from "../../components/CenteredContainer";
const MAX_LENGTH = 100;
const DashboardPage = ({ language }) => {
  const { t, i18n } = useTranslation();
  const { preferences } = useSelector((state) => state.auth.userInfo);

  const fontFamilyBold = useFontFamily(i18n.language, "bold");
  const fontFamilyLight = useFontFamily(i18n.language, "normal");
  const dynamicWidth = useSelector((state) => state.application.dynamicWidth);
  useEffect(() => {}, []);
  const containerStyles = {
    width: dynamicWidth,
    margin: "0 auto",
  };
  return (
    <>
      <BreadCrumb language={language}>
        <h1
          style={{
            fontSize: "2rem",
            color: "var(--color-accent)",
            fontWeight: 700,
            fontFamily: fontFamilyBold,
          }}
        >
          <span
            style={{
              color: "var(--color-primary)",
            }}
          >
            {t("YOKO")}
          </span>
          &nbsp;{t("Dashboard")}
        </h1>
      </BreadCrumb>
      <div className={`flex flex-col`} style={containerStyles}>
        <div className="w-full h-full flex flex-grow justify-center items-center flex-col">
          <div
            style={{
              display: "flex",
              fontSize: "30px",
              flexDirection: "column",
              height: "max-content",
              alignItems: "center",
              fontFamily: fontFamilyLight,
            }}
          >
            <h1
              style={{
                fontSize: "2.5rem",
                fontFamily: fontFamilyBold,
                textAlign: "center",
              }}
            >
              {t("Commencez avec une Action Rapide")}
            </h1>
            <p
              style={{
                fontSize: "var(--font-medium-size)",
                fontFamily: fontFamilyLight,
              }}
            >
              {t("discoverSelection")}
            </p>
            <CustomDivider width={"6rem"} height={"10px"} />
            <div
              className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 items-center mt-5 gap-5"
              style={{ margin: "0 auto" }}
            >
              {[1, 2, 3, 4].map((id) => (
                <Card
                  title={getTitle(id, t)}
                  bordered
                  key={id}
                  className="shadow-lg"
                >
                  {getDescription(id, t, preferences, fontFamilyBold)}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;

//thick CustomDivider
export const CustomDivider = ({ width, height }) => {
  return (
    <div style={{ width: width }}>
      <Divider
        className="p-0 "
        style={{
          backgroundColor: "var(--color-primary)",
          height: height,
        }}
      />
    </div>
  );
};
export const getTitle = (id, t) => {
  switch (id) {
    case 1:
      return (
        <div className="flex">
          &nbsp; &nbsp;
          <AnimatesIcon icon={<ProductOutlined />} />
          &nbsp;{t("ProduitsYOKO")}
        </div>
      );
    case 2:
      return (
        <div className="flex">
          &nbsp; &nbsp;
          <AnimatesIcon icon={<TruckOutlined />} /> &nbsp;{t("LivraisonsYOKO")}
        </div>
      );
    case 3:
      return (
        <div className="flex">
          &nbsp; &nbsp;
          <AnimatesIcon icon={<ContactsOutlined />} /> &nbsp;{t("ContactYOKO")}
        </div>
      );
    case 4:
      return (
        <div className="flex">
          &nbsp; &nbsp;
          <AnimatesIcon icon={<StockOutlined />} /> &nbsp;{t("CommandesYOKO")}
        </div>
      );
    default:
      return "";
  }
};
const getDescription = (id, t, preferences, font) => {
  switch (id) {
    case 1:
      return (
        <TruncatedText
          skip={preferences?.hideModalForProductYoko}
          title={t("Espace produit")}
          text={t("product_manager")}
          maxLength={MAX_LENGTH}
          children={<ProductManager />}
        />
      );
    case 2:
      return (
        <TruncatedText
          skip={preferences?.hideModalForDeliveriesYoko}
          maxLength={MAX_LENGTH}
          title={
            <CenteredContainer
              style={{
                justifyContent: "left",
                gap: "1rem",
                textTransform: "uppercase",
              }}
            >
              <AnimatesIcon icon={<TruckOutlined />} />
              <h1 style={{ fontFamily: font }}>{t("Espace livreur")}</h1>
            </CenteredContainer>
          }
          text={t("deliveryboy")}
          children={<DeliveryBoy />}
        />
      );
    case 3:
      return (
        <TruncatedText
          skip={preferences?.hideModalForContactInfoYoko}
          title={<h1 style={{ fontFamily: font }}>{t("contact_info")}</h1>}
          text={t("contact_info")}
          maxLength={MAX_LENGTH}
          children={<ContactInfo />}
        />
      );
    case 4:
      return (
        <TruncatedText
          skip={preferences?.hideModalForOrdersYoko}
          title={"Commandes"}
          text={t("orders_view")}
          maxLength={MAX_LENGTH}
          children={<OrdersView />}
        />
      );

    default:
      return "";
  }
};