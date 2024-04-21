import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

import { Input } from "antd";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";

import useFontFamily from "../../utils/useFontFamily";
import { setIsAllowedToAddNewProduct } from "../../reducers/applicationService/product/productSlice";
import { searchProductMeiliSearchByCategory } from "../../reducers/applicationService/marketPlace/marketPlaceActions";

const ProductSearchEngineMarketPlace = ({
  searchTerm,
  setSearchTerm,
  customPrefix,
}) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const fontFamilyLight = useFontFamily(i18n.language, "normal");

  const handleSearch = useCallback(
    (value) => {
      setSearchTerm(value);
      dispatch(
        searchProductMeiliSearchByCategory({
          query: value,
          t,
          category: customPrefix,
        })
      );
    },
    [dispatch, t, setSearchTerm]
  );

  useEffect(() => {
    dispatch(
      searchProductMeiliSearchByCategory({
        query: "",
        t,
        category: customPrefix,
      })
    );
  }, [customPrefix, t]);

  useEffect(() => {
    if (searchTerm === "") {
      dispatch(setIsAllowedToAddNewProduct(false));
    } else {
      dispatch(setIsAllowedToAddNewProduct(true));
    }
  }, [dispatch, searchTerm]);

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
            &nbsp;<p style={{ fontSize: ".75rem" }}>/{t(customPrefix)}</p>
          </>
        }
        allowClear
        size="large"
        placeholder={memoizedTranslations.placeholder}
        style={{
          borderRadius: "6.25rem",
          fontFamily: fontFamilyLight,
        }}
        onChange={(e) => handleSearch(e.target.value)}
        value={searchTerm}
      />
    </section>
  );
};

export default ProductSearchEngineMarketPlace;
