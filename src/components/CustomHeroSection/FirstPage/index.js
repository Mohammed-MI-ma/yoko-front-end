import React from "react";
import HeroContainer from "../HeroContainer";
import HeaderHero from "../HeaderHero";
import CenteredContainer from "../../CenteredContainer";
import { color, motion } from "framer-motion";
import { LogoB, casablanca, Bike_low } from "../../../images";
import style from "./firstpage.module.css";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import ActionButton from "../ActionButton";
import useFontFamily from "../../../utils/useFontFamily";
import { Link } from "react-router-dom";

const FirstPage = () => {
  const language = useSelector((state) => state.application.language);
  const { i18n, t } = useTranslation();
  const fontFamilyLight = useFontFamily(i18n.language, "normal");

  const HeaderHeroMemoized = React.memo(() => (
    <HeaderHero>
      <div
        style={{
          maxWidth: "21.25rem",
          textAlign: "center",
          marginBottom: "2rem",
          color: "white",
        }}
      >
        {t("IN CASABLANCA NOW")}
      </div>
    </HeaderHero>
  ));

  const HeroActionButtonMemoized = React.memo(() => (
    <Link to="/web/guest/market">
      <ActionButton
        font={fontFamilyLight}
        style={{ background: "white", color: "var(--color-primary)" }}
      >
        {t("order delivery now")}
      </ActionButton>
    </Link>
  ));

  return (
    <HeroContainer
      language={language}
      style={{
        overflow: "hidden",
        position: "relative",
        maxWidth: "75rem",
        width: "100%",
      }}
    >
      <CenteredContainer
        style={{
          height: "100%",
          background: `url(${casablanca})`,
        }}
        className={style.imageContainer}
      >
        <img src={LogoB} alt="Logo" className={style.yokoLogo} />
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
          <HeroActionButtonMemoized />
        </CenteredContainer>
      </div>
      <AnimatedImage src={Bike_low}></AnimatedImage>
    </HeroContainer>
  );
};

export default FirstPage;

const AnimatedImage = ({ children, src }) => {
  const [ref, inView] = useInView({
    threshold: 0.25,
  });

  return (
    <motion.img
      ref={ref}
      width={"40%"}
      className={style.scooter}
      src={src}
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
