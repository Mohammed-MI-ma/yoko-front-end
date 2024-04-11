import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, ConfigProvider, List, Tabs, Avatar } from "antd";
import ProductSearchEngine from "../ProductSearchEngine";
import CenteredContainer from "../CenteredContainer";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import useFontFamily from "../../utils/useFontFamily";
import style from "./ProductManager.module.css";
import { searchProductMeiliSearch } from "../../reducers/applicationService/product/productActions";
import ProductEditionDrawer from "../ProductEditionDrawer";
import ProductAddDrawer from "../ProductAddDrawer";

const ProductManager = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const [searchTerm, setSearchTerm] = useState("");
  const handleClearSearch = () => {
    setSearchTerm("");
  };
  const { data } = useSelector((state) => state.product.products);

  const fontFamilyLight = useFontFamily(i18n.language, "normal");
  const fontFamilyBold = useFontFamily(i18n.language, "bold");

  const isAllowedToAddNewProduct = useSelector(
    (state) => state.product.isAllowedToAddNewProduct
  );

  const [childrenDrawer, setChildrenDrawer] = useState(false);

  const [childrenDrawerNewProduct, setChildrenDrawerNewProduct] =
    useState(false);
  const closeDrawerEDitFunction = () => {
    setChildrenDrawer(false);
  };
  const onChildrenDrawerClose = () => {
    window.history.replaceState(null, "", `/yoko/account/dashboard`);

    setChildrenDrawer(false);
  };
  const closeDrawerFunction = () => {
    setChildrenDrawerNewProduct(false);
  };
  const showChildrenDrawerNewProduct = (e) => {
    window.history.replaceState(
      null,
      "",
      `/yoko/account/dashboard/addProduct/`
    );
    setChildrenDrawerNewProduct(true);
  };
  const onChildrenDrawerNewProductClose = () => {
    window.history.replaceState(null, "", `/yoko/account/dashboard`);
    setChildrenDrawerNewProduct(false);
  };
  const searchProduct = useCallback(() => {
    dispatch(searchProductMeiliSearch({ query: "", t }));
  }, [dispatch, t]);

  useEffect(() => {
    searchProduct();
  }, [searchProduct]);

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
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                    />
                  }
                  title={
                    <h1 style={{ fontFamily: fontFamilyBold }}>
                      {item?.brand}&nbsp;
                    </h1>
                  }
                  description={<>{item?.name}</>}
                />
              </List.Item>
            )}
          />
        </div>
      ),
    },
  ];

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
                  showChildrenDrawerNewProduct();
                  handleClearSearch();
                  dispatch(searchProductMeiliSearch({ query: "", t }));
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
      <ProductEditionDrawer
        title={t("Modify product Information")}
        open={childrenDrawer}
        onClose={onChildrenDrawerClose}
        closeDrawerFunction={closeDrawerEDitFunction}
      />

      <ProductAddDrawer
        title={t("Add new product Information")}
        open={childrenDrawerNewProduct}
        onClose={onChildrenDrawerNewProductClose}
        closeDrawerFunction={closeDrawerFunction}
      />
    </ConfigProvider>
  );
};

export default ProductManager;
