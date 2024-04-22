import React from "react";
import HeroContainer from "../HeroContainer";
import CenteredContainer from "../../CenteredContainer";
import { motion } from "framer-motion";
import { LogoB, bucket3 } from "../../../images";
import style from "./ThirdPage.module.css";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import useFontFamily from "../../../utils/useFontFamily";

const ThirdPage = () => {
  const language = useSelector((state) => state.application.language);
  const { i18n, t } = useTranslation();
  const fontFamilyLight = useFontFamily(i18n.language, "normal");

  const HeaderHeroMemoized = React.memo(() => (
    <div
      style={{
        maxWidth: "21.25rem",
        textAlign: "center",
        fontSize: "1.5rem",
        fontFamily: fontFamilyLight,
        marginBottom: "2rem",
        color: "white",
      }}
    >
      {t("we have all you need")}
    </div>
  ));

  return (
    <HeroContainer language={language} className={style.heroContainer}>
      <CenteredContainer
        style={{
          height: "100%",
          background: "white",
        }}
        className={style.imageContainer}
      >
        <img src={bucket3} alt="bucket2" style={{ width: "80%" }} />
      </CenteredContainer>
      <div
        style={{ background: "var(--color-secondary)" }}
        className={`lg:w-1/2 items-center h-full flex gap-1 flex-col ${style.textContainer}`}
      >
        <CenteredContainer
          style={{
            height: "100%",
            flexDirection: "column",
          }}
        >
          <img style={{ width: 120 }} className="mb-5" src={LogoB} alt="Logo" />
          <HeaderHeroMemoized />
        </CenteredContainer>
      </div>
    </HeroContainer>
  );
};

export default ThirdPage;

const AnimatedImage = ({ children, src, className }) => {
  const [ref, inView] = useInView({
    threshold: 0.25,
  });

  return (
    <motion.img
      ref={ref}
      width={"40%"}
      className={className}
      src={src}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{
        duration: 1,
        ease: "easeInOut",
        type: "spring",
        stiffness: 100,
        damping: 30,
      }}
    >
      {children}
    </motion.img>
  );
};
