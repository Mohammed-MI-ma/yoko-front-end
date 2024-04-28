import React from "react";

import { bucketMobile } from "../../../images";

import style from "./firstpage.module.css";

import SocialMediaButtons from "../../SocialMedia";

import HeroContainer from "../HeroContainer";
import HeaderHero from "../HeaderHero";

import CenteredContainer from "../../CenteredContainer";
import { useTranslation } from "react-i18next";
import useFontFamily from "../../../utils/useFontFamily";
import { HeroActionButton } from "../PHILIPSPage";
import { useSelector } from "react-redux";

const FirstPage = () => {
  const { t, i18n } = useTranslation();
  const language = useSelector((state) => state.application.language);

  const fontFamilyBold = useFontFamily(i18n.language, "bold");
  const HeaderHeroMemoized = React.memo(() => (
    <HeaderHero>
      <div
        style={{
          maxWidth: "21.25rem",
          textAlign: "center",
          fontSize: "1.5rem",
        }}
      >
        {t("ForYou")}
      </div>
    </HeaderHero>
  ));

  const HeroActionButtonMemoized = React.memo(() => (
    <HeroActionButton
      myStyle={{
        background: "var(--color-primary)",
        fontFamily: fontFamilyBold,
      }}
    >
      {t("takeAdvantage")}
    </HeroActionButton>
  ));
  return (
    <HeroContainer language={language} bgColor={"var(--color-secondary)"}>
      <main
        className={`lg:w-1/2 p-4 items-center flex gap-1 flex-col ${style.mainContainer} ${style.smallScreenHeight}`}
      >
        <HeaderHeroMemoized />

        <HeroActionButtonMemoized />
        <SocialMediaButtons color={"var(--color-primary)"} />
      </main>
      <CenteredContainer>
        <img
          src={bucketMobile}
          preview={false}
          className={style.bucketImage}
          alt={"bucket filled with vegetables"}
        />
      </CenteredContainer>
    </HeroContainer>
  );
};

export default FirstPage;
