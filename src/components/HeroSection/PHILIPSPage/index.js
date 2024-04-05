import React from "react";

import { airfryer, philips, vectorObj } from "../../../images";

import { Button, Image } from "antd";

import style from "./PhilipsPage.module.css";

import HeroContainer from "../HeroContainer";
import HeaderHero from "../HeaderHero";

import CenteredContainer from "../../CenteredContainer";
import { useTranslation } from "react-i18next";
import useFontFamily from "../../../utils/useFontFamily";
import SocialMediaButtons from "../../SocialMedia";

const PhilipsPage = ({ language, t }) => {
  const { i18n } = useTranslation();
  const fontFamilyBold = useFontFamily(i18n.language, "bold");
  return (
    <HeroContainer language={language} bgColor={"white"} isGlow={false}>
      <main
        className={`lg:w-1/2 p-4 items-center flex gap-1 flex-col justify-center ${style.smallScreenHeight}`}
      >
        <Image src={philips} preview={false} width={190} />
        <HeaderHero>
          <h1 className={style.smallScreens} style={{ lineHeight: "35px" }}>
            {t("BestOffers")}
          </h1>
          <h1
            className={style.largeScreens}
            style={{ lineHeight: "35px", maxWidth: "400px" }}
          >
            {t("BestOffers")}
          </h1>
        </HeaderHero>
        <Button
          className="text-white px-10 py-3 text-xl rounded-full mt-3 mb-3"
          style={{
            background: "var(--color-secondary)",
            fontFamily: fontFamilyBold,
            fontSize: "var(--font-large-size)",
            height: "auto",
            width: "fit-content",
            border: "none",
            color: "var(--color-accent)",
          }}
        >
          {t("Discover")}
        </Button>{" "}
        <SocialMediaButtons color={"var(--color-secondary)"} />
      </main>
      <CenteredContainer
        style={{
          backgroundImage: `url(${vectorObj})`,
          backgroundRepeat: "round",
          backgroundPositionXx: "center",
        }}
        className={` lg:w-1/2 p-4 sm:m-10  ${style.smallScreenHeight} ${
          language === "ar" ? style.basketAr : null
        }`}
      >
        <div className={style.largeScreens}>
          <Image src={airfryer} preview={false} width={"50%"} />
        </div>
        <CenteredContainer className={style.smallScreens}>
          <Image src={airfryer} preview={false} width={"50%"} />
        </CenteredContainer>
      </CenteredContainer>
    </HeroContainer>
  );
};

export default PhilipsPage;
