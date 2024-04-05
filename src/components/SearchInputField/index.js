import React from "react";
import { ConfigProvider, Input } from "antd";
import { useTranslation } from "react-i18next";
import useFontFamily from "../../utils/useFontFamily";
import useDirection from "../../utils/useDirection";
import style from "./SearchInputField.module.css";
const SearchInputField = ({ className }) => {
  const { t, i18n } = useTranslation();
  const fontFamilylight = useFontFamily(i18n.language, "normal");
  const direction = useDirection(i18n.language);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#65b44a",
          fontSize: 10,
          colorBorder: "#65b44a",
          borderRadius: "50px",
        },
        components: {
          Button: {
            defaultActiveBorderColor: "var(--color-primary)",
          },
        },
      }}
    >
      <Input
        allowClear
        className={`${className} ${style.searchBox}`}
        size="large"
        placeholder={t("Search")}
        style={{
          fontFamily: fontFamilylight,
          direction: direction,
        }}
      />
    </ConfigProvider>
  );
};

export default SearchInputField;
