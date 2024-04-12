import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { Card, Divider, Button } from "antd";
import axios from "axios";
import useFontFamily from "../../utils/useFontFamily";

import {
  ProductOutlined,
  TruckOutlined,
  ContactsOutlined,
  StockOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";

import BreadCrumb from "../../components/BreadCrumb";
import TruncatedText from "../../components/TruncatedText";
import ContactInfo from "../../components/ContactInfo";
import DeliveryBoy from "../../components/DeliveryBoy";
import ProductManager from "../../components/ProductManager";
import OrdersView from "../../components/OrdersView";
import AnimatesIcon from "../../components/AnimatesIcon";
import CenteredContainer from "../../components/CenteredContainer";
import useDirection from "../../utils/useDirection";
import { setCredentials } from "../../reducers/authService/authSlice";

const MAX_LENGTH = 100;
const DashboardPage = () => {
  const { t, i18n } = useTranslation();
  const { preferences } = useSelector((state) => state.auth.userInfo);
  const language = useSelector((state) => state.application.language);
  const accessToken = useSelector((state) => state.auth.userToken);
  const d = useDispatch();
  const direction = useDirection(i18n.language);

  const fontFamilyBold = useFontFamily(i18n.language, "bold");
  const fontFamilyLight = useFontFamily(i18n.language, "normal");

  return (
    <>
      <BreadCrumb>
        <h1
          style={{
            fontSize: "2rem",
            color: "var(--color-accent)",
            fontWeight: 700,
            fontFamily: fontFamilyBold,
            display: "flex",
            flexDirection: language === "ar" ? "row-reverse" : "row",
            gap: ".5rem",
          }}
        >
          <span
            style={{
              color: "var(--color-primary)",
            }}
          >
            {t("YOKO")}
          </span>
          <span>{t("Dashboard")}</span>
        </h1>
      </BreadCrumb>

      <section className={`w-full mt-20 mb-20`}>
        <div>
          <CenteredContainer>
            <div style={{ maxWidth: "62.5rem" }}>
              <div className="w-full h-full flex flex-grow justify-center items-center flex-col">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h1
                    style={{
                      fontSize: "2.5rem",
                      fontFamily: fontFamilyBold,
                      textAlign: "center",
                      maxWidth: "500px",
                    }}
                  >
                    {t("Commencez avec une Action Rapide")}
                  </h1>
                  <p
                    style={{
                      fontSize: "var(--font-medium-size)",
                      fontFamily: fontFamilyLight,
                      textAlign: "center",
                    }}
                  >
                    {t("discoverSelection")}
                  </p>
                  <CustomDivider width={"6rem"} height={"5px"} />
                  <div
                    className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 items-center mt-5 gap-5"
                    style={{ margin: "0 auto" }}
                  >
                    {[1, 2, 3, 4].map((id) => (
                      <Card
                        title={getTitle(id, t, fontFamilyLight)}
                        dir={direction}
                        bordered
                        key={id}
                        className="shadow-lg"
                      >
                        {getDescription(
                          id,
                          t,
                          preferences,
                          fontFamilyBold,
                          accessToken,
                          d
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CenteredContainer>
        </div>
      </section>
    </>
  );
};

export default DashboardPage;

export const CustomDivider = ({ width, height }) => {
  return (
    <div style={{ width: width }}>
      <Divider
        className="p-0 "
        style={{
          backgroundColor: "var(--color-primary)",
          height: height,
          borderRadius: "50px",
        }}
      />
    </div>
  );
};
export const getTitle = (id, t, font) => {
  switch (id) {
    case 1:
      return (
        <div className="flex" style={{ fontFamily: font }}>
          &nbsp; &nbsp;
          <AnimatesIcon icon={<ProductOutlined />} />
          &nbsp;{t("ProduitsYOKO")}
        </div>
      );
    case 2:
      return (
        <div className="flex" style={{ fontFamily: font }}>
          &nbsp; &nbsp;
          <AnimatesIcon icon={<TruckOutlined />} /> &nbsp;{t("LivraisonsYOKO")}
        </div>
      );
    case 3:
      return (
        <div className="flex" style={{ fontFamily: font }}>
          &nbsp; &nbsp;
          <AnimatesIcon icon={<ContactsOutlined />} /> &nbsp;{t("ContactYOKO")}
        </div>
      );
    case 4:
      return (
        <div className="flex" style={{ fontFamily: font }}>
          &nbsp; &nbsp;
          <AnimatesIcon icon={<StockOutlined />} /> &nbsp;{t("CommandesYOKO")}
        </div>
      );
    default:
      return "";
  }
};
const getDescription = (id, t, preferences, font, token, d) => {
  switch (id) {
    case 1:
      return (
        <TruncatedText
          onChangeCheckBoxHandler={(e) =>
            onChangeCheckBoxHandler(e, token, 2, d)
          }
          skip={preferences?.hideModalForProductYoko}
          title={
            <CenteredContainer
              style={{
                justifyContent: "space-between",
                textTransform: "uppercase",
              }}
            >
              <CenteredContainer
                style={{
                  justifyContent: "left",
                  gap: "1rem",
                  textTransform: "uppercase",
                }}
              >
                <AnimatesIcon icon={<ProductOutlined />} />
                <h1 style={{ fontFamily: font }}>{t("Espace produit")}</h1>
              </CenteredContainer>

              <div>
                <Button icon={<PaperClipOutlined />}></Button>
              </div>
            </CenteredContainer>
          }
          text={t("product_manager")}
          maxLength={MAX_LENGTH}
          children={<ProductManager />}
        />
      );
    case 2:
      return (
        <TruncatedText
          onChangeCheckBoxHandler={(e) =>
            onChangeCheckBoxHandler(e, token, 1, d)
          }
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
const onChangeCheckBoxHandler = (e, token, target, d) => {
  let myTarget;
  switch (target) {
    case 1:
      myTarget = "updateVisibilityModalReadMoreDeliveryBoy";
      break;
    case 2:
      myTarget = "updateVisibilityModalReadMoreProducts";
      break;
    default:
      break;
  }
  let data = JSON.stringify({
    hidden: e,
  });

  let config = {
    method: "put",
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_BASE_API_URI_DEV}api/auth/preferences/${myTarget}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      localStorage.setItem("userData", JSON.stringify(response.data.data));
      d(setCredentials(response?.data.data));
    })
    .catch((error) => {
      console.log(error);
    });
};
