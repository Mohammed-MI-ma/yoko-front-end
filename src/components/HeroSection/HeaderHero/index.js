import React, { useEffect, useState } from "react";

//__FRAMER__MOTION
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import useResponsiveState from "../../../utils/useResponsiveState";

const HeaderHero = ({ primaryRegularFont, language, children }) => {
  const { isMobile, isSmallDevice, isMediumDevice } = useResponsiveState();

  const regularStyles = {
    /* Regular styles here */
    textTransform: "uppercase",
    fontSize: "2rem",
  };

  const mobileStyles = {
    /* Styles specific to mobile screens */
    /* Regular styles here */
    textTransform: "uppercase",
    fontSize: "1.5rem",
    textAlign: "center",
  };
  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      style={{
        fontFamily: primaryRegularFont,
        direction: language === "ar" ? "rtl" : "ltr",
        ...(isMobile || isSmallDevice || isMediumDevice
          ? mobileStyles
          : regularStyles),
      }}
    >
      {children}
    </motion.h1>
  );
};

export default HeaderHero;
