import React, { useEffect, useState } from "react";
import { Divider, Input, Button, message, Select } from "antd";
import useFontFamily from "../../utils/useFontFamily";
import { useTranslation } from "react-i18next";
import { Label } from "../../utils/productUtils";
import PicturesWall from "../PicturesWall";
import axios from "axios";

const ProductsVariants = ({ pushVariantsProduct }) => {
  const { t, i18n } = useTranslation();
  const fontFamilyLight = useFontFamily(i18n.language, "normal");

  const [variantsProduct, setVariantsProduct] = useState([
    { sku: "", attributes: {}, quantity: 0, images: [], price: "" },
  ]);

  const addVariant = () => {
    setVariantsProduct([...variantsProduct, {}]);
  };

  const handleVariantChange = (index, field, value) => {
    console.log(index, field, value);
    setVariantsProduct((prevVariants) => {
      const updatedVariants = [...prevVariants];
      const validFields = [
        "name",
        "description",
        "category",
        "brand",
        "sku",
        // "quantity",
        "images",
        "price",
      ];

      if (validFields.includes(field)) {
        updatedVariants[index] = {
          ...updatedVariants[index],
          [field]: value,
        };
      } else {
        updatedVariants[index] = {
          ...updatedVariants[index],
          attributes: {
            ...updatedVariants["variants"]?.attributes,
            [field]: value,
          },
        };
      }

      return updatedVariants;
    });
  };

  useEffect(() => {
    pushVariantsProduct(variantsProduct);
  }, [variantsProduct]);

  const handleDeleteVariant = (index) => {
    setVariantsProduct((prevVariants) => {
      const updatedVariants = [...prevVariants];
      console.log("old", prevVariants);
      const removedElt = updatedVariants.splice(index, 1);
      if (removedElt[0]?.images?.length !== 0)
        for (let i = 0; i < removedElt[0]?.images.length; i++) {
          const elt = removedElt[0]?.images[i];
          let config = {
            method: "delete",
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_BASE_API_URI_DEV}api/application/product/images/${elt?.response?.fileName}`,
            headers: {},
          };
          axios
            .request(config)
            .then((response) => {
              console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
              console.log(error);
            });
        }
      console.log("removedElt", removedElt);
      return updatedVariants;
    });
    message.success("Variant deleted successfully!");
  };
  return (
    <>
      <Divider
        style={{
          fontFamily: fontFamilyLight,
          marginTop: "var(--spacing-medium)",
        }}
      >
        {variantsProduct?.length}&nbsp; {t("variantes")}
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
              <Label htmlFor={`sku-${index}`}>{t("SKU")}/référence</Label>

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
              <Label>{t("Price")}</Label>
              <Input
                type="number"
                allowClear
                suffix={<p style={{ fontFamily: fontFamilyLight }}>MAD</p>}
                value={variant.price}
                onChange={(e) =>
                  handleVariantChange(index, "price", parseInt(e.target.value))
                }
                rows={4}
                cols={50}
              />
            </div>
            {/*<div>
              <Label>{t("Quantité en stock")}</Label>
              <Input
                name="quantity"
                allowClear
                value={variant.size}
                onChange={(e) =>
                  handleVariantChange(index, "quantity", e.target.value)
                }
                rows={4}
                cols={50}
              />
              </div>*/}
            <Divider
              style={{
                fontFamily: fontFamilyLight,
                marginTop: "var(--spacing-medium)",
                fontSize: "10px",
              }}
            >
              Attributs
            </Divider>
            <div>
              <Label>{t("unité")}</Label>
              <Select
                name="unit"
                defaultValue="gramme"
                style={{
                  width: "100%",
                }}
                onChange={(value) => handleVariantChange(index, "unit", value)}
                options={[
                  {
                    value: "gramme",
                    label: "gramme",
                  },
                  {
                    value: "litre",
                    label: "litre",
                  },
                ]}
              />
            </div>
            <div>
              <Label>{t("capacité")}</Label>
              <Input
                name="capacity"
                allowClear
                value={variant.size}
                onChange={(e) =>
                  handleVariantChange(index, "capacity", e.target.value)
                }
                rows={4}
                cols={50}
              />
            </div>

            <Label>
              {t("Images du produit ( au maximum 3, au plus 300kb chacune )")}
            </Label>
            <PicturesWall
              handleVariantChange={handleVariantChange}
              index={index}
            />
            <hr></hr>
            <div className="w-full flex align-center justify-center mt-5">
              {index !== 0 && (
                <Button
                  onClick={() => handleDeleteVariant(index)}
                  className="w-50 rounded"
                  danger
                  style={{
                    fontFamily: fontFamilyLight,
                  }}
                >
                  Supprimer Variante
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
            Add Variante
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductsVariants;
