import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Spin, Button, ConfigProvider, Space, Badge, Dropdown } from "antd";
import { useLocation } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import CenteredContainer from "../CenteredContainer";
import useFontFamily from "../../utils/useFontFamily";
import style from "./NavbarActionsButtons.module.css";
import { IoSettingsOutline } from "react-icons/io5";
import { Switch } from "antd";
import { setDrawerOpenSettings } from "../../reducers/applicationService/applicationSlice";
import { setDrawerOpenCart } from "../../reducers/applicationService/applicationSlice";

import { useTransition } from "react";
import { DownOutlined, LoadingOutlined } from "@ant-design/icons";
import useDirection from "../../utils/useDirection";

const SignUpButton = ({ text, font, icon }) => {
  return (
    <Link to={`/yoko/account/log-in`}>
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

const NavbarActionsButtons = () => {
  const { t, i18n } = useTranslation();
  const language = useSelector((state) => state.application.language);
  const fontFamilylight = useFontFamily(i18n.language, "normal");

  const fontFamilybold = useFontFamily(i18n.language, "bold");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const cart = useSelector((state) => state.marketPlace.cartME);
  const dispatch = useDispatch();
  const direction = useDirection(i18n.language);

  const user = useSelector((state) => state.auth.userInfo); // Assuming user is stored in the Redux state
  const fontFamilyLight = useFontFamily(i18n.language, "normal");
  const openSettings = () => {
    dispatch(setDrawerOpenSettings(true));
  };
  const openPanierDrawer = () => {
    dispatch(setDrawerOpenCart(true));
  };

  const [isPending, startTransition] = useTransition();

  const [checked, setChecked] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const onChange = (checked) => {
    switch (checked) {
      case false: {
        startTransition(() => navigate(`/web/guest/acceuil`));
        break;
      }

      case true: {
        startTransition(() => navigate(`/yoko/account/dashboard`));
        break;
      }

      default:
        break;
    }
  };
  useEffect(() => {
    switch (location.pathname) {
      case "/yoko/account/dashboard":
        setChecked(true);
        break;
      case "/web/guest/acceuil":
        setChecked(false);
        break;
      default:
        break;
    }
  }, [location]);

  const items = [
    {
      key: "1",
      label: (
        <p
          style={{
            fontFamily: fontFamilyLight,
            textAlign: direction === "rtl" ? "right" : "left",
          }}
        >
          {t("Casablanca")}
        </p>
      ),
    },
    {
      key: "2",
      label: (
        <p
          style={{
            fontFamily: fontFamilyLight,
            textAlign: direction === "rtl" ? "right" : "left",
          }}
        >
          {t("Rabat")}
        </p>
      ),
    },
  ];
  const onClick = ({ key }) => {
    switch (key) {
      case "1":
        break;
      case "2":
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
              Button: {
                defaultHoverColor: "white",
                defaultActiveColor: "#65b44a",
              },
            },
          }}
        >
          <Space dir={direction}>
            {isPending ? (
              <div style={style}>
                <Spin
                  spinning
                  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                />
              </div>
            ) : (
              <>
                <div className={style.city}>
                  <Dropdown
                    menu={{
                      items,
                      onClick,
                    }}
                  >
                    <Space
                      style={{
                        border: "1px solid black",
                        padding: "15px",
                        width: 146,
                        height: 30,
                        borderRadius: "100px",
                        display: "flex",
                        justifyContent: "space-between",
                        fontFamily: fontFamilylight,
                      }}
                    >
                      {true ? t("Casablanca") : t("Rabat")}
                      <DownOutlined />
                    </Space>
                  </Dropdown>
                </div>
                {user?.role === "admin" && (
                  <CenteredContainer className={"flex-col"}>
                    <p
                      style={{
                        fontSize: "var(--font-tiny-size)",
                        fontFamily: fontFamilylight,
                      }}
                    >
                      {t("Mode")}
                    </p>
                    <Switch
                      onChange={onChange}
                      checked={checked}
                      size={"large"}
                      checkedChildren={
                        <p style={{ fontFamily: fontFamilylight }}>
                          {t("Admin")}
                        </p>
                      }
                      unCheckedChildren={
                        <p style={{ fontFamily: fontFamilylight }}>
                          {t("Visiteur")}
                        </p>
                      }
                    />
                    <p
                      style={{
                        fontSize: "var(--font-tiny-size)",
                        fontFamily: fontFamilylight,
                      }}
                    >
                      {t("activé")}
                    </p>
                  </CenteredContainer>
                )}
              </>
            )}
            {user?.role !== "admin" && (
              <>
                <Badge count={cart?.length}>
                  <Button
                    onClick={openPanierDrawer}
                    className="rounded-full text-white border-none "
                    size="large"
                    style={{
                      fontFamily: fontFamilybold,
                      background: "var(--color-secondary)",
                      color: "white",
                    }}
                  >
                    <FaCartArrowDown size={"20px"} />
                  </Button>
                </Badge>
                <Badge count={1}>
                  <Button
                    className="rounded-full text-white border-none "
                    size="large"
                    style={{
                      fontFamily: fontFamilybold,
                      background: "white",
                      color: "var(--color-secondary)",
                      border: "1px solid var(--color-secondary)",
                    }}
                  >
                    <FiMessageSquare size={"20px"} />
                  </Button>
                </Badge>
              </>
            )}
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
            </Button>
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
