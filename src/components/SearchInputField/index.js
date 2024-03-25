import React from "react";
import { Input } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const SearchInputField = () => {
  // Hooks
  const lang = useSelector((state) => state.application.language);
  const { t } = useTranslation();

  const onSearch = (value, _e, info) => {
    console.log(info?.source, value);
    // Add your search logic here
  };

  return (
    <Input.Search
      placeholder={t("Search")}
      onSearch={onSearch}
      style={{
        width: 200,
        direction: lang === "ar" ? "rtl" : "ltr", // Set direction based on language
      }}
    />
  );
};

export default SearchInputField;
