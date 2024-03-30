import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import OurPartners from "../../components/OurPartners";
import ComingSoon from "../../components/ComingSoon";
import { useTranslation } from "react-i18next";
import { Breadcrumb } from "antd";
import { useSelector } from "react-redux";

const YOKOEatPage = ({ fixedHeight }) => {
  const dynamicWidth = useSelector((state) => state.application.dynamicWidth);

  const { t } = useTranslation();
  const containerStyles = {
    backgroundPosition: "top",
    backgroundSize: "cover",
    borderBottom: "0px",
    width: dynamicWidth || "100%", // Use fixed width or full width if not provided
    height: fixedHeight || "auto", // Use fixed height or auto height if not provided
    position: "relative",
    backgroundColor: "white",
    minHeight: "75vh",
    margin: "0 auto",
  };
  return (
    <>
      <BreadCrumb>
        <h1
          style={{
            fontSize: "40px",
            color: "white",
            fontWeight: 700,
            fontFamily: "Primary-Bold-fr",
          }}
        >
          <span
            style={{
              color: "var(--color-primary)",
            }}
          >
            YOKO
          </span>
          &nbsp; Eat
        </h1>
      </BreadCrumb>

      <div className={`flex `} style={containerStyles}>
        <Breadcrumb
          items={[
            {
              title: "Casablanca",
            },

            {
              title: "YOKO Eat",
            },
          ]}
        />

        <ComingSoon
          title={t("Fast Food")}
          style={{
            left: "50%",
            top: "50%",
            transform: " translate(-50%, -50%)",
            width: " max-content",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: 0,
          opacity: "0",
          transform: "scale(0.1)",
        }}
      >
        <OurPartners vierge />
      </div>
    </>
  );
};

export default YOKOEatPage;
