import React, { useEffect, useState, forwardRef } from "react";

//__IMAGES
import { bucket, bucketMobile } from "../../../images";

//__ANTD
import { Button, Divider, Image } from "antd";

//__STYLE
import style from "./firstpage.module.css";

//__FRAMER_MOTION
import { useAnimation } from "framer-motion";

//__SOCIAL_MEDIA COMPONENT
import SocialMediaButtons from "../../SocialMedia";

//__HERO_CONATINER
import HeroContainer from "../HeroContainer";
import HeaderHero from "../HeaderHero";
import { useInView } from "react-intersection-observer";

import useResponsiveState from "../../../utils/useResponsiveState";

const FirstPage = forwardRef(({ language, primaryRegularFont, t }, ref) => {
  //__USE_IN_VIEW
  const [refInView, inView] = useInView();

  //__CONTROLS
  const controls = useAnimation();
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const { isMobile, isSmallDevice, isMediumDevice } = useResponsiveState();

  return (
    <HeroContainer language={language} ref={ref || refInView}>
      <div className="lg:w-1/2 p-4 items-center flex gap-1 flex-col">
        <HeaderHero primaryRegularFont={primaryRegularFont} language={language}>
          {isMobile || isSmallDevice || isMediumDevice ? (
            t("ForYou")
          ) : (
            <>
              {t("basket")}
              <br />
              {t("Fresh")}
              <br />
              {t("ForYou")}
            </>
          )}
        </HeaderHero>
        <Button
          className="text-white px-10 py-3 text-xl rounded-full"
          style={{
            background: "var(--color-primary)",
            fontFamily: primaryRegularFont,
            fontSize: "var(--font-large-size)",
            height: "auto",
            width: "fit-content",
            border: "none",
          }}
        >
          {t("takeAdvantage")}
        </Button>
        <Button
          type="Link"
          className="text-white px-10 py-3 text-xl rounded-full mt-10"
          style={{
            fontFamily: primaryRegularFont,
            fontSize: "var(--font-large-size)",
            height: "auto",
            width: "fit-content",
            border: "none",
          }}
        >
          {t("seeMore")}
        </Button>
        <SocialMediaButtons />
      </div>
      <div
        className={`lg:w-1/2  p-4 flex items-center sm:m-10 h-full justify-center ${
          language === "ar" ? style.basketAr : null
        } `}
        style={
          isMobile
            ? mobileStyles
            : isSmallDevice
            ? { padding: 0 }
            : regularStyles
        }
      >
        <Image
          src={
            isMobile || isSmallDevice || isMediumDevice ? bucketMobile : bucket
          }
          style={
            isMobile || isSmallDevice || isMediumDevice
              ? mobileStyles
              : regularStyles
          }
          preview={false}
        />
      </div>
    </HeroContainer>
  );
});

const regularStyles = {
  /* Regular styles here */
};

const mobileStyles = {
  /* Styles specific to mobile screens */
  width: "45vw",
};

export default FirstPage;
