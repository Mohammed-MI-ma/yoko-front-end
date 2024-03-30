import { Skeleton, message } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPhone } from "react-icons/fa6";
import { useSelector } from "react-redux";
import useResponsiveState from "../../utils/useResponsiveState";

const PhoneNumberContainer = () => {
  const [errorDisplayed, setErrorDisplayed] = useState(false); // Local state to track if error message has been displayed
  const { t } = useTranslation();

  const contactInfo = useSelector((state) => state.contact.contactInfo);
  const loading = useSelector((state) => state.contact.loading);
  const error = useSelector((state) => state.contact.error);

  const responsiveState = useResponsiveState();

  return (
    <span
      itemprop="telephone"
      className="flex items-center gap-1 "
      style={{
        justifyContent: responsiveState.fixedFontSize_Footer__alignements,
      }}
      tabIndex={0} // Ensure keyboard accessibility
    >
      <FaPhone />
      {loading ? (
        <Skeleton.Input active size={"small"} />
      ) : error || errorDisplayed ? (
        t("Oops!!")
      ) : (
        contactInfo?.phone
      )}
    </span>
  );
};

export default PhoneNumberContainer;
