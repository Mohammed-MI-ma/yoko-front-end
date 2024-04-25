import { Skeleton } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMdMail } from "react-icons/io";
import { useSelector } from "react-redux";
import useDirection from "../../utils/useDirection";
import useFontFamily from "../../utils/useFontFamily";

const ContactEmail = ({ email, onClick, loading, error, errorDisplayed }) => {
  const { t, i18n } = useTranslation();
  const direction = useDirection(i18n.language);
  const fontFamilyLight = useFontFamily(i18n.language, "normal");

  const handleClick = useCallback(() => {
    if (!loading && !error && !errorDisplayed) {
      onClick();
    }
  }, [loading, error, errorDisplayed, onClick]);

  return (
    <span
      onClick={handleClick}
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
        <small>{email}</small>
      )}
    </span>
  );
};

const ContactContainer = () => {
  const [errorDisplayed, setErrorDisplayed] = useState(false);
  const contactInfo = useSelector((state) => state.contact.contactInfo);
  const loading = useSelector((state) => state.contact.loading);
  const error = useSelector((state) => state.contact.error);

  useEffect(() => {
    if (error && !errorDisplayed) {
      setErrorDisplayed(true);
    }
  }, [error, errorDisplayed]);

  const handleEmailClick = useCallback(() => {
    window.location.href = `mailto:${contactInfo?.email}`;
  }, [contactInfo]);

  return (
    <ContactEmail
      email={contactInfo?.email}
      onClick={handleEmailClick}
      loading={loading}
      error={error}
      errorDisplayed={errorDisplayed}
    />
  );
};

export default ContactContainer;
