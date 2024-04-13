import React, { useCallback, useEffect, useMemo } from "react";
import { Input, Divider } from "antd";
import { SiMeilisearch } from "react-icons/si";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { TbUrgent } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";

import CenteredContainer from "../CenteredContainer";
import { searchProductMeiliSearch } from "../../reducers/applicationService/product/productActions";
import useFontFamily from "../../utils/useFontFamily";
import style from "./ProductSearchEngine.module.css";
import { setIsAllowedToAddNewDeliveryBoy } from "../../reducers/applicationService/delivery/deliverySlice";
import { setIsAllowedToAddNewProduct } from "../../reducers/applicationService/product/productSlice";

const ProductSearchEngineMarketPlace = ({ searchTerm, setSearchTerm }) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const fontFamilyLight = useFontFamily(i18n.language, "normal");

  const handleSearch = useCallback(
    (value) => {
      setSearchTerm(value);
      dispatch(searchProductMeiliSearch({ query: value, t }));
    },
    [dispatch, t, setSearchTerm]
  );

  useEffect(() => {
    // Vérifie si searchTerm est vide
    if (searchTerm === "") {
      // Dispatchez votre action ici lorsque searchTerm est vide
      dispatch(setIsAllowedToAddNewProduct(false));
    } else {
      dispatch(setIsAllowedToAddNewProduct(true));
    }
  }, [dispatch, searchTerm]); // searchTerm est une dépendance de l'effet useEffect

  const memoizedTranslations = useMemo(() => {
    return {
      placeholder: t("RechercherDansYOKOMarket"),
      poweredByMeiliSearch: t("poweredByMeiliSearch"),
    };
  }, [t]);
  return (
    <section className={"w-full"}>
      <Input
        prefix={
          <>
            <FaSearch />
          </>
        }
        allowClear
        size="large"
        placeholder={memoizedTranslations.placeholder}
        style={{
          borderRadius: "100px",
          fontFamily: fontFamilyLight,
        }}
        onChange={(e) => handleSearch(e.target.value)}
        value={searchTerm}
      />
    </section>
  );
};

export default ProductSearchEngineMarketPlace;
