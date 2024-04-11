import React, { useEffect, useRef } from "react";
import CenteredContainer from "../CenteredContainer";
import { bucket } from "../../images";
import { useTranslation } from "react-i18next";
import { ConfigProvider, Space, Table, Tabs, Tag } from "antd";

const OrdersView = () => {
  const { t } = useTranslation();
  const scrollableContainerRef = useRef(null);
  useEffect(() => {
    // Scroll the container to the top when the component mounts
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTop = 0;
    }
  }, []);
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      fixed: "left",

      key: "name",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      fixed: "right",

      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const items = [
    {
      key: "1",
      label: "Commandes",
      children: (
        <div
          className={
            " flex-col w-full gap-5 overflow-auto justify-start bordered shadow-md p-5 "
          }
          style={{ maxHeight: "500px", borderRadius: "10px" }}
          ref={scrollableContainerRef}
        >
          <Table
            scroll={{
              x: 300,
              y: 300,
            }}
            columns={columns}
            dataSource={data}
          />
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
      <CenteredContainer
        className={"h-full flex-col "}
        style={{ marginTop: "0px" }}
      >
        <div
          id="rect"
          className="mt-10 flex justify-center p-10 items-start flex-col h-40 w-full relative"
        >
          <img
            width={250}
            src={bucket}
            style={{
              transform: "translateX(0%)",
              objectFit:
                "contain" /* or object-fit: cover; depending on your needs */,
            }}
            alt={t("logoText")}
          />
        </div>
        <div className="flex-grow w-full ">
          <Tabs defaultActiveKey="1" items={items} />
        </div>
      </CenteredContainer>
    </ConfigProvider>
  );
};

export default OrdersView;
