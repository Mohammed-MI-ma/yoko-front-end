import React from "react";
import useResponsiveState from "../../utils/useResponsiveState";
import { useTranslation } from "react-i18next";

const ComingSoon = ({ title, style, font }) => {
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
        fontFamily: font,
        paddingLeft: responsiveState.fixedPaddingTitleComingSoon,
        paddingRight: responsiveState.fixedPaddingTitleComingSoon,
        borderRadius: responsiveState.fixedBorderRadiusComingSoon,
        ...style,
      }}
    >
      <div>{title}</div>

      <p
        style={{
          fontSize: "1.25rem",
          fontWeight: 100,
          fontFamily: font,
        }}
      >
        {t("Coming Soon")}
      </p>
    </div>
  );
};

export default ComingSoon;
