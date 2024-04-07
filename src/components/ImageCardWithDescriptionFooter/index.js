import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import { useTranslation } from "react-i18next";

import { motion } from "framer-motion";

import useFontFamily from "../../utils/useFontFamily";
import useResponsiveState from "../../utils/useResponsiveState";

import style from "./ImageCardWithDescriptionFooter.module.css";
import CenteredContainer from "../CenteredContainer";

const ImageCardWithDescriptionFooter = ({
  fixedWidth,
  highDefinitionImgUrl,
  fixedHeight,
  backgroundImageUrl,
  descriptionContent,
  action,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState(backgroundImageUrl);
  const { i18n } = useTranslation();
  const fontFamilyBold = useFontFamily(i18n.language, "bold");
  const responsiveState = useResponsiveState();

  const [divId] = useState(`div-${Math.random().toString(36).substr(2, 9)}`);
  const language = useSelector((state) => state.application.language);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById(divId);
      if (!element) return;

      try {
        const rect = element.getBoundingClientRect();
        const topInView = rect.top >= 0 && rect.top <= window.innerHeight;
        const bottomInView =
          rect.bottom >= 0 && rect.bottom <= window.innerHeight;

        if (topInView || bottomInView) {
          setIsVisible(true);
          window.removeEventListener("scroll", handleScroll);
        }
      } catch (error) {
        console.error("Error occurred while handling scroll:", error);
      }
    };

    try {
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    } catch (error) {
      console.error("Error occurred while adding scroll listener:", error);
    }
  }, [divId]);

  useEffect(() => {
    // Declare fallbackTimeoutId variable outside the conditional block
    let fallbackTimeoutId;

    if (isVisible && !imageLoaded) {
      const highDefinitionImageUrl = highDefinitionImgUrl;
      const img = new Image();

      img.onload = () => {
        clearTimeout(fallbackTimeoutId);
        setImageUrl(highDefinitionImageUrl);
        setImageLoaded(true);
      };

      img.onerror = () => {
        console.error(
          "Error loading high-definition image:",
          highDefinitionImageUrl
        );
        clearTimeout(fallbackTimeoutId);
        setImageUrl(backgroundImageUrl);
        setImageLoaded(true);
      };

      img.src = highDefinitionImageUrl;

      // Assign the timeout ID to fallbackTimeoutId
      fallbackTimeoutId = setTimeout(() => {
        setImageUrl(backgroundImageUrl);
        setImageLoaded(true);
      }, 5000);
    }

    // Clean up by clearing the timeout when the component unmounts
    return () => {
      clearTimeout(fallbackTimeoutId);
    };
  }, [isVisible, imageLoaded, highDefinitionImgUrl, backgroundImageUrl]);

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
    fontFamily: language === "fr" ? "Neue_Power-fr" : fontFamilyBold,
    fontSize: responsiveState.fixedFontSize,
  };
  return (
    <HoverableDiv id={divId}>
      <Link to={`/${action}`}>
        <CenteredContainer
          className={`${style.container}`}
          style={containerStyles}
        >
          <div style={descriptionStyles}>
            <p style={paragraphStyles}>
              {descriptionContent || "Description Content"}
            </p>
          </div>
        </CenteredContainer>
      </Link>
    </HoverableDiv>
  );
};

export const HoverableDiv = ({ children, id }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.09,
        transition: { duration: 0.5 },
      }}
      transition={{ type: "spring", stiffness: 100 }}
      whileTap={{ scale: 0.905 }}
      id={id}
      style={{ cursor: "pointer", margin: "0 auto" }}
    >
      {children}
    </motion.div>
  );
};

export default ImageCardWithDescriptionFooter;
