import React, { useEffect, useState } from "react";
import { Traditional_low } from "../../images";
import ComingSoon from "../../components/ComingSoon";
import { useTranslation } from "react-i18next";

const TraditionalFoodPage = ({
  fixedWidth,
  highDefinitionImgUrl,
  fixedHeight,
}) => {
  const { t } = useTranslation();
  const [imageUrl, setImageUrl] = useState(Traditional_low); // Set your initial lightweight image URL here
  const [imageLoaded, setImageLoaded] = useState(false);

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
    <div className="w-full">
      <div
        className={`flex justify-center items-center `}
        style={containerStyles}
      >
        <ComingSoon title={t("Traditional Food")} />
      </div>
    </div>
  );
};

export default TraditionalFoodPage;
