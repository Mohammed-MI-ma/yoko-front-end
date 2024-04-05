import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const BreadCrumb = ({ children, language }) => {
  //__DISPATCH
  const d = useDispatch();

  //USE_TRANSLATION
  const { t } = useTranslation();
  //__DYNAMIC WIDTH
  const dynamicWidth = useSelector((state) => state.application.dynamicWidth);
  // Simulate a window resize event after 0.01 second
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 3);

    return () => clearTimeout(timeoutId);
  }, []);

  //__PAGE FOOTER STYLE
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
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default BreadCrumb;
