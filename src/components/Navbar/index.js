import React, { useTransition } from "react";
import { Avatar, Button } from "antd";

import NavbarItems from "./NavbarItems";

import style from "./Navbar.module.css";
import InternationalizationDropDown from "../InternationalizationDropDown";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Logo } from "../../images";
import { CgMenuRightAlt } from "react-icons/cg";
import SearchInputField from "../SearchInputField";
import { setSideMenuIsOpened } from "../../reducers/applicationService/applicationSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  //__LANGUAGE
  const languag = useSelector((state) => state.application.language);
  //__TRANSALATION
  const { t } = useTranslation();
  const [startTransition, isPending] = useTransition();

  const d = useDispatch();
  const navigate = useNavigate();

  return (
    <div className={style.mainContainer}>
      <div
        className={`${style.innerContainer} ${
          languag === "ar" ? style.reverse : ""
        }`}
      >
        {/* Logo */}
        <div
          onClick={() => navigate(`/`)}
          className={`${style.logo} ${
            languag === "ar" ? style.reverse : ""
          } cursor-pointer`}
        >
          <div
            className={`flex justify-start relative flex-col items-${
              languag === "fr" ? "center" : "flex-start"
            }`}
            style={{
              fontFamily: `Primary-Regular-${languag}`,
            }}
          >
            <span
              className={`flex ${
                languag === "ar" ? "flex-row-reverse" : "flex-row"
              } justify-start relative items-center ${
                languag === "ar" ? "gap-4" : ""
              }`}
            >
              {/* Add your logo here */}
              <Avatar
                className={style.logoImage}
                src={Logo}
                shape="square"
                alt="logo"
              />
            </span>
          </div>
        </div>
        <div
          className={style.myContainer}
          style={{
            display: "flex",
            flexDirection: languag === "ar" ? "row-reverse" : "row",
            gap: "10px",
          }}
        >
          {/* Navbar items */}
          <div className={style.navbarItems}>
            <NavbarItems />
          </div>
          {/* Tools section */}
          <div className={style.tools}>
            <InternationalizationDropDown /> &nbsp;&nbsp;
            <SearchInputField />
          </div>
        </div>
      </div>
      <div className={style.onMobileViewExtraMenu}>
        {/* <!-- button humburger -->*/}
        <SearchInputField />
        <Button
          icon={<CgMenuRightAlt />}
          onClick={() => d(setSideMenuIsOpened(true))}
        />
      </div>
    </div>
  );
};

export default Navbar;
