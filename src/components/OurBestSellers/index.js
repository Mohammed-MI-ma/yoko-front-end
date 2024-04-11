import React from "react";
import { useSelector } from "react-redux";

import { useTranslation } from "react-i18next";

import useDirection from "../../utils/useDirection";

import ProductCardWithDescriptionFooter from "../ProductCardWithDescriptionFooter";

import style from "./OurBestSellers.module.css";

import useFontFamily from "../../utils/useFontFamily";

import {
  Delivery_low,
  Tagine_low,
  YOKOMarket_low,
  YokoEat_low,
} from "../../images";

const OurBestSellers = () => {
  const { t, i18n } = useTranslation();
  const fontFamilyBold = useFontFamily(i18n.language, "bold");
  const direction = useDirection(i18n.language);

  return (
    <section className={`w-full`} style={{ marginBottom: "5rem" }}>
      <div>
        <div className={style.container}>
          <div
            style={{ maxWidth: "62.5rem" }}
            className={`bg-cover h-full relative w-full `}
          >
            <h1
              className={`${style.headerStyle} `}
              style={{ direction: direction, fontFamily: fontFamilyBold }}
            >
              <h1>{t("Our best sellers")}</h1>
            </h1>
            <div
              className={`grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 items-center ${style.grid}`}
            >
              {[1, 2, 3, 4].map((id) => (
                <ProductCardWithDescriptionFooter
                  key={id}
                  highDefinitionImgUrl={getImageHighQualitySrc(id)}
                  backgroundImageUrl={getImageLowQualitySrc(id)}
                  descriptionContent={getImageAlt(id)}
                />
              ))}
            </div>
          </div>
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
