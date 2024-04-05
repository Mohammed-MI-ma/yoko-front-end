import React from "react";

import { useTranslation } from "react-i18next";
import ImageCardWithDescriptionFooter from "../ImageCardWithDescriptionFooter";
import useResponsiveState from "../../utils/useResponsiveState";
import useFontFamily from "../../utils/useFontFamily";
import useDirection from "../../utils/useDirection";
import {
  getAction,
  getImageAlt,
  getImageHighQualitySrc,
  getImageLowQualitySrc,
} from "../../utils/imageUtils";
import useDynamicWidth from "../../utilities/useDynamicWidth";

const OurPartners = ({ vierge }) => {
  const divRef = useDynamicWidth(); // Use the custom hook

  const { t, i18n } = useTranslation();
  const responsiveState = useResponsiveState();
  const fontFamilyBold = useFontFamily(i18n.language, "bold");
  const direction = useDirection(i18n.language);

  const sectionStyle = {
    dir: direction,
    fontFamily: fontFamilyBold,
    fontSize: responsiveState.fixedFontSize,
    textTransform: "uppercase",
    color: "var(--color-secondary)",
    marginBottom: "1.4375rem",
  };

  return (
    <section
      className={`w-full flex flex-col items-center `}
      style={{
        maxWidth: "75rem",
        marginBottom: `calc(78px + (${responsiveState.fixedHeight} / 3))`,
      }}
    >
      <div ref={divRef}>
        <h1 style={sectionStyle}>{t("Discover our yoko")}</h1>
        <div
          className="grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-3 items-center"
          style={{ margin: "0 auto", gap: responsiveState.fixedGap }}
        >
          {[1, 2, 3, 4].map((id) => (
            <ImageCardWithDescriptionFooter
              fixedWidth={responsiveState.fixedWidth} // Set fixed width
              fixedHeight={responsiveState.fixedHeight} // Set fixed height
              highDefinitionImgUrl={vierge ? null : getImageHighQualitySrc(id)}
              backgroundImageUrl={vierge ? null : getImageLowQualitySrc(id)}
              descriptionContent={vierge ? null : getImageAlt(id)}
              key={id}
              action={vierge ? null : getAction(id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPartners;
