import { Skeleton } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPhone } from "react-icons/fa6";
import { useSelector } from "react-redux";
import useDirection from "../../utils/useDirection";
import useFontFamily from "../../utils/useFontFamily";

const PhoneNumberContainer = () => {
  const [errorDisplayed] = useState(false); // Local state to track if error message has been displayed
  const { t, i18n } = useTranslation();
  const direction = useDirection(i18n.language);
  const fontFamilyLight = useFontFamily(i18n.language, "normal");

  const contactInfo = useSelector((state) => state.contact.contactInfo);
  const loading = useSelector((state) => state.contact.loading);
  const error = useSelector((state) => state.contact.error);

  return (
    <span
      itemProp="telephone"
      className="flex items-center gap-1 "
      style={{
        direction: direction,
      }}
      tabIndex={0}
    >
      <FaPhone />
      {loading ? (
        <Skeleton.Input active size={"small"} />
      ) : error || errorDisplayed ? (
        <small style={{ fontFamily: fontFamilyLight }}>
          {" "}
          <i>{t("Réessayer")}</i>
        </small>
      ) : (
        <p style={{ direction: "ltr" }}>{contactInfo?.phone}</p>
      )}
    </span>
  );
};

export default PhoneNumberContainer;
