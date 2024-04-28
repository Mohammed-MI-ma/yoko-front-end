import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Input, message } from "antd";
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
  const language = useSelector((state) => state.application.language);

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
        suffix={
          <>
            {language === "ar" && (
              <>
                <p style={{ fontSize: ".75rem", fontFamily: fontFamilyLight }}>
                  /{t(customPrefix)}
                </p>
                <FaSearch />
              </>
            )}
          </>
        }
        prefix={
          <>
            {language !== "ar" && (
              <>
                <FaSearch />
                <p style={{ fontSize: ".75rem", fontFamily: fontFamilyLight }}>
                  /{t(customPrefix)}
                </p>
              </>
            )}
          </>
        }
        allowClear
        size="large"
        onKeyPress={(e) => preventArabicInput(e, fontFamilyLight, t)}
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
export function preventArabicInput(event, font, t) {
  var charCode = event.which || event.keyCode;
  if (charCode >= 0x0600 && charCode <= 0x06ff) {
    message.warning(<p style={{ fontFamily: font }}>{t("Please note")}</p>);
    event.preventDefault();
  }
}
