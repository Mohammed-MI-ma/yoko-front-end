import { Drawer } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const DrawerGeneric = ({ titre, open, onClose, children }) => {
  const language = useSelector((state) => state.application.language);

  return (
    <Drawer
      style={{ overflow: "none" }}
      title={titre}
      onClose={onClose}
      open={open}
      placement={language === "ar" ? "left" : "right"}
      width="500px"
    >
      {children}
    </Drawer>
  );
};

export default DrawerGeneric;
