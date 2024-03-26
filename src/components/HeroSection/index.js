import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Carousel } from "antd";
import style from "./heroSection.module.css"; // Make sure this import is necessary
import { useTranslation } from "react-i18next";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import ThirdPage from "./ThirdPage";

const HeroSection = () => {
  const language = useSelector((state) => state.application.language);
  const { t } = useTranslation();
  //__CONTROLS
  const primaryRegularFont = useMemo(
    () => `Primary-Bold-${language}`,
    [language]
  );

  return (
    <section id="hero-section">
      <Carousel
        infinite
        autoplay
        autoplaySpeed={3000}
        dotPosition="right"
        easing="linear" // Example easing function, replace with your desired easing function
        className={`${
          style.heroSection
        } flex flex-col-reverse lg:flex-row items-center ${
          language === "fr" ? "lg:flex-row-reverse" : ""
        }`}
      >
        <FirstPage
          language={language}
          primaryRegularFont={primaryRegularFont}
          t={t}
        />
        <SecondPage
          language={language}
          primaryRegularFont={primaryRegularFont}
          t={t}
        />

        <ThirdPage
          language={language}
          primaryRegularFont={primaryRegularFont}
          t={t}
        />
      </Carousel>
    </section>
  );
};

export default HeroSection;
