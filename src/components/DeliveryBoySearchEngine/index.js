import React, { useCallback, useMemo, useState } from "react";
import { Input } from "antd";
import { SiMeilisearch } from "react-icons/si";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import CenteredContainer from "../CenteredContainer";
import { searchDeliveryBoyMeiliSearch } from "../../reducers/applicationService/delivery/deliveryActions";
import useFontFamily from "../../utils/useFontFamily";
import style from "./DeliveryBoySearchEngine.module.css";

const DeliveryBoySearchEngine = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const fontFamilyLight = useFontFamily(i18n.language, "normal");

  const handleSearch = useCallback(
    (value) => {
      setSearchTerm(value);
      dispatch(searchDeliveryBoyMeiliSearch({ query: value }));
    },
    [dispatch]
  );
  const memoizedTranslations = useMemo(() => {
    return {
      placeholder: t("placeholderLivreur"),
      poweredByMeiliSearch: t("poweredByMeiliSearch"),
    };
  }, [t]);
  return (
    <section className={"w-full"}>
      <Input
        allowClear
        placeholder={memoizedTranslations.placeholder}
        style={{
          borderRadius: "100px",
          fontFamily: fontFamilyLight,
        }}
        onChange={(e) => handleSearch(e.target.value)}
        value={searchTerm}
      />
      <footer>
        <CenteredContainer className={style.poweredBymeiliSearch}>
          <p>{memoizedTranslations.poweredByMeiliSearch}</p>
          <SiMeilisearch />
        </CenteredContainer>
      </footer>
    </section>
  );
};

export default DeliveryBoySearchEngine;
