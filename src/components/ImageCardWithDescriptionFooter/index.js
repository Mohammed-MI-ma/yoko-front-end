import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import useFontFamily from "../../utils/useFontFamily";
import useResponsiveState from "../../utils/useResponsiveState";
import CenteredContainer from "../CenteredContainer";

import style from "./ImageCardWithDescriptionFooter.module.css";

const ImageCardWithDescriptionFooter = ({
  highDefinitionImgUrl,
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
    backgroundImage: `url(${imageUrl})`,
  };

  const paragraphStyles = {
    fontFamily: language === "fr" ? "Neue_Power-fr" : fontFamilyBold,
    fontSize: responsiveState.fixedFontSize,
  };
  return (
    <HoverableDiv id={divId}>
      <Link to={`/${action}`}>
        <CenteredContainer
          className={`${style.mainCard} shadow-lg rounded-lg`}
          style={containerStyles}
        >
          <CenteredContainer>
            <p style={paragraphStyles} className="rounded-lg">
              {descriptionContent || "Description Content"}
            </p>
          </CenteredContainer>
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
