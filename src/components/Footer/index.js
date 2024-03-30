import React, { useEffect, useMemo, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import useResponsiveState from "../../utils/useResponsiveState";
import { setDynamicWidth } from "../../reducers/applicationService/applicationSlice";
import { LogoB } from "../../images";
import { ConfigProvider, Divider, Select } from "antd";
import FooterItem from "../FooterItem";
import SocialMediaButtons from "../SocialMedia";
import ContactContainer from "../contactContainer";
import CopyrightRNA from "./BuildingBlocs/CopyrightRNA";
import { useNavigate } from "react-router-dom";
import { fetchContactInfo } from "../../actions/contactActions";
import PhoneNumberContainer from "../PhoneNumberContainer";
const Footer = () => {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    // Navigate to the login page when the button is clicked
    startTransition(() => {
      navigate(`/${language}/web/guest/traditional`);
    });
  };
  const getHeader = (id) => {
    switch (id) {
      case 2:
        return t("contact us");
      case 3:
        return t("Discover our yoko");
      case 4:
        return t("follow us");
      default:
        return "";
    }
  };
  const getContent = (id) => {
    switch (id) {
      case 2:
        return (
          <nav>
            <ul
              style={{
                color: "white",
                fontWeight: "200",
                fontSize: responsiveState.fixedFontSize_Footer__Li,
              }}
            >
              <li>
                <ContactContainer />
              </li>
              <li>
                <PhoneNumberContainer />
              </li>
            </ul>
          </nav>
        );

      case 3:
        return (
          <nav>
            <ul
              style={{
                color: "white",
                fontWeight: "200",
                fontSize: responsiveState.fixedFontSize_Footer__Li,
              }}
            >
              <li>{t("YOKO Eat")}</li>
              <li>{t("YOKO Market")}</li>
              <li>{t("Dilevery Boy")}</li>
              <li onClick={handleClick}>{t("Traditional Food")}</li>
            </ul>
          </nav>
        );

      case 4:
        return (
          <div>
            <div className="flex flex-row items-center gap-2">
              <div style={{ width: "51px" }}>
                <Divider style={{ background: "var(--color-primary)" }} />
              </div>
              <SocialMediaButtons />
            </div>
            <div>
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
                    colorText: "white",
                    borderRadius: "15px",
                  },
                }}
              >
                <Select
                  Placement="bottomLeft"
                  defaultValue="Francais"
                  style={{
                    width: 146,
                    height: 47,
                    fontFamily: primaryBoldFont,
                  }}
                  options={[
                    {
                      value: "Francais",
                      label: "Francais",
                    },
                    {
                      value: "Francais",
                      label: "Francais",
                    },
                    {
                      value: "Francais",
                      label: "Francais",
                    },
                  ]}
                />
              </ConfigProvider>
            </div>
          </div>
        );
      default:
        return "";
    }
  };
  //__DISPATCH
  const d = useDispatch();

  //USE_TRANSLATION
  const { t } = useTranslation();
  //__DYNAMIC WIDTH
  const dynamicWidth = useSelector((state) => state.application.dynamicWidth);
  // Simulate a window resize event after 0.01 second
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 3);

    return () => clearTimeout(timeoutId);
  }, []);

  //__INTERN
  const language = useSelector((state) => state.application.language);
  const primaryBoldFont = useMemo(() => `Primary-Bold-${language}`, [language]);

  // RESPONSIVENESS
  const responsiveState = useResponsiveState();

  //__PAGE FOOTER STYLE
  const pageFooterStyle = {
    backgroundColor: "var(--color-secondary)",
  };
  return (
    <footer
      style={{
        ...pageFooterStyle,
      }}
      className={`w-full flex flex-col items-center`}
    >
      <div
        className="flex flex-col items-center"
        style={{
          margin: "0 auto",
          width: dynamicWidth,
        }}
      >
        <div
          className="grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-3 "
          style={{
            margin: "0 auto",
            paddingTop: "80px",
            paddingBottom: "20px",
            gap: responsiveState.fixedGapFooter,
          }}
        >
          <div
            style={{ width: responsiveState.fixedWidth, height: "max-content" }}
            className="flex justify-center"
          >
            <img
              src={LogoB}
              style={{ width: responsiveState.fixedWidthLogo }}
              alt={t("logoText")}
            />
          </div>

          {[2, 3, 4].map((id) => (
            <FooterItem
              fixedWidth={responsiveState.fixedWidth}
              fixedHeight={responsiveState.fixedHeight}
              header={getHeader(id)}
              descriptionContent={getContent(id)}
              key={id}
            />
          ))}
        </div>
        <div style={{ maxWidth: "333px", width: "100%" }}>
          <Divider style={{ backgroundColor: "var(--color-primary)" }} />
        </div>
        <CopyrightRNA />
      </div>
    </footer>
  );
};

export default Footer;
