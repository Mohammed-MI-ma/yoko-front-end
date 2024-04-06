import React from "react";

import { airfryer, philips } from "../../../images";

import { Button, Image } from "antd";

import style from "./PhilipsPage.module.css";

import HeroContainer from "../HeroContainer";
import HeaderHero from "../HeaderHero";

import CenteredContainer from "../../CenteredContainer";
import { useTranslation } from "react-i18next";
import useFontFamily from "../../../utils/useFontFamily";
import SocialMediaButtons from "../../SocialMedia";
import motifBackground from "../../../assets/images/motifBackground.png";
const PhilipsPage = ({ language }) => {
  const { i18n, t } = useTranslation();
  const fontFamilyBold = useFontFamily(i18n.language, "bold");
  return (
    <HeroContainer
      language={language}
      bgColor={"var(--color-accent)"}
      isGlow={false}
    >
      <main
        className={`lg:w-1/2 p-4 items-center flex gap-1 flex-col ${style.mainContainer} ${style.smallScreenHeight}`}
      >
        <Image src={philips} preview={false} width={190} />
        <HeaderHero color={"var(--color-secondary)"}>
          {t("Meilleures offres")}
        </HeaderHero>
        <HeroActionButton
          myStyle={{
            background: "var(--color-secondary)",
            fontFamily: fontFamilyBold,
            color: "var(--color-accent)",
          }}
        >
          {t("Discover")}
        </HeroActionButton>
        <SocialMediaButtons color={"var(--color-secondary)"} />
      </main>
      <CenteredContainer
        style={{
          backgroundImage: `url(${motifBackground})`,
          backgroundRepeat: "round",
          backgroundPositionXx: "center",
        }}
        className={` lg:w-1/2 p-4 sm:m-10  ${style.smallScreenHeight}`}
      >
        <div className={` ${language === "ar" ? style.basketAr : null}`}>
          <Image
            src={airfryer}
            preview={false}
            width={"50%"}
            className={style.airfryer}
          />
        </div>
      </CenteredContainer>
    </HeroContainer>
  );
};

export const HeroActionButton = ({ children, myStyle, action }) => {
  return (
    <Button
      onClick={action}
      className="text-white px-10 py-3 text-xl rounded-full mt-3 mb-3"
      style={{
        ...myStyle,
        // background: "var(--color-secondary)",
        //fontFamily: font,
        fontSize: "var(--font-large-size)",
        height: "auto",
        width: "fit-content",
        border: "none",
        // color: "var(--color-accent)",
      }}
    >
      {children}
    </Button>
  );
};

export default PhilipsPage;
