import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import HeroContainer from "../HeroContainer";
import CenteredContainer from "../../CenteredContainer";

import ActionButton from "../ActionButton";
import useFontFamily from "../../../utils/useFontFamily";

import { LogoB, casablanca, Bike_low } from "../../../images";
import style from "./firstpage.module.css";

const FirstPage = () => {
  const language = useSelector((state) => state.application.language);
  const { i18n, t } = useTranslation();
  const fontFamilyLight = useFontFamily(i18n.language, "normal");
  const fontFamilyBold = useFontFamily(i18n.language, "bold");

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
      {t("IN CASABLANCA NOW")}
    </div>
  ));

  const HeroActionButtonMemoized = React.memo(() => (
    <Link to="/web/guest/market">
      <ActionButton
        font={fontFamilyBold}
        style={{ background: "white", color: "var(--color-primary)" }}
      >
        {t("order delivery now")}
      </ActionButton>
    </Link>
  ));

  return (
    <HeroContainer language={language} className={style.heroContainer}>
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
        <CenteredContainer className={"h-full flex-col"}>
          <img style={{ width: 120 }} className="mb-5" src={LogoB} alt="Logo" />
          <HeaderHeroMemoized />
          <HeroActionButtonMemoized />
        </CenteredContainer>
      </div>
      <img src={Bike_low} className={style.scooter} alt="scooter" />
    </HeroContainer>
  );
};

export default FirstPage;
