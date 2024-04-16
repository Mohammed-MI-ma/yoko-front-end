import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Button, Image, Empty, ConfigProvider } from "antd";

import CenteredContainer from "../CenteredContainer";
import DrawerGeneric from "../DrawerGeneric";

import useFontFamily from "../../utils/useFontFamily";

const CartDrawer = ({ openCart, onCloseCart }) => {
  const { t, i18n } = useTranslation();

  const fontFamilyBold = useFontFamily(i18n.language, "bold");
  const fontFamilyLight = useFontFamily(i18n.language, "normal");

  const cart = useSelector((state) => state.marketPlace?.cartME);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimaryHover: "#65b44a",
        },
      }}
    >
      <DrawerGeneric
        open={openCart}
        onClose={onCloseCart}
        titre={
          <h1
            style={{
              borderRadius: "50px",
              fontFamily: fontFamilyLight,
              color: "var(--color-primary)",
            }}
          >
            {t("Les produits ajoutés au panier")}
          </h1>
        }
      >
        <div
          className="shadow-md"
          style={{
            height: "70%",
            overflowY: "scroll",
            alignItems: "start",
            flexDirection: "column",
            borderRadius: "var(--border-radius-large)",
          }}
        >
          {cart.length > 0 ? (
            cart?.map((e) => {
              let variantRecovered = {};
              for (let i = 0; i < e.product?.variants?.length; i++) {
                if (e?.product?.variants[i]?._id === e?.variant) {
                  variantRecovered = e?.product?.variants[i];
                }
              }
              console.log("variantRecovered", variantRecovered?.images);
              return (
                <>
                  <div className="border rounded flex gap-5 p-5 m-2">
                    <Image
                      width={60}
                      src={
                        variantRecovered?.images?.[0]?.response
                          ?.downloadURL?.[0]
                      }
                    />
                    <div className="w-full">
                      <div style={{ height: "80%" }}>
                        <h1
                          style={{
                            fontSize: "var(--font-medium-size)",
                            fontFamily: fontFamilyLight,
                          }}
                        >
                          {e.product?.description}
                        </h1>
                      </div>
                      <footer
                        style={{ height: "20%" }}
                        className="flex justify-between w-full"
                      >
                        <p>Qté:{e?.quantity}</p>
                        <p
                          style={{
                            fontSize: "var(--font-large-size)",
                            fontFamily: fontFamilyBold,
                            color: "var(--color-primary)",
                          }}
                        >
                          {variantRecovered?.price} MAD{" "}
                        </p>
                      </footer>
                    </div>
                  </div>
                  <br />
                </>
              );
            })
          ) : (
            <CenteredContainer className={"h-full"}>
              <Empty
                description={
                  <p style={{ fontFamily: fontFamilyLight }}>
                    {t("Panier vide")}
                  </p>
                }
              />
            </CenteredContainer>
          )}
        </div>
        <CenteredContainer
          style={{
            height: "30%",
            justifyContent: "flex-end",
            gap: "var(--spacing-small)",
            flexDirection: "column",
          }}
        >
          <Link to="/web/guest/market" className="w-full">
            <Button
              onClick={() => onCloseCart()}
              className="w-full"
              style={{
                borderRadius: "var(--border-radius-large)",
                background: "var(--color-primary)",
                fontFamily: fontFamilyLight,
                color: "var(--color-accent)",
              }}
            >
              {t("Continuer mes achats")}
            </Button>
          </Link>
          <Link to="/web/guest/cart" className="w-full">
            <Button
              className="w-full"
              onClick={() => onCloseCart()}
              style={{
                borderRadius: "var(--border-radius-large)",
                fontFamily: fontFamilyLight,
                color: "var(--color-primary)",
              }}
            >
              {t("Voir mon panier")}
            </Button>
          </Link>
        </CenteredContainer>
      </DrawerGeneric>
    </ConfigProvider>
  );
};

export default CartDrawer;
