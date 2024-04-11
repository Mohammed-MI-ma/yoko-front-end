import React, { useMemo } from "react";

import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Carousel, ConfigProvider } from "antd";

import FirstPage from "./FirstPage";
import CeravePage from "./CeravePage";
import PhilipsPage from "./PHILIPSPage";

import styles from "./heroSection.module.css";

const HeroSection = () => {
  const language = useSelector((state) => state.application.language);
  const { t } = useTranslation();

  const memoizedPages = useMemo(() => {
    try {
      if (!language || !t) return [];
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
  }, [language, t]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Carousel: {
            dotHeight: 8,
          },
        },
      }}
    >
      <section className="w-full" style={{ marginBottom: "5rem" }}>
        <Carousel>
          {memoizedPages.map((page) => (
            <CarouselPage key={page.id}>{page.component}</CarouselPage>
          ))}
        </Carousel>
      </section>
    </ConfigProvider>
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
