import React from "react";

const HeroContainer = ({ className, bgColor, language, children, style }) => {
  const flexDirectionClass =
    language === "fr" ? "lg:flex-row-reverse" : "lg:flex-row";

  return (
    <div
      className={`${className} shadow-md bg-cover h-full relative flex flex-col-reverse lg:flex-row items-center w-full ${flexDirectionClass}`}
      style={{
        backgroundColor: bgColor,
        color: "var(--color-accent)",
        maxWidth: "62.5rem",
        borderRadius: "96px",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default HeroContainer;
