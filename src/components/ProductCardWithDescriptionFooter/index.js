import React, { useState, useEffect } from "react";
import style from "./ProductCardWithDescriptionFooter.module.css";
import useResponsiveState from "../../utils/useResponsiveState";
import { Button } from "antd";
import { motion } from "framer-motion";

import { ShoppingCartOutlined, LikeOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const ProductCardWithDescriptionFooter = ({
  fixedWidth,
  highDefinitionImgUrl,
  fixedHeight,
  backgroundImageUrl,
  descriptionContent,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState(backgroundImageUrl);
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
    if (isVisible && !imageLoaded) {
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
        // setImageUrl(Error404); // Set your default image URL here
        setImageLoaded(true);
      }, 5000); // Set the timeout duration (in milliseconds) as needed
    }
  }, [isVisible, imageLoaded, highDefinitionImgUrl]);

  const containerStyles = {
    border: ".25px solid #D9D9D9",
    borderBottom: "0px",
    width: fixedWidth || "100%", // Use fixed width or full width if not provided
    height: fixedHeight || "auto", // Use fixed height or auto height if not provided
    position: "relative",
    backgroundColor: "white",
    borderTopLeftRadius: responsiveState.fixedBorderRadius,
    borderTopRightRadius: responsiveState.fixedBorderRadius,
  };
  const productImageStyles = {
    width: "100%",
    display: "flex",
    height: "100%",
    alignItems: "center",
    alignContent: "center",
    justifyContent: " center",
  };
  const descriptionStyles = {
    border: ".25px solid #D9D9D9",
    padding: "5px",
    borderTop: "0px",
    position: "absolute",
    flexDirection: "column",
    bottom: 0,
    height: `calc(${responsiveState.fixedHeight} / 3)`,
    width: "101%",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    color: "black",
    alignItems: "center",
    transform: "translateY(100%)",
    borderBottomLeftRadius: responsiveState.fixedBorderRadius,
    borderBottomRightRadius: responsiveState.fixedBorderRadius,
  };
  const paragraphStyles = {
    fontSize: responsiveState.fixedFontSize_ProductCard,

    fontFamily: "Primary-Regular-fr",
    textAlign: "left",
    fontWeight: "600",
  };
  const footerStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  };

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      id={divId}
      style={{ cursor: "pointer", margin: " 0 auto" }}
    >
      <div
        className={`flex justify-center items-center ${style.container}`}
        style={containerStyles}
      >
        <div style={productImageStyles}>
          <img
            alt=""
            width={"90%"}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </div>
        {/* Render description div */}
        <div style={descriptionStyles}>
          {/* Add your description content here */}
          <div style={{ transform: "translateY(-12%)" }}>
            <p style={paragraphStyles}>
              {descriptionContent || "Description Content"}
            </p>
            <footer style={footerStyles}>
              <b
                style={{
                  fontSize: responsiveState.fixedFontSize_ProductCard,
                  fontWeight: "700",
                  color: "var(--color-primary)",
                  fontFamily: "Primary-Bold-fr",
                }}
              >
                100.64 MAD
              </b>
              <div>
                <Button shape="circle" icon={<LikeOutlined />} />
                &nbsp;
                <Button
                  shape="circle"
                  style={{ background: "var(--color-primary)", color: "white" }}
                  icon={<ShoppingCartOutlined />}
                />
              </div>
            </footer>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCardWithDescriptionFooter;
