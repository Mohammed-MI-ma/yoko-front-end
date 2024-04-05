import React, { useEffect, useRef, useState } from "react";
import CenteredContainer from "../CenteredContainer";
import { bucket, bucketMobile } from "../../images";
import { useTranslation } from "react-i18next";
import useFontFamily from "../../utils/useFontFamily";
import {
  Avatar,
  ConfigProvider,
  DatePicker,
  Divider,
  Input,
  Segmented,
  Switch,
  Tabs,
  Timeline,
} from "antd";
import { FaCar } from "react-icons/fa";
import { RiBikeLine } from "react-icons/ri";
import { FaMotorcycle } from "react-icons/fa";
import { FaTruckPickup } from "react-icons/fa";
import dayjs from "dayjs";
import { Radio } from "antd";

const ProductManager = () => {
  const { t, i18n } = useTranslation();
  const scrollableContainerRef = useRef(null);
  useEffect(() => {
    // Scroll the container to the top when the component mounts
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTop = 0;
    }
  }, []);
  const fontFamilyBold = useFontFamily(i18n.language, "bold");
  const items = [
    {
      key: "1",
      label: "CRUD Produit",
      children: (
        <div
          className={
            " flex-col w-full gap-5 overflow-auto justify-start bordered shadow-md p-5 "
          }
          style={{ maxHeight: "400px", borderRadius: "10px" }}
          ref={scrollableContainerRef}
        >
          <p style={{ textAlign: "left", width: "100%" }}>Nom du produit</p>
          <Input size="large" placeholder={t("adresse électronique")} />
          <p style={{ textAlign: "left", width: "100%" }}>Prénom</p>
          <Input size="large" placeholder={t("adresse électronique")} />
          <p style={{ textAlign: "left", width: "100%" }}>
            Prix unitaire / le kg
          </p>
          <Input size="large" placeholder={t("adresse électronique")} />
          <p style={{ textAlign: "left", width: "100%" }}>Quantité</p>
          <Input size="large" placeholder={t("adresse électronique")} />
        </div>
      ),
    },
  ];
  return (
    <ConfigProvider
      theme={{
        components: {
          Segmented: {
            itemActiveBg: "var(--color-primary)",
            itemSelectedBg: "var(--color-primary)",
          },
        },
      }}
    >
      <div className={"h-full flex-col "} style={{ marginTop: "0px" }}>
        <Switch defaultChecked className="mb-2" />
        <Input
          size="large"
          placeholder={t("Chercher par nomProduit, description... ")}
        />
        <div className="flex-grow w-full ">
          <Tabs defaultActiveKey="1" items={items} />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default ProductManager;
