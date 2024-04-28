import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Flex } from "antd";

import useFontFamily from "../../utils/useFontFamily";

import { GiPayMoney } from "react-icons/gi";
import { TbBrandAbstract } from "react-icons/tb";
import { MdFeedback, MdDashboard } from "react-icons/md";

import style from "./marketMenuMobile.module.css";

const MarketMenuMobile = () => {
  const { t, i18n } = useTranslation();
  const fontFamilyBold = useFontFamily(i18n.language, "bold");

  const baseStyle = {
    width: "25%",
    height: "3.5rem",
    margin: "0 0.2rem",
    backgroundColor: "var(--color-secondary)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    borderRadius: "3.625rem", // Equivalent to 36.25px
  };

  return (
    <Flex
      horizontal
      className={`${style.mobileSiderStyle} bg-white shadow-lg border p-1`}
    >
      <Button shape="circle" style={baseStyle}>
        <GiPayMoney size={20} />
      </Button>
      <Button shape="circle" style={baseStyle}>
        <MdDashboard size={20} />
      </Button>
      <Button
        style={{
          ...baseStyle,
          fontFamily: fontFamilyBold,
          paddingLeft: "5px",
          paddingRight: "5px",

          color: "white",
          background: "var(--color-primary)",
        }}
        className="bordered shadow-lg"
      >
        {t("Mon Panier")}
      </Button>
      <Button shape="circle" style={baseStyle}>
        <TbBrandAbstract size={20} />
      </Button>
      <Button shape="circle" style={baseStyle}>
        <MdFeedback size={20} />
      </Button>
    </Flex>
  );
};

export default MarketMenuMobile;
