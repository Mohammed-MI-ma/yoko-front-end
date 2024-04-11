import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { airfryer, philips } from "../../../images";

import { Button, Image } from "antd";

import HeroContainer from "../HeroContainer";
import HeaderHero from "../HeaderHero";
import CenteredContainer from "../../CenteredContainer";
import useFontFamily from "../../../utils/useFontFamily";
import SocialMediaButtons from "../../SocialMedia";

//Local asset
import motifBackground from "../../../assets/images/motifBackground.png";

//Styling
import style from "./PhilipsPage.module.css";

const PhilipsPage = () => {
  const language = useSelector((state) => state.application.language);
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
          {t("SpecialOffers")}
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
        fontSize: "var(--font-medium-size)",
        height: "auto",
        width: "fit-content",
        border: "none",
      }}
    >
      {children}
    </Button>
  );
};

export default PhilipsPage;
