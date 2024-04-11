import React from "react";

import { cerave, ceraveLogo_low } from "../../../images";
import { useSelector } from "react-redux";

import { Image } from "antd";

import style from "./CeravePage.module.css";

import HeroContainer from "../HeroContainer";
import HeaderHero from "../HeaderHero";

import CenteredContainer from "../../CenteredContainer";
import { useTranslation } from "react-i18next";
import useFontFamily from "../../../utils/useFontFamily";
import SocialMediaButtons from "../../SocialMedia";
import { HeroActionButton } from "../PHILIPSPage";

const CeravePage = () => {
  const language = useSelector((state) => state.application.language);

  const { i18n, t } = useTranslation();
  const fontFamilyBold = useFontFamily(i18n.language, "bold");
  const HeaderHeroMemoized = React.memo(() => (
    <HeaderHero color={"var(--color-secondary)"}>
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
    <HeroContainer
      language={language}
      bgColor={"rgb(134 255 93)"}
      isGlow={false}
    >
      <main
        className={`lg:w-1/2 p-4 items-center flex gap-1 flex-col ${style.mainContainer}`}
      >
        <Image src={ceraveLogo_low} preview={false} width={180} />
        <HeaderHeroMemoized />
        <HeroActionButtonMemoized />
        <SocialMediaButtons color={"var(--color-secondary)"} />
      </main>
      <CenteredContainer>
        <img
          src={cerave}
          className={style.ceraveImage}
          alt="Cerave skincare product"
        />
      </CenteredContainer>
    </HeroContainer>
  );
};

export default CeravePage;
