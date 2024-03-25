//__REACT
import React, { useEffect } from "react";

//__REACT__OBSERVER
import { useInView } from "react-intersection-observer";

//__IMAGES
import { basket } from "../../../images";

//__USE_TRANSLATION
import { useTranslation } from "react-i18next";

//__CUSTOM_COMPONENTS
import SocialMediaButtons from "../../SocialMedia";

//__FRAMER_MOTION
import { useAnimation } from "framer-motion";

//__ANTD
import { Divider, Image } from "antd";

//__STYLE
import style from "./thirdpage.module.css";
import HeroContainer from "../HeroContainer";
import SeeMore from "../../SeeMore";
import HeaderHero from "../HeaderHero";

const ThirdPage = ({ language, primaryRegularFont }) => {
  //__USE_TRANSLATION
  const { t } = useTranslation();

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

  return (
    <HeroContainer language={language} ref={ref}>
      <div
        className="lg:w-1/2 p-4 items-center flex gap-1 flex-col  items-center justify-center"
        style={{
          height: "100%",
          fontSize: "2.5rem",
          fontFamily: primaryRegularFont,
          fontWeight: "900",
        }}
      >
        <HeaderHero primaryRegularFont={primaryRegularFont} language={language}>
          {t("Nous avons")}
          <br /> {t("tout ce dont")} <br />
          {t("vous avez besoin.")}
        </HeaderHero>
        {/** Divider */}
        <Divider />

        {/** See More */}
        <SeeMore font={primaryRegularFont} />

        {/** SocialMedia */}
        <SocialMediaButtons />
      </div>
      <div
        className={` bg-white h-full lg:w-1/2  p-4 flex items-center justify-center ${
          language === "ar" ? style.basketAr : ""
        }`}
      >
        <Image src={basket} preview={false} width={"50%"} />
      </div>
    </HeroContainer>
  );
};

export default ThirdPage;
