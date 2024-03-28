import React from "react";
import { IoMdMail } from "react-icons/io";

const ContactContainer = () => {
  const handleEmailClick = () => {
    window.location.href = "mailto:contact.yoko@gmail.com";
  };

  return (
    <span
      onClick={handleEmailClick}
      className="flex items-center gap-1 justify-center"
      style={{ cursor: "pointer" }}
      tabIndex={0} // Ensure keyboard accessibility
      role="link" // Indicate the role of the element
      aria-label="Contact Yoko via email" // Provide a descriptive label for accessibility
    >
      <IoMdMail />
      <p>contact.yoko@gmail.com</p>
    </span>
  );
};

export default ContactContainer;
