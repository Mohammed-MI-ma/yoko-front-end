import { Button, Flex } from "antd";
import React from "react";
import style from "./marketMenuMobile.module.css";

//ICONS
import { GiPayMoney } from "react-icons/gi";
import { TbBrandAbstract } from "react-icons/tb";
import { MdFeedback, MdDashboard } from "react-icons/md";

const MarketMenuMobile = () => {
  return (
    <Flex
      horizontal
      className={`${style.mobileSiderStyle} rounded bg-white shadow-lg border`}
    >
      <Button
        shape="circle"
        key={1}
        style={{
          ...baseStyle(),
        }}
      >
        <GiPayMoney />
      </Button>
      <Button
        shape="circle"
        key={2}
        style={{
          ...baseStyle(),
        }}
      >
        <MdDashboard />
      </Button>
      <Button
        key={3}
        style={{
          ...baseStyle(),
          height: "50px",
          fontFamily: "var(--font-primary)",
          width: "170px",
          background: "white",
          color: "black",
        }}
        className="bordered"
      >
        Commandes
      </Button>
      <Button
        shape="circle"
        key={4}
        style={{
          ...baseStyle(),
        }}
      >
        <TbBrandAbstract />
      </Button>
      <Button
        shape="circle"
        key={5}
        style={{
          ...baseStyle(),
        }}
      >
        <MdFeedback />
      </Button>
    </Flex>
  );
};
export const baseStyle = () => {
  return {
    width: "25%",
    height: "45px",
    backgroundColor: "var(--color-secondary)",
    margin: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    borderRadius: "36.25rem",
  };
};

export default MarketMenuMobile;
