import React from "react";
import useResponsiveState from "../../utils/useResponsiveState";
import { useTranslation } from "react-i18next";

const ComingSoon = ({ title, style }) => {
  const responsiveState = useResponsiveState();
  const { t } = useTranslation();
  return (
    <div
      className="shadow-lg"
      style={{
        color: "white",
        position: "absolute",
        background: "var(--color-primary)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontFamily: "Neue_Power-fr",
        paddingLeft: responsiveState.fixedPaddingTitleComingSoon,
        paddingRight: responsiveState.fixedPaddingTitleComingSoon,
        borderRadius: responsiveState.fixedBorderRadiusComingSoon,
        ...style,
      }}
    >
      <h1
        style={{
          fontSize: responsiveState.fixedFontSizeTitleComingSoon,
        }}
      >
        {title}
      </h1>
      <p
        style={{
          fontSize: "24px",
        }}
      >
        {t("Coming Soon")}
      </p>
    </div>
  );
};

export default ComingSoon;
