import React, { useState, useEffect } from "react";
import style from "./ImageCardWithDescriptionFooter.module.css";
import useResponsiveState from "../../utils/useResponsiveState";
import { Error404 } from "../../images";

const ImageCardWithDescriptionFooter = ({
  fixedWidth,
  highDefinitionImgUrl,
  fixedHeight,
  backgroundImageUrl,
  descriptionContent,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState(backgroundImageUrl || Error404); // Set your initial lightweight image URL here

  const [divId] = useState(`div-${Math.random().toString(36).substr(2, 9)}`); // Generate a random ID for the div

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById(divId); // Replace "yourDivId" with the actual ID of your div
      if (!element) return; // Return if the element is not found

      const rect = element.getBoundingClientRect();
      const topInView = rect.top >= 0 && rect.top <= window.innerHeight;
      const bottomInView =
        rect.bottom >= 0 && rect.bottom <= window.innerHeight;

      if (topInView || bottomInView) {
        setIsVisible(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [divId]);

  useEffect(() => {
    if (isVisible && !imageLoaded) {
      // Load your high definition image here
      const highDefinitionImageUrl = highDefinitionImgUrl; // Set your high definition image URL here
      const img = new Image();
      img.src = highDefinitionImageUrl;

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
        setImageUrl(Error404); // Set your default image URL here
        setImageLoaded(true);
      }, 5000); // Set the timeout duration (in milliseconds) as needed
    }
  }, [isVisible, imageLoaded, highDefinitionImgUrl]);
  const responsiveState = useResponsiveState();

  const containerStyles = {
    width: fixedWidth || "100%", // Use fixed width or full width if not provided
    height: fixedHeight || "auto", // Use fixed height or auto height if not provided

    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    borderTopLeftRadius: responsiveState.fixedBorderRadius,
    borderTopRightRadius: responsiveState.fixedBorderRadius,
    border: ".25px solid var(--color-primary)",
  };

  const descriptionStyles = {
    position: "absolute",
    bottom: 0,
    height: `calc(${responsiveState.fixedHeight} / 3)`,
    width: "100%",
    backgroundColor: "var(--color-primary)", // Example background color
    color: "white", // Example text color
    textAlign: "center",
    display: "flex",

    justifyContent: "center",
    alignItems: "center",
    transform: "translateY(100%)",
    borderBottomLeftRadius: responsiveState.fixedBorderRadius,
    borderBottomRightRadius: responsiveState.fixedBorderRadius,
  };
  const paragraphStyles = {
    fontFamily: "Neue_Power-fr",
    fontSize: responsiveState.fixedFontSize,
  };
  return (
    <div id={divId} style={{ cursor: "pointer" }}>
      <div
        className={`flex justify-center items-center ${style.container}`}
        style={containerStyles}
      >
        {/* Render description div */}
        <div style={descriptionStyles}>
          {/* Add your description content here */}
          <p style={paragraphStyles}>
            {descriptionContent || "Description Content"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageCardWithDescriptionFooter;
