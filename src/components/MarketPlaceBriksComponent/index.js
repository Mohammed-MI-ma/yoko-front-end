import React, { useEffect, useState } from "react";
import HeaderComponent from "../HeaderComponent";
import axios from "axios";
import CardProduct from "../CardProduct";
import { Result } from "antd";
import { useTranslation } from "react-i18next";
import useFontFamily from "../../utils/useFontFamily";
import { FrownOutlined } from "@ant-design/icons";

const MarketPlaceBriksComponent = ({ title, toPage, category }) => {
  const [products, setProducts] = useState([]);
  const { t, i18n } = useTranslation();
  const fontFamilyLight = useFontFamily(i18n.language, "normal");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (category !== null) {
          response = await axios.post(
            `${process.env.REACT_APP_BASE_API_URI_DEV}api/application/product/products`,
            { category, maxElements: 4 }
          );
        } else {
          response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URI_DEV}api/application/product/newest`
          );
        }
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();

    return () => {
      // Clean up function
    };
  }, []);

  return (
    <>
      <HeaderComponent toPage={toPage} category={category}>
        {title}
      </HeaderComponent>
      {products.length ? (
        <div className="grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-3 items-center justify-center">
          {products.map((product) => (
            <CardProduct key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <Result
          icon={
            <FrownOutlined spin style={{ color: "var(--color-secondary)" }} />
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
    </>
  );
};

export default MarketPlaceBriksComponent;
