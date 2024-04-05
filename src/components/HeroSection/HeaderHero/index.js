import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import useFontFamily from "../../../utils/useFontFamily";
import style from "./headerHero.module.css";

const HeaderHero = ({ children }) => {
  const { i18n } = useTranslation();
  const fontFamilyBold = useFontFamily(i18n.language, "bold");

  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className={style.headerStyle}
      style={{ fontFamily: fontFamilyBold }}
    >
      {children}
    </motion.h1>
  );
};

export default HeaderHero;
