import React, { useEffect, useState } from "react";
import { Divider, Input, ColorPicker, Button } from "antd";
import useFontFamily from "../../utils/useFontFamily";
import { useTranslation } from "react-i18next";
import { Label } from "../../utils/productUtils";
import PicturesWall from "../PicturesWall";

const ProductsVariants = ({ pushVariantsProduct }) => {
  const { t, i18n } = useTranslation();
  const fontFamilyLight = useFontFamily(i18n.language, "normal");
  const fontFamilyBold = useFontFamily(i18n.language, "bold");

  const [variantsProduct, setVariantsProduct] = useState([
    { sku: "", size: "", color: "", quantity: 0, images: [] },
  ]);

  const addVariant = () => {
    setVariantsProduct([...variantsProduct, {}]);
  };

  const handleVariantChange = (index, field, value) => {
    setVariantsProduct((prevVariants) => {
      const updatedVariants = [...prevVariants];
      updatedVariants[index] = {
        ...updatedVariants[index],
        [field]: value,
      };
      return updatedVariants;
    });
  };
  useEffect(() => {
    pushVariantsProduct(variantsProduct);
  }, [variantsProduct]);

  return (
    <>
      <Divider
        style={{
          fontFamily: fontFamilyLight,
          marginTop: "var(--spacing-medium)",
        }}
      >
        {variantsProduct.length}&nbsp; {t("variantes")}
      </Divider>
      <div className="border p-5 rounded ">
        {variantsProduct.map((variant, index) => (
          <div key={index} className="mb-5">
            <div className="w-100 flex justify-center">
              <h1
                style={{
                  fontFamily: fontFamilyLight,
                  textTransform: "uppercase",
                }}
              >
                Variante produit n° {index + 1}
              </h1>
            </div>
            <div>
              <Label htmlFor={`sku-${index}`}>{t("SKU")}</Label>

              <Input
                id={`sku-${index}`}
                value={variant.sku}
                onChange={(e) =>
                  handleVariantChange(index, "sku", e.target.value)
                }
                rows={4}
                cols={50}
              />
            </div>

            <div>
              <Label htmlFor={`color-${index}`}>{t("color")}</Label>
              <ColorPicker
                id={`color-${index}`}
                value={variant.color}
                onChange={(e) =>
                  handleVariantChange(index, "color", e.target.value)
                }
              />
            </div>

            <div>
              <Label>{t("Price")}</Label>

              <Input
                type="number"
                allowClear
                suffix={<p style={{ fontFamily: fontFamilyBold }}>DIRHAM</p>}
                value={variant.quantity}
                onChange={(e) =>
                  handleVariantChange(
                    index,
                    "quantity",
                    parseInt(e.target.value)
                  )
                }
                rows={4}
                cols={50}
              />
            </div>
            <div>
              <Label>{t("Size")}</Label>

              <Input
                allowClear
                value={variant.size}
                onChange={(e) =>
                  handleVariantChange(index, "size", e.target.value)
                }
                rows={4}
                cols={50}
              />
            </div>
            <Label>{t("Photo")}</Label>
            <PicturesWall />
            <hr></hr>
            <div className="w-full flex align-center justify-center mt-5">
              {index !== 0 && (
                <Button
                  onClick={addVariant}
                  className="w-50"
                  danger
                  style={{
                    fontFamily: fontFamilyLight,
                  }}
                >
                  Supprimer Variant
                </Button>
              )}
            </div>
          </div>
        ))}
        <div className="w-full flex align-center justify-center mt-5">
          <Button
            onClick={addVariant}
            className="w-50"
            style={{
              fontFamily: fontFamilyLight,
              background: "var(--color-secondary)",
              color: "white",
              borderRadius: "100px",
            }}
          >
            Add Variant
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductsVariants;
