import React, { forwardRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

//242 Ko
import { glow } from "../../../images";

const HeroContainer = forwardRef(
  ({ bgColor, language, children, isGlow }, ref) => {
    const flexDirectionClass =
      language === "fr" ? "lg:flex-row-reverse" : "lg:flex-row";
    const [refInView, inView] = useInView();

    //__CONTROLS
    const controls = useAnimation();
    useEffect(() => {
      if (inView) {
        controls.start("visible");
      } else {
        controls.start("hidden");
      }
    }, [controls, inView]);

    return (
      <div
        className={`bg-cover h-full relative flex flex-col-reverse lg:flex-row items-center w-full ${flexDirectionClass}`}
        style={{
          backgroundImage: isGlow ? `url(${glow})` : "none",
          backgroundColor: bgColor,
          color: "var(--color-accent)",
        }}
        ref={ref || refInView}
      >
        {children}
      </div>
    );
  }
);

HeroContainer.propTypes = {
  language: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default HeroContainer;
