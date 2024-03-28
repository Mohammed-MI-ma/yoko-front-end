import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { useTranslation } from "react-i18next";
import { Button } from "antd";

import {
  Delivery_low,
  Tagine_low,
  YOKOMarket_low,
  YokoEat_low,
} from "../../images";
import useResponsiveState from "../../utils/useResponsiveState";
import ProductCardWithDescriptionFooter from "../ProductCardWithDescriptionFooter";

const OurBestSellers = () => {
  const responsiveState = useResponsiveState();

  const language = useSelector((state) => state.application.language);
  const primaryRegularFont = useMemo(
    () => `Primary-Bold-${language}`,
    [language]
  );

  const { t } = useTranslation();

  const sectionStyle = {
    dir: language === "ar" ? "rtl" : "ltr",
    fontFamily: primaryRegularFont,
    fontSize: responsiveState.fixedFontSize,
    textTransform: "uppercase",
    color: "var(--color-secondary)",
    marginBottom: "1.4375rem",
  };

  return (
    <section
      className={`w-full flex flex-col items-center `}
      style={{
        maxWidth: "75rem",
        marginBottom: `calc(78px + (${responsiveState.fixedHeight} / 3))`,
      }}
    >
      <div>
        <h1 style={sectionStyle}>{t("Our best sellers")}</h1>
        <div
          className="grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-3 items-center"
          style={{
            margin: "0 auto",
            gap: responsiveState.fixedGap,
            marginBottom: `calc(${responsiveState.fixedHeight} / 2)`,
          }}
        >
          {[1, 2, 3, 4].map((id) => (
            <ProductCardWithDescriptionFooter
              fixedWidth={responsiveState.fixedWidth} // Set fixed width
              fixedHeight={responsiveState.fixedHeight} // Set fixed height
              highDefinitionImgUrl={getImageHighQualitySrc(id)}
              backgroundImageUrl={getImageLowQualitySrc(id)}
              descriptionContent={getImageAlt(id)}
            />
          ))}
        </div>{" "}
        <div className="flex flex-row-reverse">
          <Button
            style={{
              width: "217.64px",
              height: "58.55px",
              borderRadius: "50px",
              fontSize: "16px",
              background: "var(--color-primary)",
              color: "white",
              fontFamily: "Primary-Bold-fr",
            }}
          >
            SEE MORE
          </Button>
        </div>
      </div>
    </section>
  );
};

const getImageLowQualitySrc = (id) => {
  switch (id) {
    case 3:
      return YokoEat_low;
    case 2:
      return YOKOMarket_low;
    case 1:
      return Delivery_low;
    case 4:
      return Tagine_low;
    default:
      return "";
  }
};

const getImageHighQualitySrc = (id) => {
  switch (id) {
    case 3:
      return "https://raw.githubusercontent.com/Mohammed-MI-ma/assets-YOKO/main/YokoEat.jpg";
    case 2:
      return "https://raw.githubusercontent.com/Mohammed-MI-ma/assets-YOKO/main/YOKOMarket.jpg";
    case 1:
      return "https://raw.githubusercontent.com/Mohammed-MI-ma/assets-YOKO/main/Delivery.jpg";
    case 4:
      return "https://raw.githubusercontent.com/Mohammed-MI-ma/assets-YOKO/main/Le-tajine.jpg";
    default:
      return "";
  }
};

const getImageAlt = (id) => {
  switch (id) {
    case 1:
      return "Tide Détergent Lessive en Poudre .....";

    case 2:
      return "Tide Détergent Lessive en Poudre ....";

    case 3:
      return "Tide Détergent Lessive en Poudre.....";

    case 4:
      return "Tide Détergent Lessive en Poudre ....";
    default:
      return "";
  }
};

export default OurBestSellers;
