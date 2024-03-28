import React from "react";
import useResponsiveState from "../../utils/useResponsiveState";
import { Divider } from "antd";

const FooterItem = ({ fixedWidth, descriptionContent, header }) => {
  // Get responsive state
  let responsiveState;
  try {
    // Get responsive state
    // eslint-disable-next-line react-hooks/rules-of-hooks
    responsiveState = useResponsiveState();
  } catch (error) {
    // Handle error gracefully
    console.error("Error in responsive state:", error);
    // Provide fallback values or default behavior
  }

  // Define container styles
  const containerStyles = {
    width: fixedWidth || "100%",
    display: "flex",
    flexDirection: "column",
    textAlign: responsiveState.fixedFontSize_Footer__alignements,
  };

  // Define header styles
  const headerStyles = {
    fontFamily: "Primary-Bold-fr",
    fontSize: responsiveState.fixedFontSize_Footer__Header,
    color: "var(--color-primary)",
    textTransform: "uppercase",
    marginBottom: "1rem",
  };
  return (
    <div style={{ paddingTop: responsiveState.fixedPaddingFooter }}>
      <div
        className={`flex justify-start items-center `}
        style={containerStyles}
      >
        <div>
          <h1 style={headerStyles}>{header}</h1>
          {descriptionContent}
        </div>
      </div>
    </div>
  );
};

export default FooterItem;
