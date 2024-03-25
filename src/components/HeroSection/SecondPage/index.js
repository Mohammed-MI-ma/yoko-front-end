//__REACT
import React, { useEffect, useState } from "react";

//__REACT__OBSERVER
import { useInView } from "react-intersection-observer";

//__IMAGES
import { LogoB, casablanca, glow, scooter } from "../../../images";

//__ANTD
import { Button, Divider, Image } from "antd";

//__USE_TRANSLATION
import { useTranslation } from "react-i18next";

//__CUSTOM_COMPONENTS
import SocialMediaButtons from "../../SocialMedia";

//__FRAMER_MOTION
import { useAnimation, motion } from "framer-motion";

//__STYLE
import style from "./secondpage.module.css";
import HeaderHero from "../HeaderHero";
import ActionButton from "../ActionButton";
import { useMediaQuery } from "react-responsive";
import useResponsiveState from "../../../utils/useResponsiveState";

const SecondPage = ({ language, primaryRegularFont }) => {
  const {
    isMobile,
    isSmallDevice,
    isMediumDevice,
    isLargeDevice,
    isExtraLargeDevice,
    isExtraExtraLargeDevice,
    setIsMobile,
    setIsSmallDevice,
    setIsLargeDevice,
    setIsExtraLargeDevice,
    setIsMediumDevice,
    setIsExtraExtraLargeDevice,
  } = useResponsiveState();

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
    <section
      style={{
        backgroundImage: `url(${glow})`,
        color: "var(--color-accent)",
        height: `calc(100vh - ${
          isMobile ? "-7rem" : isSmallDevice ? "8rem" : "4.0625rem"
        } )`,
        backgroundColor: "var(--color-secondary)",
      }}
      className={` relative bg-secondary bg-cover flex flex-col-reverse lg:flex-row items-center w-full ${
        language === "fr" ? "lg:flex-row-reverse" : ""
      }`}
      ref={ref}
    >
      {(isMediumDevice ||
        isLargeDevice ||
        isExtraLargeDevice ||
        isExtraExtraLargeDevice) && (
        <div
          style={{
            position: "absolute",
            zIndex: 99999,
            top: "calc(100vh / 2)",
            left: "50%",
            transform: "translate(-50%)",
          }}
        >
          <motion.div
            animate={controls}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              type: "spring",
              stiffness: 100,
              damping: 30,
            }}
            initial="hidden"
            variants={{
              visible: { opacity: 1, x: 0 },
              hidden: { opacity: 0, x: 3000 },
            }}
          >
            <Image src={scooter} preview={false} width={"100%"}></Image>
          </motion.div>
        </div>
      )}

      <div
        className="lg:w-1/2 p-4 items-center flex gap-1 flex-col  items-center justify-center"
        style={{
          height: "100%",
          fontSize: "2.5rem",
          fontFamily: primaryRegularFont,
          fontWeight: "900",
        }}
      >
        {/** HeaderHero */}
        <HeaderHero primaryRegularFont={primaryRegularFont} language={language}>
          {t("aCasa")} <br />
          {t("maintenant")}
        </HeaderHero>
        {/** Action Button */}
        <ActionButton font={primaryRegularFont}>
          Commande de livraison
        </ActionButton>

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
        className={`lg:w-1/2  p-4 flex items-center relative ${
          language === "ar" ? style.basketAr : ""
        }`}
        style={{
          background: `url(${casablanca})`,
          height: "50%",
          backgroundSize: "cover",
          backgroundPositionX: "right",
        }}
      >
        <Image style={{ width: "100%" }} src={LogoB} preview={false} />
        {(isMobile || isSmallDevice) && (
          <div
            style={{
              position: "absolute",
              zIndex: 99999,
              //top: "calc(100vh / 2)",
              bottom: 0,
              left: "50%",
              transform: "translate(-50%)",
            }}
          >
            <motion.div
              animate={controls}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                type: "spring",
                stiffness: 100,
                damping: 30,
              }}
              initial="hidden"
              variants={{
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0, x: 3000 },
              }}
              style={{ width: "100vw" }}
            >
              <Image src={scooter} preview={false}></Image>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SecondPage;
