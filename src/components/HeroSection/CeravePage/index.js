import React from "react";

import { cerave, ceraveLogo_low } from "../../../images";

import { Image } from "antd";

import style from "./CeravePage.module.css";

import HeroContainer from "../HeroContainer";
import HeaderHero from "../HeaderHero";

import CenteredContainer from "../../CenteredContainer";
import { useTranslation } from "react-i18next";
import useFontFamily from "../../../utils/useFontFamily";
import SocialMediaButtons from "../../SocialMedia";
import { HeroActionButton } from "../PHILIPSPage";

const CeravePage = ({ language }) => {
  const { i18n, t } = useTranslation();
  const fontFamilyBold = useFontFamily(i18n.language, "bold");
  const HeaderHeroMemoized = React.memo(() => (
    <HeaderHero color={"var(--color-accent)"}>
      {t("Meilleures offres")}
    </HeaderHero>
  ));
  const HeroActionButtonMemoized = React.memo(() => (
    <HeroActionButton
      myStyle={{
        background: "var(--color-secondary)",
        fontFamily: fontFamilyBold,
        color: "var(--color-accent)",
      }}
    >
      {t("Discover")}
    </HeroActionButton>
  ));
  return (
    <HeroContainer language={language} bgColor={"#84f75d"} isGlow={false}>
      <main
        className={`lg:w-1/2 p-4 items-center flex gap-1 flex-col ${style.mainContainer} ${style.smallScreenHeight}`}
      >
        <Image src={ceraveLogo_low} preview={false} width={190} />
        <HeaderHeroMemoized />
        <HeroActionButtonMemoized />
        <SocialMediaButtons color={"var(--color-secondary)"} />
      </main>
      <CenteredContainer
        style={{
          backgroundRepeat: "round",
          backgroundPositionXx: "center",
        }}
        className={`lg:w-1/2  ${style.smallScreenHeight}`}
      >
        <div
          className={`${style.largeScreens}  ${
            language === "ar" ? style.basketAr : null
          }`}
        >
          <Image src={cerave} preview={false} width={"60%"} />
        </div>
        <CenteredContainer className={style.smallScreens}>
          <Image src={cerave} preview={false} width={"90%"} />
        </CenteredContainer>
      </CenteredContainer>
    </HeroContainer>
  );
};

export default CeravePage;
