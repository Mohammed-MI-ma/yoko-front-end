import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { useSelector } from "react-redux";
import useFontFamily from "../../utils/useFontFamily";
import { useTranslation } from "react-i18next";
import {
  Breadcrumb,
  Button,
  Checkbox,
  Collapse,
  ConfigProvider,
  Layout,
  Slider,
} from "antd";
import { MdDashboard } from "react-icons/md";

import { Brands } from "../../components/ProductDetails/brands";
import ProductSearchEngineMarketPlace from "../../components/ProductSearchEngine_MarketPlace";
import MarketPlaceContentContainer from "../../components/MarketPlaceContentContainer";
import { useLocation } from "react-router-dom";
import SideList from "../../components/SideList";
import BreadCrumbContent from "../../components/BreadCrumbContent";

const MarketPageVegetablesHerbs = () => {
  const { t, i18n } = useTranslation();
  const language = useSelector((state) => state.application.language);
  const fontFamilyBold = useFontFamily(i18n.language, "bold");
  const fontFamilyLight = useFontFamily(i18n.language, "normal");
  const dynamicWidth = useSelector((state) => state.application.dynamicWidth);
  const { Header, Sider } = Layout;
  const location = useLocation();
  const path = location.pathname;
  const lastItem = path.substring(path.lastIndexOf("/") + 1);
  const items = [
    {
      key: "1",
      label: <SiderStyleLabel font={fontFamilyBold}>Sections</SiderStyleLabel>,
      children: <SideList />,
    },
    {
      key: "2",
      label: (
        <SiderStyleLabel font={fontFamilyBold}>{t("Price")}</SiderStyleLabel>
      ),

      children: (
        <>
          <Slider
            range
            step={10}
            defaultValue={[20, 50]}
            onChange={null}
            onChangeComplete={null}
          />
          <Button style={{ width: "100%" }}> Filtrer</Button>
        </>
      ),
    },
    {
      key: "3",
      label: (
        <SiderStyleLabel font={fontFamilyBold}>{t("brand")}</SiderStyleLabel>
      ),

      children: (
        <>
          {Brands.map((brand) => (
            <>
              {" "}
              <Checkbox defaultChecked={false}>{brand.label}</Checkbox>
              <br></br>
            </>
          ))}
        </>
      ),
    },
  ];
  const headerStyle = {
    textAlign: "center",
    color: "#fff",
    height: 64,
    backgroundColor: "white",
  };
  const siderStyle = {
    color: "#fff",
    backgroundColor: "white",
    marginRight: "20px",
  };

  const layoutStyle = {
    borderRadius: 8,
    overflow: "hidden",
    width: "100%",
    maxWidth: "100%",
  };
  const containerStyles = {
    backgroundPosition: "right",
    backgroundSize: "cover",
    borderBottom: "0px",
    width: dynamicWidth,
    position: "relative",
    minHeight: "75vh",
    margin: "0 auto",
    borderRadius: "80px",
  };

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <BreadCrumb language={language}>
        <BreadCrumbContent />
      </BreadCrumb>
      <div className={`flex flex-col`} style={containerStyles}>
        <Breadcrumb
          style={{
            fontSize: "var(--font-tiny-size)",
            fontWeight: "700",
            direction: language === "ar" ? "rtl" : "ltr",
          }}
          items={[
            {
              title: (
                <h1 style={{ fontFamily: fontFamilyLight }}>
                  {t("Casablanca")}
                </h1>
              ),
            },

            {
              title: (
                <h1 style={{ fontFamily: fontFamilyLight }}>
                  {t("YOKO Market")}
                </h1>
              ),
            },
          ]}
        />

        <div
          className="w-full h-full flex flex-grow justify-center items-center flex-col"
          style={{ borderRadius: "60px" }}
        >
          <div className="flex-grow" style={{ width: "inherit" }}>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "var(--color-primary)",
                },
                components: {
                  List: {
                    margin: 40,
                    itemPadding: 40,
                  },
                },
              }}
            >
              <Layout style={{ ...layoutStyle, backgroundColor: "white" }}>
                <Sider width="20%" style={siderStyle}>
                  <Collapse
                    items={items}
                    defaultActiveKey={["1"]}
                    expandIconPosition={"end"}
                  />
                </Sider>
                <Layout>
                  <Header style={headerStyle}>
                    <ProductSearchEngineMarketPlace
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      customPrefix={lastItem}
                    />
                  </Header>
                  <MarketPlaceContentContainer
                    onSearch={searchTerm !== ""}
                    currentPage={lastItem}
                  />
                </Layout>
              </Layout>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketPageVegetablesHerbs;

export const SiderStyleLabel = ({ font, children }) => {
  return (
    <div
      className="flex flex-row items-center"
      style={{ color: "var(--color-primary)" }}
    >
      <MdDashboard />
      <p style={{ fontFamily: font }}>{children}</p>
    </div>
  );
};
