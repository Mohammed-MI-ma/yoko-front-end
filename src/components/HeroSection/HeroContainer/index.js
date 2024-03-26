import React, { forwardRef, useEffect } from "react";
import { glow } from "../../../images";
import PropTypes from "prop-types";
import { useAnimation } from "framer-motion";
//__REACT__OBSERVER
import { useInView } from "react-intersection-observer";
import useResponsiveState from "../../../utils/useResponsiveState";

const HeroContainer = forwardRef(({ language, children }, ref) => {
  // Determine the direction of flex items based on language
  const flexDirectionClass =
    language === "fr" ? "lg:flex-row-reverse" : "lg:flex-row";

  //__USE_IN_VIEW
  //__USE_IN_VIEW
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
  const {
    isMobile,
    isSmallDevice,
    isMediumDevice,
    isLargeDevice,
    isExtraLargeDevice,
    isExtraExtraLargeDevice,
    setIsMobile,
    setIsSmallDevice,
    setIsLargeDevice,
    setIsExtraLargeDevice,
    setIsMediumDevice,
    setIsExtraExtraLargeDevice,
  } = useResponsiveState();
  return (
    <section
      className={`bg-cover relative flex flex-col-reverse lg:flex-row items-center w-full ${flexDirectionClass}`}
      style={{
        backgroundImage: `url(${glow})`,
        height: `calc(100vh - ${
          isMobile ? "-7rem" : isSmallDevice ? "8rem" : "4.0625rem"
        } )`,
        backgroundColor: "var(--color-secondary)",
        color: "var(--color-accent)",
      }}
      ref={ref || refInView}
    >
      {children}
    </section>
  );
});

HeroContainer.propTypes = {
  language: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default HeroContainer;
