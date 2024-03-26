import { Card } from "antd";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { useTranslation } from "react-i18next";
import LazyLoadedOurPartnersCard from "./LazyLoadedOurPartnersCard";
import {
  Delivery_low,
  Tagine_low,
  YOKOMarket_low,
  YokoEat_low,
} from "../../images";

const OurPartners = () => {
  const language = useSelector((state) => state.application.language);
  const primaryRegularFont = useMemo(
    () => `Primary-Bold-${language}`,
    [language]
  );

  const { t } = useTranslation();
  // Define variables for the primary regular font and the special logo font,
  // incorporating the language into their names for localization purposes.

  // Styles
  const sectionStyle = {
    dir: language === "ar" ? "rtl" : "ltr",
    fontFamily: primaryRegularFont,
    fontSize: "2rem",
    color: "var(--color-secondary)",
    paddingTop: "70px",
  };

  return (
    <section
      className={`w-full flex flex-col mb-10 `}
      style={{
        background: "white",
      }}
    >
      <h1 className={`text-center mb-10`} style={sectionStyle}>
        {t("Discover our yoko")}
      </h1>
      <div
        className="grid  lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-3 gap-10 items-center flex-grow "
        style={{ margin: "0 auto" }}
      >
        <div className="text-center " style={{ color: "white" }}>
          <LazyLoadedOurPartnersCard
            font={primaryRegularFont}
            lowQualitySrc={YokoEat_low}
            highQualitySrc="https://raw.githubusercontent.com/Mohammed-MI-ma/assets-YOKO/main/YokoEat.jpg" // Replace with your high-quality image URL
            alt="YOKO Eat"
          />
        </div>
        <div className="text-center " style={{ color: "white" }}>
          <LazyLoadedOurPartnersCard
            font={primaryRegularFont}
            lowQualitySrc={YOKOMarket_low}
            highQualitySrc="https://raw.githubusercontent.com/Mohammed-MI-ma/assets-YOKO/main/YOKOMarket.jpg" // Replace with your high-quality image URL
            alt="YOKO Market"
          />
        </div>
        <div className="text-center " style={{ color: "white" }}>
          <LazyLoadedOurPartnersCard
            font={primaryRegularFont}
            lowQualitySrc={Delivery_low}
            highQualitySrc="https://raw.githubusercontent.com/Mohammed-MI-ma/assets-YOKO/main/Delivery.jpg" // Replace with your high-quality image URL
            alt="Dilevery Boy"
          />
        </div>
        <div className="text-center " style={{ color: "white" }}>
          <LazyLoadedOurPartnersCard
            font={primaryRegularFont}
            lowQualitySrc={Tagine_low}
            highQualitySrc="https://raw.githubusercontent.com/Mohammed-MI-ma/assets-YOKO/main/Le-tajine.jpg" // Replace with your high-quality image URL
            alt="Traditional Food"
          />
        </div>
      </div>
    </section>
  );
};

export default OurPartners;
