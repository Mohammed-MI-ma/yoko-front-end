//__REACT
import React, { useEffect, useMemo, useState } from "react";

//__REDUX
import { useSelector } from "react-redux";

//__FRAMER_MOTION
import { motion, AnimatePresence } from "framer-motion";

//__USE_TRANSLATION
import { useTranslation } from "react-i18next";

//__ANTD
import { Breadcrumb } from "antd";

//__CUSTOM_COMPONENTS
import BreadCrumb from "../../components/BreadCrumb";
import ComingSoon from "../../components/ComingSoon";

//__ONLY USED TO CALCULATE MAX-WIDTH: This line of code is specifically employed to compute the maximum width of the element. It does not directly contribute to the functionality of the component but aids in determining the appropriate maximum width based on the content and layout requirements.
import OurPartners from "../../components/OurPartners";

import { YOKO_EAT, YOKO_EAT_low, YOKO_Rest, YOKO_Rest_low } from "../../images";
import EatCard from "../../components/EatCard";
import useResponsiveState from "../../utils/useResponsiveState";

const YOKOEatPage = ({ language, fixedHeight }) => {
  //__HOOKS
  const { t } = useTranslation();

  const dynamicWidth = useSelector((state) => state.application.dynamicWidth);

  //__TODO:
  // RESPONSIVENESS HOOK: This hook is responsible for managing responsiveness within the component, ensuring that the component adapts appropriately to different screen sizes and device orientations.
  const responsiveState = useResponsiveState();
  const primaryBoldFont = useMemo(() => `Primary-Bold-${language}`, [language]);

  //__TODO:
  // INTERVAL TIMER FOR TITLE ROTATION: This section of the code is responsible for alternating between displaying "fast food" and "restaurant" every 3000ms (3 seconds). It manages the timer interval to switch between the two titles at the specified interval.
  const [isFastFood, setIsFastFood] = useState(true);
  const primaryRegularFont = useMemo(
    () => `Primary-regular-${language}`,
    [language]
  );
  useEffect(() => {
    let intervalId;

    // Function to toggle between titles
    const toggleTitle = () => {
      setIsFastFood((prevIsFastFood) => !prevIsFastFood);
    };

    // Function to start the interval
    const startInterval = () => {
      intervalId = setInterval(toggleTitle, 3000);
    };

    // Start the interval when the component mounts
    startInterval();

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      // Clear the interval to prevent memory leaks
      clearInterval(intervalId);
    };
  }, []);

  const containerStyles = {
    backgroundPosition: "top",
    backgroundSize: "cover",
    borderBottom: "0px",
    width: dynamicWidth,
    height: fixedHeight || "auto",
    position: "relative",
    backgroundColor: "white",
    minHeight: "75vh",
    margin: "0 auto",
  };
  return (
    <>
      <BreadCrumb language={language}>
        <h1
          style={{
            fontSize: "2rem",
            color: "var(--color-accent)",
            fontWeight: 700,
            fontFamily: primaryBoldFont,
          }}
        >
          <span
            style={{
              color: "var(--color-primary)",
            }}
          >
            {t("YOKO")}
          </span>
          &nbsp;{t("Eat")}
        </h1>
      </BreadCrumb>

      <div className={`flex flex-col`} style={containerStyles}>
        <Breadcrumb
          style={{
            fontSize: "var(--font-tiny-size)",
            fontWeight: "700",
            direction: language === "ar" ? "rtl" : "ltr",
          }}
          items={[
            {
              title: (
                <h1 style={{ fontFamily: primaryRegularFont }}>
                  {t("Casablanca")}
                </h1>
              ),
            },

            {
              title: (
                <h1 style={{ fontFamily: primaryRegularFont }}>
                  {t("YOKO Eat")}
                </h1>
              ),
            },
          ]}
        />
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full flex-grow"
          style={{
            filter: "blur(1.25px)",
          }}
        >
          <EatCard
            descriptionContent={
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: " translate(-50%, -50%)",
                }}
              >
                Restaurant
              </div>
            }
            highDefinitionImgUrl={YOKO_Rest_low}
            backgroundImageUrl={YOKO_Rest}
          />

          <EatCard
            highDefinitionImgUrl={YOKO_EAT}
            backgroundImageUrl={YOKO_EAT_low}
            descriptionContent={
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: "50%",
                  transform: " translate(-50%, -50%)",
                  color: "white",
                  background: "var(--color-primary)",
                }}
              />
            }
          />
        </div>
        <ComingSoon
          font={language === "ar" ? primaryRegularFont : "Neue_Power-fr"}
          title={
            <AnimatePresence>
              <div style={{ position: "relative" }}>
                {isFastFood ? (
                  <motion.h1
                    key="fast-food"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {t("Fast Food")}
                  </motion.h1>
                ) : (
                  <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    key="restaurant"
                  >
                    {t("Restaurant")}
                  </motion.h1>
                )}
              </div>
            </AnimatePresence>
          }
          style={{
            left: "50%",
            top: "50%",
            transform: " translate(-50%, -50%)",
            width: "max-content",
            fontSize: responsiveState.fixedFontSizeTitleComingSoon,
          }}
        />
      </div>
    </>
  );
};

export default YOKOEatPage;
