import React from "react";

const HeroContainer = ({ bgColor, language, children }) => {
  const flexDirectionClass =
    language === "fr" ? "lg:flex-row-reverse" : "lg:flex-row";

  return (
    <div
      className={`bg-cover h-full relative flex flex-col-reverse lg:flex-row items-center w-full ${flexDirectionClass}`}
      style={{
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
