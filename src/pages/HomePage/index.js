import React from "react";
import HeroSection from "../../components/HeroSection";
import OurPartners from "../../components/OurPartners";

//__REACT_HELMET
import { Helmet } from "react-helmet";

//__REACT_i18N
import { useTranslation } from "react-i18next";

const HomePage = ({ language }) => {
  // Retrieve the translation function from the useTranslation hook
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>{t("home")}</title>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="Calculate your eligibility for social care programs based on socio-economic declarations with the RSU Calculator. Get accurate scores and guidance for accessing social welfare benefits. Free and easy-to-use."
        />
        <meta name="keywords" content="Keywords related to your content" />
        <meta name="author" content="Morocco Innovation Hub" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={t("home")} />
        <meta
          property="og:description"
          content="Description of your website/page"
        />
        <meta property="og:url" content="URL of the page" />
        <meta property="og:image" content="URL of the image" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        {/* Add other meta tags as needed */}
      </Helmet>
      <section style={{ flex: "1 1 auto" }} className="mb-10">
        <section id={"main-content"}>
          <HeroSection />
          <OurPartners />
        </section>
      </section>
    </>
  );
};

export default HomePage;
