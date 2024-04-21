import React, { useMemo } from "react";

import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Carousel, ConfigProvider } from "antd";

import FirstPage from "./FirstPage";

//Styles
import styles from "./CustomheroSection.module.css";
import SecondPage from "./SecondPage";
import ThirdPage from "./ThirdPage";

const EnhancedHeroSection = () => {
  const language = useSelector((state) => state.application.language);
  const { t } = useTranslation();

  const memoizedPages = useMemo(() => {
    try {
      if (!language || !t) return [];
      return [
        {
          id: "yokoInCasa",
          component: <FirstPage />,
        },
        {
          id: "yokoInCasa2",
          component: <SecondPage />,
        },
        {
          id: "yokoInCasa3",
          component: <ThirdPage />,
          color: "var(--color-secondary)",
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
      <section className="w-full mb-10">
        <Carousel infinite autoplaySpeed={5000} autoplay>
          {memoizedPages.map((page) => (
            <CarouselPage key={page.id}>{page.component}</CarouselPage>
          ))}
        </Carousel>
      </section>
    </ConfigProvider>
  );
};
export default EnhancedHeroSection;

const CarouselPage = ({ children }) => {
  return (
    <div>
      <div className={`${styles.container}`}>{children}</div>
    </div>
  );
};
