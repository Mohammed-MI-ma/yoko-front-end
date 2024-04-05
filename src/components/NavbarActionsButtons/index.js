import React from "react";
import { useTranslation } from "react-i18next";
import { Badge, Button, ConfigProvider, Space, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import CenteredContainer from "../CenteredContainer";
import useFontFamily from "../../utils/useFontFamily";
import style from "./NavbarActionsButtons.module.css";
import { IoSettingsOutline } from "react-icons/io5";
import { Switch } from "antd";
import { setDrawerOpenSettings } from "../../reducers/applicationService/applicationSlice";

const SignUpButton = ({ text, font, language, icon }) => {
  return (
    <Link to={`/${language}/yoko/account/log-in`}>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              defaultHoverColor: "white",
              defaultActiveColor: "#65b44a",
            },
          },
        }}
      >
        <Button
          className="rounded-full text-white border-none"
          size="large"
          style={{
            fontFamily: font,
            background: "var(--color-secondary)",
          }}
        >
          <CenteredContainer
            style={{ gap: ".5rem" }}
            className={style.largeScreens}
          >
            {icon} {text}
          </CenteredContainer>
          <CenteredContainer
            style={{ gap: ".5rem" }}
            className={style.smallScreens}
          >
            {icon}
          </CenteredContainer>
        </Button>
      </ConfigProvider>
    </Link>
  );
};

const NavbarActionsButtons = ({ font }) => {
  const { t, i18n } = useTranslation();
  const language = useSelector((state) => state.application.language);
  const fontFamilybold = useFontFamily(i18n.language, "bold");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userInfo); // Assuming user is stored in the Redux state
  const openSettings = () => {
    // Check if user is admin and token is valid
    if (user.role === "admin") {
      // Implement isValidToken function based on your token validation logic
      // Dispatch openDrawer action if conditions are met
      dispatch(setDrawerOpenSettings(true));
    } else {
      // Handle case where user is not admin or token is invalid
      message.error("You do not have permission to access settings.");
    }
  };

  const navigate = useNavigate();
  const onChange = (checked) => {
    console.log("first", checked);
    switch (checked) {
      case false:
        navigate(`${language}/web/guest/acceuil`);
        break;

      case true:
        navigate(`${language}/yoko/account/dashboard`);

        break;
      default:
        break;
    }
  };
  return (
    <Space>
      {isLoggedIn && (
        <ConfigProvider
          theme={{
            token: {
              colorPrimaryBorder: "red",
            },
            components: {
              Switch: {
                handleBg: "white",
                handleShadow: "0 2px 4px 0 rgba(0, 35, 11, .6)",
              },
              Button: {
                defaultHoverColor: "white",
                defaultActiveColor: "#65b44a",
              },
            },
          }}
        >
          <Space>
            <Switch
              onChange={onChange}
              size={"large"}
              checkedChildren={<p style={{ fontFamily: font }}>admin</p>}
              unCheckedChildren={<p style={{ fontFamily: font }}>visiteur</p>}
            />
            <Badge count={10}>
              <Button
                onClick={openSettings}
                className="rounded-full text-white border-none "
                size="large"
                style={{
                  fontFamily: fontFamilybold,
                  background: "var(--color-secondary)",
                  color: "white",
                }}
              >
                <IoSettingsOutline size={"20px"} />
              </Button>{" "}
            </Badge>
          </Space>
        </ConfigProvider>
      )}
      {!isLoggedIn && (
        <SignUpButton
          text={t("SignUp")}
          font={fontFamilybold}
          language={language}
          icon={<VscAccount />}
        />
      )}
    </Space>
  );
};

export default NavbarActionsButtons;
