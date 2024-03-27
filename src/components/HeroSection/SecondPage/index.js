import React, { forwardRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { Image, Button } from "antd";
import { useTranslation } from "react-i18next";
import style from "./secondpage.module.css";
import HeaderHero from "../HeaderHero";
import ActionButton from "../ActionButton";
import useResponsiveState from "../../../utils/useResponsiveState";
import { scooter, casablanca, LogoB, glow } from "../../../images";
import SocialMediaButtons from "../../SocialMedia";

const SecondPage = forwardRef(
  ({ language, primaryRegularFont, index }, ref) => {
    const {
      isMobile,
      isSmallDevice,
      isMediumDevice,
      isLargeDevice,
      isExtraLargeDevice,
      isExtraExtraLargeDevice,
    } = useResponsiveState();
    const { t } = useTranslation();
    const controls = useAnimation();
    const [refInView, inView] = useInView();

    useEffect(() => {
      if (index === 1) {
        console.log("test", index === 1);
        controls.start("visible");
      } else {
        controls.start("hidden");
      }
    }, [index]);

    return (
      <section
        style={{
          backgroundImage: `url(${glow})`,
          color: "var(--color-accent)",
          height: `calc(100vh - 140px)`,
          backgroundColor: "var(--color-secondary)",
        }}
        className={` relative bg-secondary bg-cover flex flex-col-reverse lg:flex-row items-center w-full ${
          language === "fr" ? "lg:flex-row-reverse" : ""
        }`}
        ref={ref || refInView}
      >
        {(isMediumDevice ||
          isLargeDevice ||
          isExtraLargeDevice ||
          isExtraExtraLargeDevice) && (
          <div
            style={{
              position: "absolute",
              zIndex: 99999,
              bottom: "25px",
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
          className="lg:w-1/2 p-4 items-center flex gap-1 flex-col  items-center "
          style={{
            height: "100%",
            fontSize: "2.5rem",
            fontFamily: primaryRegularFont,
            fontWeight: "900",
            justifyContent:
              isMobile || isSmallDevice || isMediumDevice ? null : "center",
          }}
        >
          <HeaderHero
            primaryRegularFont={primaryRegularFont}
            language={language}
          >
            {isMobile || isSmallDevice || isMediumDevice ? (
              t("ForYou")
            ) : (
              <>
                {t("aCasa")} <br />
                {t("maintenant")}
              </>
            )}
          </HeaderHero>
          <ActionButton font={primaryRegularFont}>livraison</ActionButton>

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
            height: "100%",
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
  }
);

export default SecondPage;
