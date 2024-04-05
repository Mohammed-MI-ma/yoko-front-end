import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useFontFamily from "../../utils/useFontFamily";
import {
  Avatar,
  Button,
  ConfigProvider,
  DatePicker,
  Divider,
  Input,
  List,
  Result,
  Segmented,
  Space,
  Switch,
  Tabs,
} from "antd";
import { SiMeilisearch } from "react-icons/si";

import { FaCar } from "react-icons/fa";
import { RiBikeLine } from "react-icons/ri";
import { FaMotorcycle } from "react-icons/fa";
import { FaTruckPickup } from "react-icons/fa";
import dayjs from "dayjs";
import { Radio } from "antd";
import { PlusOutlined, UnlockOutlined } from "@ant-design/icons";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import CenteredContainer from "../CenteredContainer";
import { searchDeliveryBoyMeiliSearch } from "../../reducers/applicationService/delivery/deliveryActions";
import { useDispatch, useSelector } from "react-redux";
import { updateSearchInputEmptyState } from "../../reducers/applicationService/delivery/deliverySlice";

const DeliveryBoy = () => {
  const dispatch = useDispatch();
  const isSearchInputEmpty = useSelector(
    (state) => state.delivery.isSearchDeliveryBoyInputEmpty
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [activeKey, setActiveKey] = useState("1");

  const { t, i18n } = useTranslation();
  const data = [
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ];
  const fontFamilyLight = useFontFamily(i18n.language, "normal");
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  const items = [
    {
      key: "1",
      label: (
        <h1
          style={{
            fontFamily: fontFamilyLight,
            fontSize: "var(--font-extra-small-size)",
            color: "var(--color-secondary)",
          }}
        >
          {t("Recherche")}
        </h1>
      ),
      children: (
        <div
          className={
            "flex-col w-full gap-10 overflow-auto justify-start bordered shadow-md p-5 "
          }
          style={{
            maxHeight: "25rem",
            borderRadius: "var(--border-radius-large)",
          }}
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
              <List.Item
                actions={[
                  <IconText
                    icon={StarOutlined}
                    text="156"
                    key="list-vertical-star-o"
                  />,
                  <IconText
                    icon={LikeOutlined}
                    text="156"
                    key="list-vertical-like-o"
                  />,
                  <IconText
                    icon={MessageOutlined}
                    text="2"
                    key="list-vertical-message"
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                    />
                  }
                  title={<a href="https://ant.design">{item.title}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            )}
          />
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <h1
          style={{
            fontFamily: fontFamilyLight,
            fontSize: "var(--font-extra-small-size)",
            color: "var(--color-secondary)",
          }}
        >
          <UnlockOutlined />
          {t("Dilevery Boy")}
        </h1>
      ),
      children: (
        <div
          className={
            " flex-col w-full gap-10 overflow-auto justify-start bordered shadow-md p-5 "
          }
          style={{
            maxHeight: "25rem",
            borderRadius: "var(--border-radius-large)",
          }}
        >
          {isSearchInputEmpty ? (
            <Result status="403" title="403" subTitle={t("403_MSG")} />
          ) : (
            <>
              <Divider style={{ fontFamily: fontFamilyLight, margin: 0 }}>
                1-{t("personnalInfo")}
              </Divider>

              <Label>{t("CNIE")}*</Label>
              <Input placeholder={t("n° CNIE")} maxLength={10} />
              <Label>{t("Nom")}*</Label>
              <Input placeholder={t("Nom")} />
              <Label>{t("Prenom")}*</Label>
              <Input placeholder={t("Prenom")} />
              <Label>{t("DOB")}*</Label>
              <DatePicker
                defaultValue={dayjs("2015/01/01", "YYYY/MM/DD")}
                format={"YYYY/MM/DD"}
              />
              <Label>{t("Sexe")}*</Label>
              <Radio.Group value={1}>
                <Radio value={1}>{t("Homme")}</Radio>
                <Radio value={2}>{t("Femme")}</Radio>
              </Radio.Group>
              <Divider
                style={{
                  fontFamily: fontFamilyLight,
                  marginTop: "var(--spacing-medium)",
                }}
              >
                2-{t("coordonnées")}
              </Divider>

              <Label>{t("Adresse électronique")}*</Label>
              <Input placeholder={t("Adresse électronique")} />
              <Label>{t("GSM")}*</Label>
              <Input placeholder={t("Numéro de téléphone")} />
              <Label>{t("chooseTransport")}*</Label>
              <Segmented
                size="large"
                options={[
                  {
                    label: (
                      <div
                        style={{
                          padding: 4,
                        }}
                      >
                        <Avatar
                          style={{
                            backgroundColor: "var(--color-secondary)",
                            verticalAlign: "middle",
                          }}
                          size="large"
                        >
                          <FaCar />
                        </Avatar>
                        <div>Voiture</div>
                      </div>
                    ),
                    value: "Voiture",
                  },
                  {
                    label: (
                      <div
                        style={{
                          padding: 4,
                        }}
                      >
                        {" "}
                        <Avatar
                          style={{
                            backgroundColor: "var(--color-secondary)",
                            verticalAlign: "middle",
                          }}
                          size="large"
                        >
                          <RiBikeLine />
                        </Avatar>
                        <div>Vélo</div>
                      </div>
                    ),
                    value: "summer",
                  },
                  {
                    label: (
                      <div
                        style={{
                          padding: 4,
                        }}
                      >
                        <Avatar
                          style={{
                            backgroundColor: "var(--color-secondary)",
                            verticalAlign: "middle",
                          }}
                          size="large"
                        >
                          <FaMotorcycle />
                        </Avatar>
                        <div>Moto</div>
                      </div>
                    ),
                    value: "autumn",
                  },
                  {
                    label: (
                      <div
                        style={{
                          padding: 4,
                        }}
                      >
                        <Avatar
                          style={{
                            backgroundColor: "var(--color-secondary)",
                            verticalAlign: "middle",
                          }}
                          size="large"
                        >
                          <FaTruckPickup />
                        </Avatar>
                        <div>Pickup</div>
                      </div>
                    ),
                    value: "winter",
                  },
                ]}
              />
              <Button
                className="w-full mt-20"
                style={{
                  fontFamily: fontFamilyLight,
                  background: "var(--color-secondary)",
                  color: "white",
                }}
              >
                {t("save")}
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];
  const handleSearch = (value) => {
    setSearchTerm(value);
    dispatch(searchDeliveryBoyMeiliSearch({ query: value }));
    const isEmpty = value.trim() === "";
    dispatch(updateSearchInputEmptyState(isEmpty));
  };
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "none",
          hoverBorderColor: "#1d3034",
        },
        components: {},
      }}
    >
      <div className={"h-full flex-col "}>
        <div className={"flex items-center justify-center gap-10"}>
          <div className={"w-full"}>
            <Input
              placeholder={t("placeholderLivreur")}
              style={{
                borderRadius: "100px",
                fontFamily: fontFamilyLight,
              }}
              onChange={(e) => handleSearch(e.target.value)}
              value={searchTerm}
            />
            <footer>
              <CenteredContainer
                style={{
                  fontSize: "var(--font-tiny-size)",
                  justifyContent: "left",
                }}
              >
                <p>Recherche alimentée par MeiliSearch</p>
                <SiMeilisearch />
              </CenteredContainer>{" "}
            </footer>
          </div>
          <CenteredContainer className={"flex-col"}>
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              disabled
              style={{
                background: "var(--color-secondary)",
                color: "white",
              }}
            />

            <footer>
              <p
                style={{
                  fontSize: "var(--font-tiny-size)",
                  textAlign: "center",
                }}
              >
                Nouveau livreur
              </p>
            </footer>
          </CenteredContainer>
        </div>

        <div className="flex-grow w-full ">
          <Tabs defaultActiveKey={activeKey} items={items} />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default DeliveryBoy;

export const Label = ({ children }) => {
  return (
    <p
      style={{
        textAlign: "left",
        width: "100%",
        fontSize: "var(--font-extra-small-size)",
      }}
    >
      {children}
    </p>
  );
};
