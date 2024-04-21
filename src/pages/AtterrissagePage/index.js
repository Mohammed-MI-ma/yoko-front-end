import React from "react";
import { Button, Divider } from "antd";
import { Link } from "react-router-dom";
import EnhancedHeroSection from "../../components/CustomHeroSection";
import SocialMediaButtons from "../../components/SocialMedia";
import { useTranslation } from "react-i18next";
import useFontFamily from "../../utils/useFontFamily";

const AtterrissagePage = () => {
  const { t, i18n } = useTranslation();
  const fontFamilyBold = useFontFamily(i18n.language, "bold");

  return (
    <section style={{ flex: "1" }}>
      <section id="main-content" className="flex items-center flex-col">
        <EnhancedHeroSection />
        <Link to="/web/guest/acceuil">
          <Button
            style={{
              width: "20.5rem",
              height: "5rem",
              background: "var(--color-primary)",
              fontFamily: fontFamilyBold,
              color: "var(--color-accent)",
              borderRadius: "3rem",
            }}
          >
            {t("SEE MORE")}
          </Button>
        </Link>
        <Divider />
        <SocialMediaButtons color="var(--color-secondary)" />
      </section>
    </section>
  );
};

export default AtterrissagePage;
