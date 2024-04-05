import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { Avatar } from "antd";

import CenteredContainer from "../CenteredContainer";
import useFontFamily from "../../utils/useFontFamily";

import NavbarActionsButtons from "../NavbarActionsButtons";
import SearchInputField from "../SearchInputField";

import style from "./Navbar.module.css";

import { Logo } from "../../images";
import HideComponentOnRoutes from "../HideComponentOnRoutes";
const Navbar = () => {
  const { i18n } = useTranslation();
  const languag = useSelector((state) => state.application.language);
  const fontFamilylight = useFontFamily(i18n.language, "normal");
  const language = useSelector((state) => state.application.language);

  return (
    <CenteredContainer className={`w-full flex-col ${style.mainContainer}`}>
      <div
        className={`${
          style.innerContainer
        } w-full flex items-center justify-between ${
          languag === "ar" && style.reverse
        }`}
      >
        <Link to={"/"}>
          <div
            className={`${
              languag === "ar" ? style.reverse : ""
            } cursor-pointer`}
          >
            <div
              className={`flex justify-start relative flex-col items-${
                languag === "fr" ? "center" : "flex-start"
              }`}
              style={{
                fontFamily: fontFamilylight,
              }}
            >
              <Avatar
                className={style.logoImage}
                src={Logo}
                shape="square"
                alt="logo"
              />
            </div>
          </div>
        </Link>
        <div className={`${style.navBar_container} flex`}>
          <CenteredContainer
            className={`gap-3`}
            style={{
              flexDirection: languag === "ar" ? "row-reverse" : "row",
            }}
          >
            <HideComponentOnRoutes
              routes={[
                `/${language}/yoko/account/log-in`,
                `/${language}/yoko/account/log-in-admin`,
              ]}
            >
              <SearchInputField className={style.largeScreens} />
            </HideComponentOnRoutes>
            <NavbarActionsButtons font={fontFamilylight} />
          </CenteredContainer>
        </div>
      </div>
    </CenteredContainer>
  );
};

export default Navbar;
