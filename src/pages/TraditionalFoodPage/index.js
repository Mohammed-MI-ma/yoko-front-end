import React, { useEffect, useState } from "react";
import { Traditional, Traditional_low } from "../../images";
import ComingSoon from "../../components/ComingSoon";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import useFontFamily from "../../utils/useFontFamily";

const TraditionalFoodPage = ({ highDefinitionImgUrl = Traditional }) => {
  const { i18n, t } = useTranslation();
  const language = useSelector((state) => state.application.language);

  const fontFamilyLight = useFontFamily(i18n.language, "normal");
  const [imageUrl, setImageUrl] = useState(Traditional_low);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!imageLoaded) {
      const highDefinitionImageUrl = highDefinitionImgUrl;
      const img = new Image();
      img.src = highDefinitionImageUrl;
      img.onload = () => {
        clearTimeout(timeoutId);
        setImageUrl(highDefinitionImageUrl);
        setImageLoaded(true);
      };
      const timeoutId = setTimeout(() => {
        setImageUrl(Traditional_low);
        setImageLoaded(true);
      }, 5000);
    }
  }, [imageLoaded, highDefinitionImgUrl]);
  const containerStyles = {
    backgroundImage: `url(${imageUrl})`,
    backgroundPosition: "top",
    backgroundSize: "cover",
    borderBottom: "0px",
    position: "relative",
    backgroundColor: "white",
    minHeight: "75vh",
  };

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>{t("Traditional Food")}</title>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content={t("Description of Traditional Food")}
        />
        <meta
          name="keywords"
          content={t("traditional food, cuisine, recipe")}
        />
        <meta name="author" content={t("Your Company Name")} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={t("Traditional Food")} />
        <meta
          property="og:description"
          content={t("Description of Traditional Food")}
        />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <div className="w-full">
        <div
          className={`flex justify-center items-center `}
          style={containerStyles}
        >
          <ComingSoon
            font={language === "ar" ? fontFamilyLight : "Neue_Power-fr"}
            title={
              <h1 style={{ fontSize: "4rem" }}>{t("Traditional Food")}</h1>
            }
          />
        </div>
      </div>
    </>
  );
};

export default TraditionalFoodPage;
