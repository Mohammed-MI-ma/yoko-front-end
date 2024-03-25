import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const CopyrightRNA = () => {
  const language = useSelector((state) => state.application.language);
  const primaryRegularFont = `Primary-Regular-${language}`;

  const { t } = useTranslation();
  return (
    <section style={{ fontFamily: primaryRegularFont }}>
      {t("Copyright")}
    </section>
  );
};

export default CopyrightRNA;
