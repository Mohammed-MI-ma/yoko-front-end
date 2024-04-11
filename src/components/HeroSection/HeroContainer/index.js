import React from "react";

//242 Ko
import { glow } from "../../../images";

const HeroContainer = ({ bgColor, language, children, isGlow }) => {
  const flexDirectionClass =
    language === "fr" ? "lg:flex-row-reverse" : "lg:flex-row";

  return (
    <div
      className={`bg-cover h-full relative shadow-lg flex flex-col-reverse lg:flex-row items-center w-full ${flexDirectionClass}`}
      style={{
        backgroundImage: isGlow ? `url(${glow})` : "none",
        backgroundColor: bgColor,
        color: "var(--color-accent)",
        maxWidth: "62.5rem",
      }}
    >
      {children}
    </div>
  );
};

export default HeroContainer;
