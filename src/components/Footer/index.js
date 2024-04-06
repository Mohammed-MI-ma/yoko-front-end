//__React
import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useTranslation } from "react-i18next";
import useResponsiveState from "../../utils/useResponsiveState";

import {
  setLanguage,
  setSiteDirection,
} from "../../reducers/applicationService/applicationSlice";

//31kb
import { LogoB } from "../../images";

import { ConfigProvider, Select } from "antd";

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

const RIGHT = "right";
const LEFT = "left";
const AR = "ar";

const Footer = ({ language }) => {
  const { t, i18n } = useTranslation();
  const dynamicWidth = useSelector((state) => state.application.dynamicWidth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fontFamilyBold = useFontFamily(i18n.language, "bold");
  const fontFamilyLight = useFontFamily(i18n.language, "normal");
  const responsiveState = useResponsiveState();

  const direction = useDirection(i18n.language);

  const handleChange = (value) => {
    switch (value) {
      case "Francais":
        changeLanguage("fr");
        break;
      case "Arabe":
        changeLanguage("ar");
        break;
      case "Anglais":
        changeLanguage("en");
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
    if (lng === "ar") {
      navigate(window.location.pathname.replace(/^\/(fr|en)/, "/ar"));
    } else {
      navigate(window.location.pathname.replace(/^\/(ar|en)/, "/fr"));
    }
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
          component: <>{t("YOKO Eat")}</>,
        },
        {
          id: "YOKO Market",
          component: <> {t("YOKO Market")}</>,
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
              <Select
                onChange={handleChange}
                placement="bottomLeft"
                defaultValue="Francais"
                style={{
                  width: 146,
                  height: 47,
                  fontFamily: fontFamilyBold,
                }}
                options={[
                  {
                    value: "Francais",
                    label: (
                      <p style={{ fontFamily: fontFamilyBold }}>
                        {t("french")}
                      </p>
                    ),
                  },
                  {
                    value: "Arabe",
                    label: (
                      <p style={{ fontFamily: fontFamilyBold }}>
                        {t("arabic")}
                      </p>
                    ),
                  },
                ]}
              />
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
        className={`w-full flex flex-col items-center ${style.pageFooter}`}
      >
        <div
          className="flex flex-col items-center"
          style={{
            width: dynamicWidth,
            fontFamily: fontFamilyBold,
          }}
        >
          <div
            className={`grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 ${style.grid}`}
          >
            <img src={LogoB} alt="Company Logo" />

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
