import React, { useMemo } from "react";
import useResponsiveState from "../../utils/useResponsiveState";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
const ProductCard = () => {
  const responsiveState = useResponsiveState();
  const { t } = useTranslation();
  const language = useSelector((state) => state.application.language);
  const primaryRegularFont = useMemo(
    () => `Primary-Bold-${language}`,
    [language]
  );
  const cardStyle = {
    dir: language === "ar" ? "rtl" : "ltr",
    fontFamily: primaryRegularFont,
    fontSize: responsiveState.fixedFontSize,
    textTransform: "uppercase",
    marginBottom: "1.4375rem",
    width: responsiveState.fixedWidthProductMonth,
    height: responsiveState.fixedHeightProductMonth,
    background: "#1D3034",
    flexDirection: "row",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  };
  const columnStyle = {
    width: "50%",
    textAlign: "center",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div style={cardStyle}>
      <div style={columnStyle}>
        <div style={{ height: "50%", display: "flex", alignItems: "center" }}>
          qsdqsd
        </div>
        <div style={{ height: "50%", display: "flex", alignItems: "center" }}>
          <Button>discover</Button>
        </div>
      </div>
      <div style={columnStyle}>
        <div>
          <img
            alt=""
            width={"90%"}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
