import React, { useEffect, useState } from "react";

//__FRAMER__MOTION
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

const HeaderHero = ({ primaryRegularFont, language, children }) => {
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
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      style={{
        fontFamily: primaryRegularFont,
        direction: language === "ar" ? "rtl" : "ltr",
        ...(isMobile ? mobileStyles : regularStyles),
      }}
    >
      {children}
    </motion.h1>
  );
};
const regularStyles = {
  /* Regular styles here */
  textTransform: "uppercase",
  fontSize: "2rem",
};

const mobileStyles = {
  /* Styles specific to mobile screens */
  /* Regular styles here */
  textTransform: "uppercase",
  fontSize: "2rem",
  textAlign: "center",
};
export default HeaderHero;
