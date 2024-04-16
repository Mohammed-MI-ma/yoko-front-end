import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { useSelector } from "react-redux";
import useFontFamily from "../../utils/useFontFamily";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";

import { Button, ConfigProvider, Divider, Image, message } from "antd";
import { MdDashboard } from "react-icons/md";
import style from "./cartPage.module.css";
import useDirection from "../../utils/useDirection";
import CenteredContainer from "../../components/CenteredContainer";
import CartItem from "../../components/CartItem";

const CartPage = () => {
  const { t, i18n } = useTranslation();

  const language = useSelector((state) => state.application.language);
  const cart = useSelector((state) => state.marketPlace?.cartME);

  const fontFamilyBold = useFontFamily(i18n.language, "bold");
  const fontFamilyLight = useFontFamily(i18n.language, "normal");

  const direction = useDirection(i18n.language);

  return (
    <>
      <BreadCrumb language={language}>
        <BreadCrumbContent font={fontFamilyBold} t={t} />
      </BreadCrumb>
      <section className={`w-full`}>
        <div>
          <div className={style.container}>
            <div
              style={{ maxWidth: "62.5rem" }}
              className={`bg-cover h-full relative w-full `}
            >
              <div className={`flex flex-col ${style.containerExtend}`}>
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 w-full flex-grow ${style.grid}`}
                  dir={direction}
                >
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: "#65b44a",
                        borderRadius: 10,
                        fontSize: 10,
                        colorBorder: "#65b44a",
                      },
                      components: {
                        Button: {
                          defaultActiveBorderColor: "var(--color-primary)",
                        },
                      },
                    }}
                  >
                    <CenteredContainer className="text-center gap-2 flex-col">
                      2Produit
                      <div
                        style={{
                          height: "300px",
                          overflowY: "scroll",
                          alignItems: "start",
                          flexDirection: "column",
                          border: " 1px solid #e5e5e5",
                        }}
                      >
                        {cart?.map((e) => (
                          <CartItem item={e} />
                        ))}
                      </div>
                    </CenteredContainer>
                  </ConfigProvider>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      className={`flex justify-center relative p-10 items-start flex-col  w-full ${style.rect}`}
                    >
                      <div className="flex justify-between w-full">
                        <div>TOTAL PRODUIT</div>
                        <div>6</div>
                      </div>
                      <Divider />
                      <p style={{}}>TOTAL PRODUIT</p>
                      <Divider />
                      <div className="flex justify-between w-full">
                        <div>TOTAL</div>
                        <div>6</div>
                      </div>
                    </div>{" "}
                    <Button style={{ width: "100%" }}>Commander</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartPage;
export const SiderStyleLabel = ({ font, children }) => {
  return (
    <div
      className="flex flex-row items-center"
      style={{ color: "var(--color-primary)" }}
    >
      <MdDashboard />
      <p style={{ fontFamily: font }}>{children}</p>
    </div>
  );
};

const BreadCrumbContent = ({ font, t }) => {
  return (
    <h1
      style={{
        fontSize: "2rem",
        color: "var(--color-accent)",
        fontWeight: 700,
        fontFamily: font,
      }}
    >
      <span
        style={{
          color: "var(--color-primary)",
        }}
      >
        {t("YOKO")}
      </span>
      &nbsp;{t("Cart")}
    </h1>
  );
};
