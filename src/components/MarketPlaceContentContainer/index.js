import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import MarketPlaceBriksComponent from "../MarketPlaceBriksComponent";
import { useTranslation } from "react-i18next";
import useFontFamily from "../../utils/useFontFamily";
import { useSelector } from "react-redux";
import CardProduct from "../CardProduct";
import { Result } from "antd";
import { FrownOutlined } from "@ant-design/icons";
const contentStyle = {
  textAlign: "center",
  color: "#fff",
  background: "white",
};
const MarketPlaceContentContainer = ({ onSearch, currentPage }) => {
  const { t, i18n } = useTranslation();
  const fontFamilyLight = useFontFamily(i18n.language, "normal");
  const products = useSelector((state) => state.marketPlace?.products?.data);

  return (
    <>
      {onSearch ? (
        <Content style={{ ...contentStyle }} id="anOtherContent">
          {products?.length ? (
            <div className="grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-3 items-center justify-center">
              {products.map((product) => (
                <CardProduct key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <Result
              icon={
                <FrownOutlined
                  spin
                  style={{ color: "var(--color-secondary)" }}
                />
              }
              title={
                <h1
                  style={{
                    fontFamily: fontFamilyLight,
                    fontSize: "var(--font-small-size)",
                  }}
                >
                  {t("Base de données produits vide")}
                </h1>
              }
              style={{
                margin: "var(--spacing-small)",
                border: "1px solid #D9D9D9",
                borderRadius: "var(--border-radius-large)",
              }}
            />
          )}
        </Content>
      ) : (
        <>
          {currentPage === "market" ? (
            <Content style={contentStyle}>
              {[
                {
                  title: t("Nouveautés"),
                  toPage: "/web/guest/market/newProducts",
                  category: null,
                },
                {
                  title: t("Cuisine"),
                  category: "Kitchen",
                  toPage: "/web/guest/market/Kitchen",
                },

                {
                  title: t("Hygiéne, Beauté"),
                  category: "Beauty",
                  toPage: "/web/guest/market/Beauty",
                },
                {
                  title: t("Entretien De La Maison"),
                  category: "home",
                  toPage: "/web/guest/market/Home",
                },
                {
                  title: t("Healthy Lifestyle"),
                  category: "sports",
                  toPage: "/web/guest/market/Sports",
                },
              ].map((props, index) => (
                <MarketPlaceBriksComponent key={index} {...props} />
              ))}
            </Content>
          ) : (
            <Content style={{ ...contentStyle }} id="anOtherContent">
              {products?.length ? (
                <div className="grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-3 items-center justify-center">
                  {products.map((product) => (
                    <CardProduct key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <Result
                  icon={
                    <FrownOutlined
                      spin
                      style={{ color: "var(--color-secondary)" }}
                    />
                  }
                  title={
                    <h1
                      style={{
                        fontFamily: fontFamilyLight,
                        fontSize: "var(--font-small-size)",
                      }}
                    >
                      {t("Base de données produits vide")}
                    </h1>
                  }
                  style={{
                    margin: "var(--spacing-small)",
                    border: "1px solid #D9D9D9",
                    borderRadius: "var(--border-radius-large)",
                  }}
                />
              )}
            </Content>
          )}
        </>
      )}{" "}
    </>
  );
};

export default MarketPlaceContentContainer;
