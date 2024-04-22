//__React
import React, { useEffect, useMemo } from "react";
import { Dropdown, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DownOutlined } from "@ant-design/icons";

import { useTranslation } from "react-i18next";
import useResponsiveState from "../../utils/useResponsiveState";

import {
  setLanguage,
  setSiteDirection,
} from "../../reducers/applicationService/applicationSlice";

//31kb
import { LogoB } from "../../images";

import { ConfigProvider } from "antd";

import FooterItem from "../FooterItem";
import SocialMediaButtons from "../SocialMedia";
import ContactContainer from "../contactContainer";
import CopyrightRNA from "./BuildingBlocs/CopyrightRNA";
import PhoneNumberContainer from "../PhoneNumberContainer";

import useFontFamily from "../../utils/useFontFamily";

//_utils
import { getHeader } from "../../utils/footerUtils";

import useDirection from "../../utils/useDirection";
import { CustomDivider } from "../../pages/DashboardPage";

//_styling
import style from "./Footer.module.css";
import { Link } from "react-router-dom";

const RIGHT = "right";
const LEFT = "left";
const AR = "ar";

const Footer = () => {
  const language = useSelector((state) => state.application.language);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const fontFamilyLight = useFontFamily(i18n.language, "normal");
  const responsiveState = useResponsiveState();
  const items = [
    {
      key: "1",
      label: <p style={{ fontFamily: fontFamilyLight }}>{t("french")}</p>,
    },
    {
      key: "2",
      label: <p style={{ fontFamily: fontFamilyLight }}>{t("arabic")}</p>,
    },
  ];
  const direction = useDirection(i18n.language);

  const handleChange = (value) => {
    switch (value) {
      case "fr":
        changeLanguage("fr");
        break;
      case "ar":
        changeLanguage("ar");
        break;
      default:
        changeLanguage("fr");
        break;
    }
  };
  const onClick = ({ key }) => {
    switch (key) {
      case "1":
        changeLanguage("fr");
        break;
      case "2":
        changeLanguage("ar");
        break;
      default:
        changeLanguage("fr");
        break;
    }
  };
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    dispatch(setLanguage(lng));
    dispatch(setSiteDirection(direction));
  };
  // Memoize the pages array creation
  const memoizedContactUsBloc = useMemo(() => {
    try {
      if (!language || !t) return [];
      return [
        {
          id: "email",
          component: <ContactContainer />,
        },
        {
          id: "phone",
          component: <PhoneNumberContainer />,
        },
      ];
    } catch (error) {
      console.error("Error occurred while memoizing ContactUsBloc:", error);
      return [];
    }
  }, [language, t]);
  const memoizedExploreYokoBloc = useMemo(() => {
    try {
      if (!language || !t) return [];
      return [
        {
          id: "YOKO Eat",
          component: <Link to="/web/guest/eat">{t("YOKO Eat")}</Link>,
        },
        {
          id: "YOKO Market",
          component: <Link to="/web/guest/market"> {t("YOKO Market")}</Link>,
        },
        {
          id: "Dilevery Boy",
          component: <> {t("Dilevery Boy")}</>,
        },
        {
          id: "Traditional Food",
          component: <>{t("Traditional Food")}</>,
        },
      ];
    } catch (error) {
      console.error("Error occurred while memoizing ContactUsBloc:", error);
      return [];
    }
  }, [language, t]);

  const textStyle = {
    textAlign: language === AR ? RIGHT : LEFT,
    fontFamily: fontFamilyLight,
    fontSize: responsiveState.fixedFontSize_Footer__Li,
  };
  const getContent = (id) => {
    switch (id) {
      case 2:
        return (
          <ListItemsBloc
            language={language}
            memoizedBloc={memoizedContactUsBloc}
          />
        );
      case 3:
        return (
          <ListItemsBloc
            language={language}
            myStyle={textStyle}
            memoizedBloc={memoizedExploreYokoBloc}
          />
        );

      case 4:
        return (
          <div>
            <div className="flex flex-row items-center gap-2">
              <CustomDivider width={"3.1875rem"} />
              <SocialMediaButtons color={"white"} />
            </div>
            <div>
              <Dropdown
                menu={{
                  items,
                  onClick,
                }}
                onChange={handleChange}
              >
                <Space
                  dir={direction}
                  style={{
                    fontFamily: fontFamilyLight,
                    color: "white",
                    border: "1px solid white",
                    padding: "15px",
                    width: 146,
                    height: 47,
                    borderRadius: "10px",
                  }}
                >
                  {language === AR ? t("arabic") : t("french")}
                  <DownOutlined />
                </Space>
              </Dropdown>
            </div>
          </div>
        );
      default:
        return "";
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 3);

    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            optionSelectedColor: "var(--color-text)",
          },
        },
        token: {
          colorBgContainer: "none",
          colorBorder: "white",
          colorPrimary: "white",
          colorText: "gray",
          borderRadius: "15px",
        },
      }}
    >
      <footer
        className={`w-full `}
        style={{ background: "var(--color-secondary)", marginTop: "200px" }}
      >
        <div>
          <div className={style.container}>
            <div
              style={{
                maxWidth: "62.5rem",
              }}
              className={`bg-cover h-full relative w-full flex items-center flex-col`}
            >
              <div
                className={`grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 ${style.grid}`}
              >
                <div className="w-full" dir={direction}>
                  <img src={LogoB} alt="YOKO Company Logo" width={"130px"} />
                </div>

                {[2, 3, 4].map((id) => (
                  <FooterItem
                    fixedWidth={responsiveState.fixedWidth}
                    fixedHeight={responsiveState.fixedHeight}
                    header={getHeader(id, t)}
                    descriptionContent={getContent(id)}
                    key={id}
                    language={language}
                  />
                ))}
              </div>
              <CustomDivider width={"20.8rem"} height={"3px"} />
              <CopyrightRNA />
            </div>
          </div>
        </div>
      </footer>
    </ConfigProvider>
  );
};

const ListItemsBloc = React.memo(({ memoizedBloc, myStyle }) => {
  return (
    <nav>
      <ul className={style.listItemsBloc}>
        {memoizedBloc.map((blocItem) => (
          <li key={blocItem.id} style={myStyle}>
            {blocItem.component}
          </li>
        ))}
      </ul>
    </nav>
  );
});

export default Footer;
