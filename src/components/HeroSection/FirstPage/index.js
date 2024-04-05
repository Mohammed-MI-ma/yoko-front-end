import React from "react";

import { bucket, bucketMobile } from "../../../images";

import { Button, Image } from "antd";

import style from "./firstpage.module.css";

import SocialMediaButtons from "../../SocialMedia";

import HeroContainer from "../HeroContainer";
import HeaderHero from "../HeaderHero";

import CenteredContainer from "../../CenteredContainer";
import { useTranslation } from "react-i18next";
import useFontFamily from "../../../utils/useFontFamily";

const MarketPage = ({ language, t }) => {
  const { i18n } = useTranslation();
  const fontFamilyBold = useFontFamily(i18n.language, "bold");

  return (
    <HeroContainer
      language={language}
      bgColor={"var(--color-secondary)"}
      isGlow
    >
      <main
        className={`lg:w-1/2 p-4 items-center flex gap-1 flex-col ${style.smallScreenHeight}`}
      >
        <HeaderHero>
          <h1 className={style.smallScreens} style={{ lineHeight: "35px" }}>
            {t("ForYou")}
          </h1>
          <h1
            className={style.largeScreens}
            style={{ lineHeight: "35px", maxWidth: "400px" }}
          >
            {t("ForYou")}
          </h1>
        </HeaderHero>
        <Button
          className="text-white px-10 py-3 text-xl rounded-full mt-3 mb-3"
          style={{
            background: "var(--color-primary)",
            fontFamily: fontFamilyBold,
            fontSize: "var(--font-large-size)",
            height: "auto",
            width: "fit-content",
            border: "none",
          }}
        >
          {t("takeAdvantage")}
        </Button>

        <SocialMediaButtons color={"var(--color-primary)"} />
      </main>
      <CenteredContainer
        className={` lg:w-1/2 p-4 sm:m-10  ${style.smallScreenHeight} ${
          language === "ar" ? style.basketAr : null
        }`}
      >
        <div className={style.largeScreens}>
          <Image src={bucket} preview={false} />
        </div>
        <CenteredContainer className={style.smallScreens}>
          <Image src={bucketMobile} preview={false} width={"65%"} />
        </CenteredContainer>
      </CenteredContainer>
    </HeroContainer>
  );
};

export default MarketPage;
