import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { useTranslation } from "react-i18next";

import {
  Delivery_low,
  Tagine_low,
  YOKOMarket_low,
  YokoEat_low,
} from "../../images";
import ImageCardWithDescriptionFooter from "../ImageCardWithDescriptionFooter";
import useResponsiveState from "../../utils/useResponsiveState";

const ProductOfTheWeek = () => {
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
    fontSize: "2rem",
    color: "var(--color-secondary)",
    paddingTop: "70px",
  };

  return (
    <section
      className={`w-full flex flex-col items-center `}
      style={{
        marginBottom: "70px",
        maxWidth: "1200px",
      }}
    >
      <h1 className={`text-center `} style={sectionStyle}>
        Product of the week
      </h1>

      <div
        className="grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-3 items-center"
        style={{ margin: "0 auto", gap: responsiveState.fixedGap }}
      >
        {[1, 2, 3, 4].map((id) => (
          <ImageCardWithDescriptionFooter
            fixedWidth={responsiveState.fixedWidth} // Set fixed width
            fixedHeight={responsiveState.fixedHeight} // Set fixed height
            highDefinitionImgUrl={getImageHighQualitySrc(id)}
            backgroundImageUrl={getImageLowQualitySrc(id)}
            descriptionContent={getImageAlt(id)}
          />
        ))}
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
      return "YOKO livraison";

    case 2:
      return "YOKO Marché";

    case 3:
      return "YOKO Mangez";

    case 4:
      return "YOKO Traditional";
    default:
      return "";
  }
};

export default ProductOfTheWeek;
