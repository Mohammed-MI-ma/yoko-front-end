import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useTranslation } from "react-i18next";

import {
  Delivery_low,
  Tagine_low,
  YOKOMarket_low,
  YokoEat_low,
} from "../../images";
import { setDynamicWidth } from "../../reducers/applicationService/applicationSlice";
import useResponsiveState from "../../utils/useResponsiveState";
import ProductCard from "../ProductCard";

const ProductOfTheWeek = () => {
  //USE_TRANSLATION
  const { t } = useTranslation();

  //__INTERN
  const language = useSelector((state) => state.application.language);
  const primaryRegularFont = useMemo(
    () => `Primary-Bold-${language}`,
    [language]
  );

  //__DYNAMIC WIDTH
  const dynamicWidth = useSelector((state) => state.application.dynamicWidth);

  //__DISPATCH
  const d = useDispatch();

  // RESPONSIVENESS
  const responsiveState = useResponsiveState();

  // Simulate a window resize event after 0.01 second
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 10);

    return () => clearTimeout(timeoutId);
  }, []);

  // Dispatch an action to set the initial value of dynamicWidth
  useEffect(() => {
    if (!dynamicWidth) {
      d(setDynamicWidth(dynamicWidth));
    }
  }, [d, dynamicWidth]);

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
        marginBottom: `calc(78px + (${responsiveState.fixedHeight} / 3))`,
        maxWidth: "75rem",
      }}
    >
      <div
        className="flex flex-col"
        style={{ margin: "0 auto", width: dynamicWidth }}
      >
        <h1 style={sectionStyle}>Product of the week</h1>
        <div className="flex w-full justify-between">
          <div>qsdqsd</div>

          <ProductCard />
        </div>
      </div>
    </section>
  );
};

export default ProductOfTheWeek;
