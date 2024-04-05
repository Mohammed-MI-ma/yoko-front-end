import React, { useEffect, useMemo, useState } from "react";
import { Traditional, Traditional_low } from "../../images";
import ComingSoon from "../../components/ComingSoon";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { setLanguage } from "../../reducers/applicationService/applicationSlice";
import { AnimatePresence } from "framer-motion";
import useResponsiveState from "../../utils/useResponsiveState";

const TraditionalFoodPage = ({
  fixedWidth,
  highDefinitionImgUrl = Traditional,
  fixedHeight,
}) => {
  const { t } = useTranslation();
  const responsiveState = useResponsiveState();

  const [imageUrl, setImageUrl] = useState(Traditional_low); // Set your initial lightweight image URL here
  const [imageLoaded, setImageLoaded] = useState(false);
  const language = useSelector((state) => state.application.language);
  const primaryRegularFont = useMemo(
    () => `Primary-regular-${language}`,
    [language]
  );
  useEffect(() => {
    if (!imageLoaded) {
      // Load your high definition image here
      const highDefinitionImageUrl = highDefinitionImgUrl; // Set your high definition image URL here
      const img = new Image();
      img.src = highDefinitionImageUrl;
      // Inside the image onload event handler

      // Inside the image onload event handler
      img.onload = () => {
        // Clear any existing timeout
        clearTimeout(timeoutId);

        // Update the state with the high definition image URL
        setImageUrl(highDefinitionImageUrl);
        setImageLoaded(true);
      };

      // Set a timeout to handle slow network conditions
      const timeoutId = setTimeout(() => {
        // Fallback to default image or display placeholder
        setImageUrl(null); // Set your default image URL here
        setImageLoaded(true);
      }, 5000); // Set the timeout duration (in milliseconds) as needed
    }
  }, [imageLoaded, highDefinitionImgUrl]);
  const containerStyles = {
    backgroundImage: `url(${imageUrl})`,
    backgroundPosition: "top",
    backgroundSize: "cover",
    borderBottom: "0px",
    width: fixedWidth || "100%", // Use fixed width or full width if not provided
    height: fixedHeight || "auto", // Use fixed height or auto height if not provided
    position: "relative",
    backgroundColor: "white",
    minHeight: "75vh",
  };

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>{t("Traditional Food")}</title>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content={t("Description of Traditional Food")}
        />
        <meta
          name="keywords"
          content={t("traditional food, cuisine, recipe")}
        />
        <meta name="author" content={t("Your Company Name")} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={t("Traditional Food")} />
        <meta
          property="og:description"
          content={t("Description of Traditional Food")}
        />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        {/* Add other meta tags as needed */}
      </Helmet>
      <div className="w-full">
        <div
          className={`flex justify-center items-center `}
          style={containerStyles}
        >
          <ComingSoon
            font={language === "ar" ? primaryRegularFont : "Neue_Power-fr"}
            title={
              <h1
                style={{
                  fontSize: responsiveState.fixedFontSizeTitleComingSoon,
                }}
              >
                {t("Traditional Food")}
              </h1>
            }
          />
        </div>
      </div>
    </>
  );
};

export default TraditionalFoodPage;
