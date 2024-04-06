import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import useFontFamily from "../../../utils/useFontFamily";
import style from "./headerHero.module.css";
import { useInView } from "react-intersection-observer";

const HeaderHero = ({ children, color, myStyle }) => {
  const { i18n } = useTranslation();
  const fontFamilyBold = useFontFamily(i18n.language, "bold");

  const [ref, inView] = useInView({
    threshold: 0.25, // Adjust threshold as needed
  });

  return (
    <motion.h1
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className={style.headerStyle}
      style={{ fontFamily: fontFamilyBold, color: color, ...myStyle }}
    >
      {children}
    </motion.h1>
  );
};

export default HeaderHero;
