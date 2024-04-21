import React from "react";
import HeroContainer from "../HeroContainer";
import HeaderHero from "../HeaderHero";
import CenteredContainer from "../../CenteredContainer";
import { motion } from "framer-motion";
import { LogoB, Bike_low } from "../../../images";
import van from "../../../assets/images/Left.png";
import style from "./SecondPage.module.css";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";

const SecondPage = () => {
  const language = useSelector((state) => state.application.language);
  const { t } = useTranslation();

  const HeaderHeroMemoized = React.memo(() => (
    <HeaderHero>
      <div
        style={{
          maxWidth: "21.25rem",
          textAlign: "center",
          marginBottom: "2rem",
        }}
      >
        {t("DISCOVER THE DELIVERY BOY")}{" "}
      </div>
    </HeaderHero>
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
          background: `rgb(134, 255, 93)`,
        }}
        className={style.imageContainer}
      >
        <AnimatedImage src={van} className={style.van}></AnimatedImage>
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
      <AnimatedImage src={Bike_low} className={style.scooter}></AnimatedImage>
    </HeroContainer>
  );
};

export default SecondPage;

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
