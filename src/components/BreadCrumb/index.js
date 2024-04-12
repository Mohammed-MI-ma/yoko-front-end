import React from "react";
import { useSelector } from "react-redux";
import useDirection from "../../utils/useDirection";
import { useTranslation } from "react-i18next";
import style from "./BreadCrumb.module.css";
import CenteredContainer from "../CenteredContainer";
const BreadCrumb = ({ children }) => {
  const { i18n } = useTranslation();

  const language = useSelector((state) => state.application.language);
  const direction = useDirection(i18n.language);

  const pageFooterStyle = {
    backgroundColor: "var(--color-secondary)",
  };
  return (
    <section className={`w-full`} dir={direction} style={pageFooterStyle}>
      <div>
        <CenteredContainer className={style.container}>
          <div
            style={{ maxWidth: "62.5rem" }}
            className={`bg-cover h-full relative w-full `}
          >
            <div
              className="flex flex-col items-start justify-center"
              style={{
                height: 107,
                direction: language === "ar" ? "rtl" : "ltr",
              }}
            >
              {children}
            </div>
          </div>
        </CenteredContainer>
      </div>
    </section>
  );
};

export default BreadCrumb;
