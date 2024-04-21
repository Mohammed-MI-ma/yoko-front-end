import React from "react";
import HeroContainer from "../HeroContainer";
import HeaderHero from "../HeaderHero";
import CenteredContainer from "../../CenteredContainer";
import { LogoB, Bike_low } from "../../../images";
import van from "../../../assets/images/Left.png";
import style from "./SecondPage.module.css";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import useFontFamily from "../../../utils/useFontFamily";

const SecondPage = () => {
  const language = useSelector((state) => state.application.language);
  const { t, i18n } = useTranslation();
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
      {t("DISCOVER THE DELIVERY BOY")}{" "}
    </div>
  ));

  return (
    <HeroContainer language={language} className={style.heroContainer}>
      <CenteredContainer className={style.imageContainer}>
        <img src={van} className={style.van} alt="van yoko" />
      </CenteredContainer>
      <div
        style={{ background: "var(--color-secondary)" }}
        className={`lg:w-1/2 items-center h-full flex gap-1 flex-col ${style.textContainer}`}
      >
        <CenteredContainer className={"h-full flex-col"}>
          <img style={{ width: 120 }} className="mb-5" src={LogoB} alt="Logo" />
          <HeaderHeroMemoized />
        </CenteredContainer>
      </div>
      <img src={Bike_low} className={style.scooter} alt={"scooter yoko"} />
    </HeroContainer>
  );
};

export default SecondPage;
