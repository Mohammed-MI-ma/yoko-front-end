import React from "react";
import { useSelector } from "react-redux";

const HeroContainer = ({ bgColor, children }) => {
  const language = useSelector((state) => state.application.language);

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
