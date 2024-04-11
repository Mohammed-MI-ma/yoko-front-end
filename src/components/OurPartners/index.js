import React from "react";
import { useTranslation } from "react-i18next";

import ImageCardWithDescriptionFooter from "../ImageCardWithDescriptionFooter";
import useFontFamily from "../../utils/useFontFamily";
import useDirection from "../../utils/useDirection";
import {
  getAction,
  getImageAlt,
  getImageHighQualitySrc,
  getImageLowQualitySrc,
} from "../../utils/imageUtils";

import style from "./OurPartners.module.css";
const OurPartners = () => {
  const { t, i18n } = useTranslation();
  const fontFamilyBold = useFontFamily(i18n.language, "bold");
  const direction = useDirection(i18n.language);

  return (
    <section className={`w-full`}>
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
              {t("Discover our yoko")}
            </h1>

            <div
              className={`grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 items-center ${style.grid}`}
            >
              {[1, 2, 3, 4].map((id) => (
                <ImageCardWithDescriptionFooter
                  highDefinitionImgUrl={getImageHighQualitySrc(id)}
                  backgroundImageUrl={getImageLowQualitySrc(id)}
                  descriptionContent={getImageAlt(id, t)}
                  key={id}
                  action={getAction(id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurPartners;
