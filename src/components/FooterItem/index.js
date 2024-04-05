import React, { useMemo } from "react";
import useResponsiveState from "../../utils/useResponsiveState";

const FooterItem = ({ fixedWidth, descriptionContent, header, language }) => {
  const primaryBoldFont = useMemo(() => `Primary-Bold-${language}`, [language]);

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
    fontFamily: primaryBoldFont,
    fontSize: responsiveState.fixedFontSize_Footer__Header,
    color: "var(--color-primary)",
    textTransform: "uppercase",
    marginBottom: "1rem",
    textAlign: language === "ar" ? "right" : "left",
  };
  return (
    <div
      style={{
        paddingTop: responsiveState.fixedPaddingFooter,
      }}
    >
      <div className={`flex justify-start  `} style={containerStyles}>
        <div>
          <h1 style={headerStyles}>{header}</h1>
          {descriptionContent}
        </div>
      </div>
    </div>
  );
};

export default FooterItem;
