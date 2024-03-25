import React from "react";
import style from "./Footer.module.css";
import FootTopNv from "./BuildingBlocs/FootTopNv";
import FootBottomNv from "./BuildingBlocs/FootBottomNv";
import CopyrightRNA from "./BuildingBlocs/CopyrightRNA";
const Footer = () => {
  return (
    <footer className={style.pageFooter}>
      <FootTopNv />
      <FootBottomNv />
      <CopyrightRNA />
    </footer>
  );
};

export default Footer;
