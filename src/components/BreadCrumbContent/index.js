import React from "react";
import useFontFamily from "../../utils/useFontFamily";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const BreadCrumbContent = () => {
  const { t, i18n } = useTranslation();
  const fontFamilyBold = useFontFamily(i18n.language, "bold");
  const location = useLocation();
  const path = location.pathname;
  const lastItem = path.substring(path.lastIndexOf("/") + 1);

  return (
    <h1
      style={{
        fontSize: "2rem",
        color: "var(--color-accent)",
        fontWeight: 700,
        fontFamily: fontFamilyBold,
      }}
    >
      <span
        style={{
          color: "var(--color-primary)",
        }}
      >
        {lastItem === "delivery" ? (
          t("YOKO")
        ) : (
          <>
            {t("YOKO")}&nbsp;{t("Market")}
          </>
        )}
      </span>

      <small> - {t(lastItem)}</small>
    </h1>
  );
};

export default BreadCrumbContent;
