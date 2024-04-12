import React from "react";
import { useSelector } from "react-redux";

import HeroSection from "../../components/HeroSection";
import OurPartners from "../../components/OurPartners";

//__REACT_HELMET
import { Helmet } from "react-helmet";

//__REACT_i18N
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation();
  const language = useSelector((state) => state.application.language);

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>{t("home")}</title>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="Discover Yoko, a revolutionary platform developed by Morocco Innovation Hub Company. Yoko offers a comprehensive suite of services tailored for businesses in Morocco, including food delivery, marketplace solutions, and more. Experience the convenience of Yoko as it transforms the way you engage with local businesses and services in Morocco."
        />

        <meta name="keywords" content="Keywords related to your content" />
        <meta name="author" content="Morocco Innovation Hub Company" />
        <meta name="developer" content="Mohammed Aboutalha" />
        <meta name="creator" content="Mohammed Aboutalha" />
        <meta name="publisher" content="Morocco Innovation Hub Company" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={t("home")} />
        <meta property="og:description" content={t("og_description")} />
        <meta
          property="og:url"
          content="https://www.moroccoinnovationhub.org/web/guest/acceuil"
        />
        <meta property="og:image" content="URL of the image" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <section style={{ flex: "1 1 auto" }}>
        <section id={"main-content"} className="flex items-center flex-col">
          <HeroSection />
          <OurPartners />
          {/* <OurBestSellers />
          <ProductOfTheWeek />*/}
        </section>
      </section>
    </>
  );
};

export default HomePage;
