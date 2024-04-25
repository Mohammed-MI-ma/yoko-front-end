import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPhone } from "react-icons/fa";
import { useSelector } from "react-redux";
import useDirection from "../../utils/useDirection";
import useFontFamily from "../../utils/useFontFamily";
import { Skeleton } from "antd";

const PhoneNumber = ({
  phone,
  loading,
  error,
  errorDisplayed,
  direction,
  fontFamilyLight,
  t,
}) => {
  const displayError = error || errorDisplayed;

  return (
    <span
      itemProp="telephone"
      className="flex items-center gap-1"
      style={{ direction }}
      tabIndex={0}
    >
      <FaPhone />
      {loading ? (
        <Skeleton active size="small" />
      ) : displayError ? (
        <small style={{ fontFamily: fontFamilyLight }}>
          <i>{t("Réessayer")}</i>
        </small>
      ) : (
        <p style={{ direction: "ltr" }}>{phone}</p>
      )}
    </span>
  );
};

const PhoneNumberContainer = () => {
  const [errorDisplayed] = useState(false);
  const { t, i18n } = useTranslation();
  const direction = useDirection(i18n.language);
  const fontFamilyLight = useFontFamily(i18n.language, "normal");

  const contactInfo = useSelector((state) => state.contact.contactInfo);
  const loading = useSelector((state) => state.contact.loading);
  const error = useSelector((state) => state.contact.error);

  return (
    <PhoneNumber
      phone={contactInfo?.phone}
      loading={loading}
      error={error}
      errorDisplayed={errorDisplayed}
      direction={direction}
      fontFamilyLight={fontFamilyLight}
      t={t}
    />
  );
};

export default PhoneNumberContainer;
