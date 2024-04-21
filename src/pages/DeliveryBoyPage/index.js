import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Breadcrumb, Divider, List, ConfigProvider, Result } from "antd";
import useFontFamily from "../../utils/useFontFamily";

import BreadCrumb from "../../components/BreadCrumb";
import BreadCrumbContent from "../../components/BreadCrumbContent";
import LeafletMap from "../../components/LeafletMap";

const DeliveryBoyPage = ({
  fixedHeight,
  backgroundImageUrl,
  highDefinitionImgUrl,
}) => {
  const language = useSelector((state) => state.application.language);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const { t, i18n } = useTranslation();
  const fontFamilyBold = useFontFamily(i18n.language, "bold");
  const fontFamilyLight = useFontFamily(i18n.language, "normal");

  const dynamicWidth = useSelector((state) => state.application.dynamicWidth);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState(backgroundImageUrl);

  useEffect(() => {
    if (!imageLoaded) {
      const highDefinitionImageUrl = highDefinitionImgUrl;
      const img = new Image();
      img.src = highDefinitionImageUrl;
      img.onload = () => {
        setImageUrl(highDefinitionImageUrl);
        setImageLoaded(true);
      };
    }
  }, [imageLoaded, highDefinitionImgUrl]);

  const data = [
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
  ];
  const containerStyles = {
    backgroundPosition: "right",
    backgroundSize: "cover",
    borderBottom: "0px",
    width: dynamicWidth,
    height: fixedHeight || "auto",
    position: "relative",
    minHeight: "75vh",
    margin: "0 auto",
    borderRadius: "80px",
  };
  const containerStyles2 = {
    backgroundPosition: "right",
    backgroundSize: "cover",
    borderBottom: "0px",
    width: dynamicWidth,
    height: fixedHeight || "auto",
    position: "relative",
    minHeight: "75vh",
    margin: "0 auto",
    borderRadius: "80px",
  };
  return (
    <>
      <BreadCrumb language={language}>
        <BreadCrumbContent />
      </BreadCrumb>
      {isLoggedIn ? (
        <div className={`flex flex-col`} style={containerStyles}>
          <Breadcrumb
            style={{
              fontSize: "var(--font-tiny-size)",
              fontWeight: "700",
              direction: language === "ar" ? "rtl" : "ltr",
            }}
            items={[
              {
                title: (
                  <h1 style={{ fontFamily: fontFamilyLight }}>
                    {t("Casablanca")}
                  </h1>
                ),
              },

              {
                title: (
                  <h1 style={{ fontFamily: fontFamilyLight }}>
                    {t("YOKO Delivery")}
                  </h1>
                ),
              },
            ]}
          />
          <div
            className="w-full h-full flex flex-grow justify-center items-center flex-col"
            style={{ borderRadius: "60px" }}
          >
            <div
              style={{
                position: "absolute",
                display: "flex",
                fontSize: "30px",
                zIndex: 99999,
                top: "1rem",
                flexDirection: "column",
                height: "max-content",
                alignItems: "center",
                fontFamily:
                  language === "ar" ? fontFamilyLight : "Neue_Power-fr",
              }}
            >
              <h1>{t("Bienvenue au service de livraison")}</h1>
              <div style={{ width: "96px" }}>
                <Divider
                  style={{
                    padding: 0,
                    height: "5px",
                    backgroundColor: "var(--color-primary)",
                  }}
                />
              </div>
            </div>

            <div className="flex-grow" style={{ width: "100%" }}>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "var(--color-primary)",
                  },
                  components: {
                    List: {
                      margin: 40,
                      itemPadding: 40,
                    },
                  },
                }}
              >
                <LeafletMap></LeafletMap>
              </ConfigProvider>
            </div>
          </div>
        </div>
      ) : (
        <div className={`flex flex-col`} style={containerStyles2}>
          <Breadcrumb
            style={{
              fontSize: "var(--font-tiny-size)",
              fontWeight: "700",
              direction: language === "ar" ? "rtl" : "ltr",
            }}
            items={[
              {
                title: (
                  <h1 style={{ fontFamily: fontFamilyLight }}>
                    {t("Casablanca")}
                  </h1>
                ),
              },

              {
                title: (
                  <h1 style={{ fontFamily: fontFamilyLight }}>
                    {t("YOKO Delivery")}
                  </h1>
                ),
              },
            ]}
          />
          <div
            className="w-full h-full flex flex-grow justify-center items-center flex-col"
            style={{ borderRadius: "60px" }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "30px",
                flexDirection: "column",
                height: "max-content",
                alignItems: "center",
                fontFamily:
                  language === "ar" ? fontFamilyLight : "Neue_Power-fr",
              }}
            >
              <h1>{t("Bienvenue au service de livraison")}</h1>
              <div style={{ width: "96px" }}>
                <Divider
                  style={{
                    padding: 0,
                    height: "5px",
                    backgroundColor: "var(--color-primary)",
                  }}
                />
              </div>
            </div>

            <div
              className="flex-grow"
              style={{ width: "inherit", padding: "5vw" }}
            >
              <Result
                status="403"
                title={
                  <p style={{ fontFamily: fontFamilyLight }}>
                    {t("please signIn")}
                  </p>
                }
                subTitle={
                  <p style={{ fontFamily: fontFamilyLight }}>{t("403_MSG")}</p>
                }
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeliveryBoyPage;
