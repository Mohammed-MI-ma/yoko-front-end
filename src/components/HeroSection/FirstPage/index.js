import React, { useEffect, useState } from "react";

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

import { useMediaQuery } from "react-responsive";

const FirstPage = ({ language, primaryRegularFont, t }) => {
  //__USE_IN_VIEW
  const [ref, inView] = useInView();

  //__CONTROLS
  const controls = useAnimation();
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const isMobileInitial = useMediaQuery({ maxWidth: 500 });
  const [isMobile, setIsMobile] = useState(isMobileInitial);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <HeroContainer language={language} ref={ref}>
      <div className="lg:w-1/2 p-4 items-center flex gap-1 flex-col">
        <HeaderHero primaryRegularFont={primaryRegularFont} language={language}>
          {t("basket")}
          <br />
          {t("Fresh")}
          <br />
          {t("ForYou")}
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
        <Divider />
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
        className={`lg:w-1/2  p-4 flex items-center sm:m-10 ${
          language === "ar" ? style.basketAr : null
        }`}
        style={isMobile ? mobileStyles : regularStyles}
      >
        <Image
          src={isMobile ? bucketMobile : bucket}
          style={isMobile ? mobileStyles : regularStyles}
          preview={false}
        />
      </div>
    </HeroContainer>
  );
};

const regularStyles = {
  /* Regular styles here */
};

const mobileStyles = {
  /* Styles specific to mobile screens */
  width: "250px",
};

export default FirstPage;
