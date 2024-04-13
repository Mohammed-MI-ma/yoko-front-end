import { Button, Divider, Input, Segmented } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useFontFamily from "../../utils/useFontFamily";
import { useSelector } from "react-redux";

import { GiClothes } from "react-icons/gi";
import { MdSoupKitchen } from "react-icons/md";
import { SiBookstack } from "react-icons/si";
import { GiHealthNormal } from "react-icons/gi";
import { MdOutlineSportsGymnastics } from "react-icons/md";
import { MdToys } from "react-icons/md";
import { FaCouch } from "react-icons/fa6";
import { VscCircuitBoard } from "react-icons/vsc";

import {
  Label,
  TemplateProduct,
  productOptions,
  productOptionsExtension,
} from "../../utils/productUtils";
import { Select } from "antd";
import ProductsVariants from "../ProductVariants";
import { Brands } from "./brands";

const { TextArea } = Input;

const useSpecificObject = () => {
  const specificObject = useSelector((state) => state.product.specificObject);
  return specificObject;
};

const ProductDetails = ({ onSave, flag }) => {
  const { t, i18n } = useTranslation();
  const specificObject = useSpecificObject();

  const fontFamilyLight = useFontFamily(i18n.language, "normal");
  const loading = useSelector((state) => state.delivery.loadingDeliveryBoy);
  const [isFormValid, setIsFormValid] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    variants: [
      {
        sku: "",
        attributes: {},
        quantity: 0,
        price: 0,
        images: [],
      },
    ],
  });

  useEffect(() => {
    setProduct({
      name: specificObject?.name,
      description: specificObject?.firstName,
      category: specificObject?.category,
      brand: specificObject?.brand,
      variants: specificObject?.variants,
    });
  }, [specificObject]);

  const options = productOptions.map((option) => ({
    label: getCategories(option.index, t),
    value: option.value,
    disabled: option.disabled,
  }));
  const optionsExtension = productOptionsExtension.map((option) => ({
    label: getCategories(option.index, t),
    value: option.value,
    disabled: option.disabled,
  }));

  useEffect(() => {
    const isValid =
      product?.name &&
      product?.description &&
      product?.category &&
      product?.brand;
    setIsFormValid(isValid);
  }, [product?.name, product?.description, product?.category, product?.brand]);
  useEffect(() => {
    console.log("Product", product);
  }, [product]);

  const handleSave = () => {
    setProduct({
      name: "",
      description: "",
      category: "",
      brand: "",
      variants: [
        {
          attributes: {},
          sku: "",
          quantity: 0,
          images: [],
        },
      ],
    });

    onSave(
      flag === 1
        ? {
            productData: {
              name: product.name,
              description: product.description,
              category: product.category,
              brand: product.brand,
              variants: product.variants,
            },
          }
        : {
            id: specificObject._id,
            productData: {
              name: product.name,
              description: product.description,
              category: product.category,
              brand: product.brand,
              variants: product.variants,
            },
          }
    );
  };
  const handleChange = (e) => {
    try {
      let { name, value } = e.target;
      console.log("qsdsdqsd", e);
      setProduct({
        ...product,
        [name]: value,
      });
    } catch (error) {
      let name = "brand";
      let value = e;
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };
  const handleChangeCategory = (e) => {
    let name = "category";
    let value = e;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  const pushVariantsProduct = (e) => {
    let name = "variants";
    let value = e;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  return (
    <>
      <Divider style={{ fontFamily: fontFamilyLight, margin: 0 }}>
        {t("Description")}
      </Divider>
      {/*C'est Bon*/}
      <Label>{t("brand")}</Label>
      <Select
        name="brand"
        defaultValue="Lesieur"
        style={{
          width: "100%",
          fontFamily: fontFamilyLight,
        }}
        onChange={handleChange}
        options={Brands.map((brand) => ({
          value: brand.value,
          label: brand.label,
          disabled: brand.disabled,
        }))}
      />
      <Label>{t("productName")}</Label>
      <Input
        name="name"
        style={{ fontFamily: fontFamilyLight }}
        placeholder={t("productName")}
        value={product.name}
        disabled={flag !== 1}
        onChange={handleChange}
      />
      <Label>{t("description")}*</Label>
      <TextArea
        name="description"
        rows={4}
        allowClear
        value={product.description}
        style={{ fontFamily: fontFamilyLight }}
        onChange={handleChange}
      />

      <Divider
        style={{
          fontFamily: fontFamilyLight,
          marginTop: "var(--spacing-medium)",
        }}
      >
        {t("category")}
      </Divider>

      <Label>{t("choose category")}*</Label>
      <div style={{ overflow: "scroll" }}>
        <Segmented
          name="category"
          value={product.category}
          onChange={handleChangeCategory}
          size="large"
          options={options}
        />
        <Segmented
          disabled
          name="category"
          value={product.category}
          onChange={handleChangeCategory}
          size="large"
          options={optionsExtension}
        />
      </div>
      <ProductsVariants
        category={product.category}
        pushVariantsProduct={pushVariantsProduct}
      />
      <Button
        loading={loading}
        onClick={handleSave}
        disabled={!isFormValid}
        className="w-full mt-20"
        style={{
          fontFamily: fontFamilyLight,
          background: "var(--color-secondary)",
          color: "white",
        }}
      >
        {flag !== 1 ? <>Mettre a jour produit</> : <>Ajouter nouveau produit</>}
      </Button>
    </>
  );
};

export default ProductDetails;

const getCategories = (id, t) => {
  switch (id) {
    case 1:
      return <TemplateProduct text={t("Clothing")} icon={<GiClothes />} />;
    case 2:
      return <TemplateProduct text={t("Kitchen")} icon={<MdSoupKitchen />} />;
    case 3:
      return <TemplateProduct text={t("Books")} icon={<SiBookstack />} />;
    case 4:
      return <TemplateProduct text={t("Beauty")} icon={<VscCircuitBoard />} />;
    case 5:
      return (
        <TemplateProduct text={t("Electronics")} icon={<VscCircuitBoard />} />
      );
    case 6:
      return <TemplateProduct text={t("Decor")} icon={<FaCouch />} />;
    case 7:
      return <TemplateProduct text={t("Toys")} icon={<MdToys />} />;
    case 8:
      return (
        <TemplateProduct
          text={t("Sports")}
          icon={<MdOutlineSportsGymnastics />}
        />
      );
    default:
      return "";
  }
};
