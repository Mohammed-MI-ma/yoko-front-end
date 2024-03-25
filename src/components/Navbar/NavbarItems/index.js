import React from "react";
import { useTranslation } from "react-i18next";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import style from "./NavbarItems.module.css";
import menuItems, { reverseSubmenusForArabic } from "./menuItems"; // Import menuItems
import { useSelector } from "react-redux";

// Function to reverse submenus for Arabic language

// Dropdown component for individual menu items
const DropdownMenu = ({ title, submenus, t, rtl, icon }) => {
  const languag = useSelector((state) => state.application.language);

  const menu = (
    <Menu style={{ direction: rtl ? "rtl" : "" }}>
      {submenus.map((submenu, index) => (
        <Menu.Item key={`${title}-${index}`}>{t(submenu)}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <span
        className="flex justify-center items-center gap-1 font-bold"
        dir={languag === "ar" ? "rtl" : "ltr"}
        style={{
          fontFamily: `Primary-Regular-${languag}`,
          fontSize: "var(--font-medium-size)",
          color: "var( --color-secondary)",
        }}
      >
        {icon} {t(title)} <DownOutlined />
      </span>
    </Dropdown>
  );
};

// Main NavbarItems component
const NavbarItems = () => {
  const { t } = useTranslation();
  const language = useSelector((state) => state.application.language);

  return (
    <div className={style.container}>
      {reverseSubmenusForArabic(menuItems, language === "ar")?.map(
        (menuItem, index) => (
          <DropdownMenu
            rtl={language === "ar"}
            open={true}
            key={index}
            title={menuItem.title}
            submenus={menuItem.submenus}
            icon={menuItem.icon}
            t={t}
          />
        )
      )}
    </div>
  );
};

export default NavbarItems;
