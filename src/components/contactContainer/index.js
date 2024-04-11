import { Skeleton } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMdMail } from "react-icons/io";
import { useSelector } from "react-redux";
import useDirection from "../../utils/useDirection";
import useFontFamily from "../../utils/useFontFamily";

const ContactContainer = () => {
  const [errorDisplayed, setErrorDisplayed] = useState(false);
  const { t, i18n } = useTranslation();
  const direction = useDirection(i18n.language);

  const contactInfo = useSelector((state) => state.contact.contactInfo);
  const loading = useSelector((state) => state.contact.loading);
  const error = useSelector((state) => state.contact.error);
  const fontFamilyLight = useFontFamily(i18n.language, "normal");
  useEffect(() => {
    if (error && !errorDisplayed) {
      setErrorDisplayed(true);
    }
  }, [error, errorDisplayed]);

  const handleEmailClick = useCallback(() => {
    if (!loading && !error && !errorDisplayed) {
      window.location.href = `mailto:${contactInfo?.email}`;
    }
  }, [contactInfo, loading, error, errorDisplayed]);

  return (
    <span
      onClick={handleEmailClick}
      className="flex items-center gap-1"
      style={{
        cursor: loading || error || errorDisplayed ? "default" : "pointer",
        direction: direction,
      }}
      tabIndex={0}
      role="link"
      aria-label={t("Contact Yoko via email")}
    >
      <IoMdMail />
      {loading ? (
        <Skeleton.Input active size="small" />
      ) : error || errorDisplayed ? (
        <small style={{ fontFamily: fontFamilyLight }}>
          <i>{t("Réessayer")}</i>
        </small>
      ) : (
        <small>{contactInfo?.email}</small>
      )}
    </span>
  );
};

export default ContactContainer;
