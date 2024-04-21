import React from "react";
import { Link } from "react-router-dom";
import { Button, Divider } from "antd";
import EnhancedHeroSection from "../../components/CustomHeroSection";
import SocialMediaButtons from "../../components/SocialMedia";
import { useTranslation } from "react-i18next";
import useFontFamily from "../../utils/useFontFamily";
import CenteredContainer from "../../components/CenteredContainer";

const AtterrissagePage = () => {
  const { t, i18n } = useTranslation();
  const fontFamilyBold = useFontFamily(i18n.language, "bold");
  const buttonWidth = "20.5rem";
  const buttonHeight = "5rem";

  return (
    <section style={{ flex: "1" }}>
      <section id="main-content" className="flex items-center flex-col">
        <EnhancedHeroSection />
        <Link to="/web/guest/acceuil">
          <Button
            style={{
              width: buttonWidth,
              height: buttonHeight,
              background: "var(--color-primary)",
              fontFamily: fontFamilyBold,
              color: "var(--color-accent)",
              borderRadius: "3rem",
              fontSize: "1.5rem",
            }}
          >
            {t("SEE MORE")}
          </Button>
        </Link>
        <CenteredContainer style={{ width: "50%", marginBottom: "1rem" }}>
          <Divider style={{ background: "var(--color-secondary)" }} />
          <SocialMediaButtons color="var(--color-secondary)" />
        </CenteredContainer>
      </section>
    </section>
  );
};

export default AtterrissagePage;
