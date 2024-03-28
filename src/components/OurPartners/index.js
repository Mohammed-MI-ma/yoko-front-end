import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useTranslation } from "react-i18next";

import {
  Delivery_low,
  Tagine_low,
  YOKOMarket_low,
  YokoEat_low,
} from "../../images";
import ImageCardWithDescriptionFooter from "../ImageCardWithDescriptionFooter";
import useResponsiveState from "../../utils/useResponsiveState";
import { setDynamicWidth } from "../../reducers/applicationService/applicationSlice";

const OurPartners = () => {
  const dispatch = useDispatch();

  const responsiveState = useResponsiveState();
  const divRef = useRef(null);
  useEffect(() => {
    // Define a function to update the width
    const updateWidth = () => {
      // Check if the ref to the div is available
      if (divRef.current) {
        // Get the width of the div
        const width = divRef.current.offsetWidth;
        // Log the width for debugging
        console.log("width,width", width);
        // Dispatch an action to update the width in the Redux store
        dispatch(setDynamicWidth(width));
      }
    };

    // Call updateWidth to get the initial width
    updateWidth();

    // Add an event listener to the window object for the resize event
    window.addEventListener("resize", updateWidth);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, [dispatch]);
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
      <div ref={divRef}>
        <h1 style={sectionStyle}>{t("Discover our yoko")}</h1>
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

export default OurPartners;
