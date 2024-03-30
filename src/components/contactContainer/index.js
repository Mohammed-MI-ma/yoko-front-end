import { Skeleton, message } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMdMail } from "react-icons/io";
import { useSelector } from "react-redux";
import useResponsiveState from "../../utils/useResponsiveState";

const ContactContainer = () => {
  const [errorDisplayed, setErrorDisplayed] = useState(false); // Local state to track if error message has been displayed
  const { t } = useTranslation();

  const contactInfo = useSelector((state) => state.contact.contactInfo);
  const loading = useSelector((state) => state.contact.loading);
  const error = useSelector((state) => state.contact.error);
  // Handle error message display
  useEffect(() => {
    // Check if error occurred and error message has not been displayed
    if (error && !errorDisplayed) {
      // Display error message using Ant Design's message component
      message.error(t("Échec du chargement des informations de contact"));
      setErrorDisplayed(true); // Set errorDisplayed to true to prevent duplicate error messages
    }
  }, [error, errorDisplayed, t]);
  const handleEmailClick = () => {
    window.location.href = `mailto:${contactInfo?.email}`;
  };
  const responsiveState = useResponsiveState();

  return (
    <span
      onClick={loading || error || errorDisplayed ? null : handleEmailClick}
      className="flex items-center gap-1 justify-center"
      style={{
        cursor: "pointer",
        justifyContent: responsiveState.fixedFontSize_Footer__alignements,
      }}
      tabIndex={0} // Ensure keyboard accessibility
      role="link" // Indicate the role of the element
      aria-label="Contact Yoko via email" // Provide a descriptive label for accessibility
    >
      <IoMdMail />
      {loading ? (
        <Skeleton.Input active size={"small"} />
      ) : error || errorDisplayed ? (
        "Oops!!"
      ) : (
        contactInfo?.email
      )}
    </span>
  );
};

export default ContactContainer;
