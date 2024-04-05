//__REACT
import React, { useEffect, useMemo, useState } from "react";

//__REDUX
import { useSelector } from "react-redux";

//__USE_TRANSLATION
import { useTranslation } from "react-i18next";

//__ANTD
import {
  Breadcrumb,
  Divider,
  Avatar,
  List,
  Radio,
  Space,
  ConfigProvider,
} from "antd";

//__CUSTOM_COMPONENTS
import BreadCrumb from "../../components/BreadCrumb";
import ComingSoon from "../../components/ComingSoon";

//__ONLY USED TO CALCULATE MAX-WIDTH: This line of code is specifically employed to compute the maximum width of the element. It does not directly contribute to the functionality of the component but aids in determining the appropriate maximum width based on the content and layout requirements.
import OurPartners from "../../components/OurPartners";

import { YOKO_EAT, YOKO_EAT_low, YOKO_Rest, YOKO_Rest_low } from "../../images";
import EatCard from "../../components/EatCard";
import useResponsiveState from "../../utils/useResponsiveState";

const DeliveryBoyPage = ({
  language,
  fixedHeight,
  backgroundImageUrl,
  highDefinitionImgUrl,
  font,
}) => {
  //__HOOKS
  const { t } = useTranslation();

  const dynamicWidth = useSelector((state) => state.application.dynamicWidth);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState(backgroundImageUrl); // Set your initial lightweight image URL here

  //__TODO:
  // RESPONSIVENESS HOOK: This hook is responsible for managing responsiveness within the component, ensuring that the component adapts appropriately to different screen sizes and device orientations.
  const primaryBoldFont = useMemo(() => `Primary-Bold-${language}`, [language]);
  useEffect(() => {
    if (!imageLoaded) {
      // Load your high definition image here
      const highDefinitionImageUrl = highDefinitionImgUrl; // Set your high definition image URL here
      const img = new Image();
      img.src = highDefinitionImageUrl;

      // Inside the image onload event handler
      img.onload = () => {
        // Clear any existing timeout
        clearTimeout(timeoutId);

        // Update the state with the high definition image URL
        setImageUrl(highDefinitionImageUrl);
        setImageLoaded(true);
      };

      // Set a timeout to handle slow network conditions
      const timeoutId = setTimeout(() => {
        // Fallback to default image or display placeholder
        setImageUrl(null); // Set your default image URL here
        setImageLoaded(true);
      }, 5000); // Set the timeout duration (in milliseconds) as needed
    }
  }, [imageLoaded, highDefinitionImgUrl]);
  //__TODO:
  // INTERVAL TIMER FOR TITLE ROTATION: This section of the code is responsible for alternating between displaying "fast food" and "restaurant" every 3000ms (3 seconds). It manages the timer interval to switch between the two titles at the specified interval.
  const primaryRegularFont = useMemo(
    () => `Primary-regular-${language}`,
    [language]
  );
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
    backgroundImage: `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(${imageUrl})`,
    minHeight: "75vh",
    margin: "0 auto",
    borderRadius: "80px",
  };
  return (
    <>
      <BreadCrumb language={language}>
        <h1
          style={{
            fontSize: "2rem",
            color: "var(--color-accent)",
            fontWeight: 700,
            fontFamily: primaryBoldFont,
          }}
        >
          <span
            style={{
              color: "var(--color-primary)",
            }}
          >
            {t("YOKO")}
          </span>
          &nbsp;{t("livreur")}
        </h1>
      </BreadCrumb>

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
                <h1 style={{ fontFamily: primaryRegularFont }}>
                  {t("Casablanca")}
                </h1>
              ),
            },

            {
              title: (
                <h1 style={{ fontFamily: primaryRegularFont }}>
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
                language === "ar" ? primaryRegularFont : "Neue_Power-fr",
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
              <List
                size={"small"}
                bordered
                pagination={{
                  position: "bottom",
                  align: "center",
                }}
                dataSource={data}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          size={"large"}
                          src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                        />
                      }
                      title={<a href="https://ant.design">{item.title}</a>}
                      description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                  </List.Item>
                )}
              />
            </ConfigProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryBoyPage;
