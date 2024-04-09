import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, ConfigProvider, List, Popconfirm, Space, Tabs } from "antd";
import ProductSearchEngine from "../ProductSearchEngine";
import CenteredContainer from "../CenteredContainer";
import { useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import useFontFamily from "../../utils/useFontFamily";
import style from "./ProductManager.module.css";

const ProductManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { t, i18n } = useTranslation();

  const handleClearSearch = () => {
    setSearchTerm(""); // Reset the search term
  };
  const fontFamilyLight = useFontFamily(i18n.language, "normal");
  const fontFamilyBold = useFontFamily(i18n.language, "bold");

  const scrollableContainerRef = useRef(null);
  const isAllowedToAddNewProduct = useSelector(
    (state) => state.delivery.isAllowedToAddNewProduct
  );
  const { data } = useSelector((state) => state.product.products);
  const items = [
    {
      key: "1",
      label: (
        <h1
          className={style.tabTitle}
          style={{
            fontFamily: fontFamilyLight,
          }}
        >
          {t("Recherche")}
        </h1>
      ),
      children: (
        <div
          className={"flex-col w-full gap-10 overflow-auto justify-start p-5 "}
        >
          <List
            pagination={{
              position: "bottom",
              align: "center",
              pageSize: 3,
            }}
            itemLayout="vertical"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <h1 style={{ fontFamily: fontFamilyBold }}>
                      {item?.firstName}&nbsp;
                      {item?.lastName}
                    </h1>
                  }
                  description={
                    <>
                      {item?.email}, {item?.phone},
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      ),
    },
  ];
  useEffect(() => {
    // Scroll the container to the top when the component mounts
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "none",
          hoverBorderColor: "#1d3034",
        },
      }}
    >
      <div className={"h-full flex-col "}>
        <div className={"flex items-center justify-center gap-10"}>
          <ProductSearchEngine
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <CenteredContainer className={"flex-col"}>
            {isAllowedToAddNewProduct && data?.length === 0 ? (
              <Button
                onClick={() => {
                  //  showChildrenDrawerNewProduct();
                  handleClearSearch();
                  // dispatch(searchDeliveryBoyMeiliSearch({ query: "", t }));
                }}
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                style={{
                  background: "var(--color-secondary)",
                  color: "white",
                }}
              />
            ) : (
              <Button
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                disabled
                style={{
                  background: "#c3c3c3",
                  color: "white",
                }}
              />
            )}
            <footer>
              <p
                style={{
                  fontSize: "var(--font-tiny-size)",
                  textAlign: "center",
                }}
              >
                <>Nouveau produit</>
              </p>
            </footer>
          </CenteredContainer>
        </div>{" "}
        <div className="flex-grow w-full ">
          <Tabs defaultActiveKey={1} items={items} />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default ProductManager;
