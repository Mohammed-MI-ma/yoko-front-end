import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import BreadCrumb from "../../components/BreadCrumb";
import useFontFamily from "../../utils/useFontFamily";

//ICONS
import { MdDashboard } from "react-icons/md";

import { Breadcrumb } from "antd";
import ProductSearchEngineMarketPlace from "../../components/ProductSearchEngine_MarketPlace";
import MarketPlaceContentContainer from "../../components/MarketPlaceContentContainer";
import BreadCrumbContent from "../../components/BreadCrumbContent";

import MarketMenuMobile from "../../components/MarketMenuMobile";
import SkeletonMarketplace from "../../components/MarketPlaceSkeleton";
import useDirection from "../../utils/useDirection";

const MarketPage = () => {
  const { t, i18n } = useTranslation();
  const language = useSelector((state) => state.application.language);

  const [searchTerm, setSearchTerm] = useState("");

  const fontFamilyLight = useFontFamily(i18n.language, "normal");

  const location = useLocation();
  const path = location.pathname;
  const lastItem = path.substring(path.lastIndexOf("/") + 1);

  return (
    <>
      <BreadCrumb>
        <BreadCrumbContent />
      </BreadCrumb>
      <div
        className={`flex flex-col bg-cover bg-right-bottom border-b-0 w-full relative min-h-screen md:min-h-3/4 mx-auto rounded-br-full rounded-bl-full`}
      >
        <Breadcrumb
          style={{
            fontSize: "var(--font-tiny-size)",
            marginBottom: "2rem",
            fontWeight: "700",
            direction: language === "ar" ? "rtl" : "ltr",
          }}
          items={[
            {
              title: (
                <h1 style={{ fontFamily: fontFamilyLight }}>
                  {t("Casablanca")}
                </h1>
              ),
            },

            {
              title: (
                <h1 style={{ fontFamily: fontFamilyLight }}>
                  {t("YOKO Market")}
                </h1>
              ),
            },
          ]}
        />

        <SkeletonMarketplace
          marketPlaceContentContainer={
            <MarketPlaceContentContainer
              onSearch={searchTerm !== ""}
              currentPage={lastItem}
            />
          }
          searchEngine={
            <ProductSearchEngineMarketPlace
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              customPrefix={lastItem}
            />
          }
        />
      </div>
      <MarketMenuMobile />
    </>
  );
};

export default MarketPage;
export const SiderStyleLabel = ({ font, children }) => {
  const { i18n } = useTranslation();

  const direction = useDirection(i18n.language);

  return (
    <div
      dir={direction}
      className="flex flex-row items-center"
      style={{ color: "var(--color-primary)" }}
    >
      <MdDashboard />
      <p style={{ fontFamily: font }}>{children}</p>
    </div>
  );
};
