import React, { useState } from "react";
import CenteredContainer from "../CenteredContainer";
import useFontFamily from "../../utils/useFontFamily";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { motion } from "framer-motion";

import {
  HeartOutlined,
  ShoppingCartOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import ProdutCartModal from "../ProdutCartModal";
const CardProduct = ({ key, product }) => {
  const { i18n } = useTranslation();
  const fontFamilyBold = useFontFamily(i18n.language, "bold");
  const fontFamilyLight = useFontFamily(i18n.language, "normal");

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.userInfo); // Assuming user is stored in the Redux state

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.5 },
      }}
      transition={{ type: "spring", stiffness: 100 }}
      whileTap={{ scale: 0.985 }}
      key={key}
      style={{
        margin: "1rem",
        height: "20.4375rem", // Converted from 327px to rem (327 / 16)
        width: "15rem", // Converted from 236px to rem (236 / 16)
        borderRadius: "1.875rem", // Converted from 30px to rem (30 / 16)
        border: "0.125rem solid #D9D9D9", // Converted from 2px to rem (2 / 16)
        display: "flex", // Use flexbox
        flexDirection: "column", // Stack children vertically
        cursor: "pointer",
      }}
    >
      <CenteredContainer style={{ height: "200px", color: "black" }}>
        <img
          src={product?.variants[0]?.images[0]?.response?.downloadURL}
          width="100px"
          height="fit-content"
          alt={product?.alt}
        />
      </CenteredContainer>
      <footer
        style={{
          flexGrow: 1,
          color: "black",
          display: "flex",
          alignContent: "space-around",
          flexDirection: "column",
        }}
      >
        <p
          style={{
            fontFamily: fontFamilyBold,
            fontSize: "var(--font-small-size)",
          }}
        >
          {product?.name.slice(0, 60)}
        </p>
        <p
          style={{
            margin: "1rem",
            fontFamily: fontFamilyLight,
            fontSize: "var(--font-small-size)",
          }}
        >
          {product?.description.slice(0, 60)}
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: isLoggedIn ? "space-between" : "center",
            flexGrow: "1",
            alignItems: " flex-end",
            margin: "var(--spacing-small)",
          }}
        >
          <div
            style={{
              fontFamily: fontFamilyBold,
              fontSize: "var(--font-medium-size)",
              color: "var(--color-primary)",
            }}
          >
            {product?.variants[0]?.price} MAD
          </div>
          {isLoggedIn && (
            <CenteredContainer style={{ gap: "10px" }}>
              {user?.role === "admin" && (
                <Button
                  shape="circle"
                  className="flex items-center justify-center "
                  style={{ border: "1px solid var(--color-primary)" }}
                >
                  <DashboardOutlined />
                </Button>
              )}
              {user?.role !== "admin" && (
                <>
                  <Button
                    shape="circle"
                    className="flex items-center justify-center "
                    style={{ border: "1px solid var(--color-primary)" }}
                  >
                    <HeartOutlined />
                  </Button>
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    shape="circle"
                    className="flex items-center justify-center "
                    style={{ border: "1px solid black" }}
                  >
                    <ShoppingCartOutlined />
                  </Button>
                </>
              )}
            </CenteredContainer>
          )}
        </div>
      </footer>
      <ProdutCartModal
        product={product}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
      />
    </motion.div>
  );
};

export default CardProduct;
