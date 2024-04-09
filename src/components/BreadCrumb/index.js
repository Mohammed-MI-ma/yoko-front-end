import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const BreadCrumb = ({ children }) => {
  const language = useSelector((state) => state.application.language);
  const dynamicWidth = useSelector((state) => state.application.dynamicWidth);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 3);

    return () => clearTimeout(timeoutId);
  }, []);
  const pageFooterStyle = {
    backgroundColor: "var(--color-secondary)",
  };
  return (
    <div
      style={{
        ...pageFooterStyle,
        direction: language === "ar" ? "rtl" : "ltr",
      }}
      className={`w-full flex flex-col items-center`}
    >
      <div
        className="flex flex-col items-start justify-center"
        style={{
          width: dynamicWidth,
          height: 107,
          direction: language === "ar" ? "rtl" : "ltr",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default BreadCrumb;
