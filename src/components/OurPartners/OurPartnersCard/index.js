import { Card, ConfigProvider } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import ProgressiveImage from "../ProgressiveImage";

const OurPartnersCard = ({ font, lowQualitySrc, highQualitySrc, alt }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            headerHeight: 0,
            headerHeightSM: 0,
          },
        },
        token: {
          borderRadiusLG: 50,
          headerHeight: 0,
          headerHeightSM: 0,
          colorText: "white",
        },
      }}
    >
      <Card
        hoverable
        cover={
          <ProgressiveImage
            lowQualitySrc={lowQualitySrc}
            highQualitySrc={highQualitySrc}
            alt={alt}
          />
        }
        style={{
          width: 240,
          cursor: "pointer",
          height: 280,
          background: "var(--color-primary)",
        }}
      >
        <Meta
          title={alt}
          style={{
            color: "white",
            fontFamily: "Primary-Regular-fr",
            fontWeight: "700",
          }}
        />
      </Card>
    </ConfigProvider>
  );
};

export default OurPartnersCard;
