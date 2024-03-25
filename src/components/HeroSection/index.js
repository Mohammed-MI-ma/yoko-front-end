import React, { Suspense, lazy, useMemo } from "react";
import { useSelector } from "react-redux";
import { Carousel, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import style from "./heroSection.module.css"; // Make sure this import is necessary
import { useTranslation } from "react-i18next";

// Import your pages (FirstPage and SecondPage) lazily
const FirstPage = lazy(() => import("./FirstPage"));
const SecondPage = lazy(() => import("./SecondPage"));
const ThirdPage = lazy(() => import("./ThirdPage"));
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
        <Suspense
          fallback={
            <Spin
              spinning
              fullscreen
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
          }
        >
          <FirstPage
            language={language}
            primaryRegularFont={primaryRegularFont}
            t={t}
          />
        </Suspense>

        <Suspense fallback={<>Loading...</>}>
          <SecondPage
            language={language}
            primaryRegularFont={primaryRegularFont}
            t={t}
          />
        </Suspense>
        <Suspense fallback={<>Loading...</>}>
          <ThirdPage
            language={language}
            primaryRegularFont={primaryRegularFont}
            t={t}
          />
        </Suspense>
      </Carousel>
    </section>
  );
};

export default HeroSection;
