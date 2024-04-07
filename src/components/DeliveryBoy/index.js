import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, ConfigProvider, List, Popconfirm, Space, Tabs } from "antd";

import { RiBikeLine } from "react-icons/ri";
import { FaMotorcycle, FaTruckPickup, FaCar } from "react-icons/fa";
import { PlusOutlined } from "@ant-design/icons";
import { MdEdit, MdAutoDelete } from "react-icons/md";

import {
  deleteDeliveryBoy,
  searchDeliveryBoyMeiliSearch,
} from "../../reducers/applicationService/delivery/deliveryActions";
import { useDispatch, useSelector } from "react-redux";
import { findObjectById } from "../../reducers/applicationService/delivery/deliverySlice";

import useFontFamily from "../../utils/useFontFamily";
import CenteredContainer from "../CenteredContainer";

import style from "./DeliveryBoy.module.css";
import DeliveryBoySearchEngine from "../DeliveryBoySearchEngine";
import DeliveryBoyEditionDrawer from "../DeliveryBoyEditionDrawer";

const DeliveryBoy = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const fontFamilyLight = useFontFamily(i18n.language, "normal");
  const fontFamilyBold = useFontFamily(i18n.language, "bold");

  const { data } = useSelector((state) => state.delivery.deliveryBoys);
  const [childrenDrawer, setChildrenDrawer] = useState(false);

  const showChildrenDrawer = (e) => {
    dispatch(findObjectById({ id: e }));
    // Update the URL with the opened ID
    window.history.replaceState(null, "", `/yoko/account/dashboard/${e}`);
    setChildrenDrawer(true);
  };
  const onChildrenDrawerClose = () => {
    window.history.replaceState(null, "", `/yoko/account/dashboard`);

    setChildrenDrawer(false);
  };

  const searchDeliveryBoy = useCallback(() => {
    dispatch(searchDeliveryBoyMeiliSearch({ query: "" }));
  }, [dispatch]);

  useEffect(() => {
    searchDeliveryBoy();
  }, [searchDeliveryBoy]);

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
              <List.Item
                actions={[
                  <Button
                    onClick={() => showChildrenDrawer(item?._id)}
                    type="link"
                    style={{
                      fontFamily: fontFamilyLight,
                      fontSize: "var(--font-small-size)",
                    }}
                  >
                    <IconText
                      icon={MdEdit}
                      text="Edition"
                      key="list-vertical-message"
                    />
                  </Button>,
                  <Popconfirm
                    title={t("Delete deliveryBoy")}
                    description={t("confirmDeleteDeliveryBoy")}
                    okText={t("yes")}
                    cancelText={t("no")}
                    okType="text"
                    onConfirm={() =>
                      dispatch(deleteDeliveryBoy({ id: item._id }))
                    }
                  >
                    <Button
                      type="link"
                      danger
                      style={{
                        fontFamily: fontFamilyLight,
                        fontSize: "var(--font-small-size)",
                      }}
                    >
                      <IconText
                        icon={MdAutoDelete}
                        text={<p>Supprimer {item?.firstName}</p>}
                        key="list-vertical-message"
                      />
                    </Button>
                  </Popconfirm>,
                ]}
              >
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
                      <IconFormatter icon={item?.vehicleType} />
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
          <DeliveryBoySearchEngine />
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
          <Tabs defaultActiveKey={1} items={items} />
        </div>
      </div>
      <DeliveryBoyEditionDrawer
        title={t("Modify Delivery Information")}
        open={childrenDrawer}
        onClose={onChildrenDrawerClose}
      />
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
export const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
export const IconFormatter = ({ icon }) => {
  // Map string values to corresponding icons
  const iconMap = {
    Pickup: FaTruckPickup,
    car: FaCar,
    Moto: FaMotorcycle,
    Vélo: RiBikeLine,
  };

  // Get the corresponding icon from the map
  const selectedIcon = iconMap[icon] || FaMotorcycle; // Default to coffee icon if no match found

  return <Space> {React.createElement(selectedIcon)}</Space>;
};
