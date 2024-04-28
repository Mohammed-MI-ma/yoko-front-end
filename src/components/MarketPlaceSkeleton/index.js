import {
  Button,
  Checkbox,
  Collapse,
  ConfigProvider,
  Layout,
  Slider,
} from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { SiderStyleLabel } from "../../pages/MarketPage";
import SideList from "../SideList";
import useFontFamily from "../../utils/useFontFamily";
import { useTranslation } from "react-i18next";
import { Brands } from "../ProductDetails/brands";
import style from "./MarketPlaceSkeleton.module.css";
const SkeletonMarketplace = ({ searchEngine, marketPlaceContentContainer }) => {
  const language = useSelector((state) => state.application.language);
  const { t, i18n } = useTranslation();

  const { Header, Sider } = Layout;
  const fontFamilyBold = useFontFamily(i18n.language, "bold");

  const items = [
    {
      key: "1",
      label: (
        <SiderStyleLabel font={fontFamilyBold}>{t("Sections")}</SiderStyleLabel>
      ),
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
          <Button style={{ width: "100%" }}>Filtrer</Button>
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
              <Checkbox defaultChecked={false}>{brand.label}</Checkbox>
              <br></br>
            </>
          ))}
        </>
      ),
    },
  ];
  return (
    <div className="w-full h-full flex flex-grow justify-center items-center flex-col">
      <div className={`flex-grow w-full`}>
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
          <Layout
            className={`rounded-lg overflow-hidden w-full max-w-full bg-white gap-2`}
            style={{
              flexDirection: language === "ar" ? "row-reverse" : "row",
            }}
          >
            <Sider
              width="20%"
              style={{ background: "white" }}
              className={`${style.sider}`}
            >
              <Collapse
                items={items}
                defaultActiveKey={["1"]}
                expandIconPosition={"end"}
              />
            </Sider>
            <Layout>
              <Header className="text-center text-white h-16 bg-white">
                {searchEngine}
              </Header>
              {marketPlaceContentContainer}
            </Layout>
          </Layout>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default SkeletonMarketplace;
