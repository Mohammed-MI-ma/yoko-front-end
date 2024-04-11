import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import { useSelector } from "react-redux";
import useFontFamily from "../../utils/useFontFamily";
import { useTranslation } from "react-i18next";
import {
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Col,
  Collapse,
  ConfigProvider,
  Divider,
  Layout,
  List,
  Rate,
  Row,
  Slider,
  Typography,
} from "antd";
import DeliveryBoySearchEngine from "../../components/DeliveryBoySearchEngine";
import ImageCardWithDescriptionFooter from "../../components/ImageCardWithDescriptionFooter";

const MarketPage = () => {
  const { t, i18n } = useTranslation();
  const language = useSelector((state) => state.application.language);
  const fontFamilyBold = useFontFamily(i18n.language, "bold");
  const fontFamilyLight = useFontFamily(i18n.language, "normal");
  const dynamicWidth = useSelector((state) => state.application.dynamicWidth);
  const { Header, Footer, Sider, Content } = Layout;
  const data = [
    "Nouveautés",
    "Fruits, Légumes",
    "Herbes",
    "Boucherie et Volaille",
    "Poissonnerie",
    "Pain, Boulangerie",
    "Fruits, Légumes",
    "Herbes",
    "Boucherie et Volaille",
    "Poissonnerie",
    "Nouveautés",
    "Fruits, Légumes",
    "Herbes",
    "Boucherie et Volaille",
    "Poissonnerie",
  ];
  const text = `
  A dog is a type of 
`;
  const items = [
    {
      key: "1",
      label: "Sections",
      children: (
        <List
          bordered
          dataSource={data}
          renderItem={(item) => (
            <p>
              {item}
              <br />
            </p>
          )}
        />
      ),
    },
    {
      key: "2",
      label: "Price",
      children: (
        <Slider
          range
          step={10}
          defaultValue={[20, 50]}
          onChange={null}
          onChangeComplete={null}
        />
      ),
    },
    {
      key: "3",
      label: "Marque",
      children: (
        <>
          <Checkbox defaultChecked={false} />
          qsdqsd
          <br />
          <Checkbox indeterminate />
          qsdqsdqs
          <br />
          <Checkbox defaultChecked />
          qsdqsdqs
        </>
      ),
    },
    {
      key: "4",
      label: "Évaluation",
      children: <Rate />,
    },
  ];
  const headerStyle = {
    textAlign: "center",
    color: "#fff",
    height: 64,
    backgroundColor: "white",
  };
  const contentStyle = {
    textAlign: "center",
    color: "#fff",
    background: "white",
  };
  const siderStyle = {
    color: "#fff",
    backgroundColor: "white",
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
  return (
    <>
      <BreadCrumb language={language}>
        <h1
          style={{
            fontSize: "2rem",
            color: "var(--color-accent)",
            fontWeight: 700,
            fontFamily: fontFamilyBold,
          }}
        >
          <span
            style={{
              color: "var(--color-primary)",
            }}
          >
            {t("YOKO")}
          </span>
          &nbsp;{t("Market")}
        </h1>
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
              <Layout style={layoutStyle}>
                {/*  <Sider width="20%" style={siderStyle}>
                  <Collapse items={items} defaultActiveKey={["1"]} />
            </Sider>*/}
                <Layout>
                  <Header style={headerStyle}>
                    <DeliveryBoySearchEngine></DeliveryBoySearchEngine>
                  </Header>
                  <Content style={contentStyle}>
                    <div className="flex justify-between items-center">
                      <h1 style={{ color: "black" }}>Nouveautés</h1>
                      <Button>savoir plus</Button>
                    </div>
                    <div
                      className={`grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-3 items-center `}
                    >
                      {[1, 2, 3, 4].map((id) => (
                        <div
                          className="w-50 "
                          style={{
                            background: "red",
                            margin: "10px",
                            height: "200px",
                          }}
                        >
                          hello
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <h1 style={{ color: "black" }}>Nouveautés</h1>
                      <Button>savoir plus</Button>
                    </div>
                    <div
                      className={`grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-3 items-center `}
                    >
                      {[1, 2, 3, 4].map((id) => (
                        <div
                          className="w-50 "
                          style={{
                            background: "red",
                            margin: "10px",
                            height: "200px",
                          }}
                        >
                          hello
                        </div>
                      ))}
                    </div>
                    <Button>savoir plus</Button>
                    <div className="flex justify-between items-center">
                      <h1 style={{ color: "black" }}>Nouveautés</h1>
                      <Button>savoir plus</Button>
                    </div>
                    <div
                      className={`grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-3 items-center `}
                    >
                      {[1, 2, 3, 4].map((id) => (
                        <div
                          className="w-50 "
                          style={{
                            background: "red",
                            margin: "10px",
                            height: "200px",
                          }}
                        >
                          hello
                        </div>
                      ))}
                    </div>
                    <Button>savoir plus</Button>
                  </Content>
                </Layout>
              </Layout>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketPage;
