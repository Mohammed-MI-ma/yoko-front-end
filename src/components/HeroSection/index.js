import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Carousel } from "antd";

import FirstPage from "./FirstPage";
import CeravePage from "./CeravePage";
import PhilipsPage from "./PHILIPSPage";

import styles from "./heroSection.module.css";

const HeroSection = () => {
  const language = useSelector((state) => state.application.language);
  const { t } = useTranslation();

  // Memoize the pages array creation
  const memoizedPages = useMemo(() => {
    try {
      // Ensure language and t are available
      if (!language || !t) return [];

      // Return the array of page components
      return [
        {
          id: "firstPage",
          component: <FirstPage language={language} t={t} />,
        },
        {
          id: "ceravePage",
          component: <CeravePage language={language} t={t} />,
        },
        {
          id: "philipsPage",
          component: <PhilipsPage language={language} t={t} />,
        },
      ];
    } catch (error) {
      console.error("Error occurred while memoizing pages:", error);
      return [];
    }
  }, [language, t]); // Update memoization when language or t changes

  return (
    <section className="w-full shadow-lg">
      <Carousel autoplay infinite>
        {memoizedPages.map((page) => (
          <CarouselPage key={page.id}>{page.component}</CarouselPage>
        ))}
      </Carousel>
    </section>
  );
};

const CarouselPage = ({ children }) => {
  return (
    <div>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default HeroSection;
