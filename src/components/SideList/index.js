import React from "react";
import { Button, List } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import style from "./sideList.module.css";

const SideList = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const data = [
    "market",
    "Fruits",
    "Vegetables&Herbs",
    "Butchery&Poultry",
    "Fishery",
    "Bread",
    "Bakery",
    "GroceryEssentials",
    "Dairy&Eggs",
    "Cheese&Charcuterie",
  ];

  const path = location.pathname;
  const lastItem = path.substring(path.lastIndexOf("/") + 1);

  return (
    <List
      bordered
      dataSource={data}
      renderItem={(item) => (
        <Button
          className={style.itemList}
          type="text"
          onClick={() =>
            item === "market"
              ? navigate(`/web/guest/market`)
              : navigate(`/web/guest/market/${item}`)
          }
        >
          {lastItem === item ? <b> {t(item)}</b> : t(item)}
        </Button>
      )}
    />
  );
};

export default SideList;
