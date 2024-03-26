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
        cover={
          <ProgressiveImage
            lowQualitySrc={lowQualitySrc}
            highQualitySrc={highQualitySrc}
            alt={alt}
          />
        }
        hoverable
        style={{
          width: 240,
          height: 280,
          background: "var(--color-primary)",
        }}
      >
        <Meta
          title={alt}
          className=""
          style={{ color: "white", fontFamily: font, fontWeight: "700" }}
        />
      </Card>
    </ConfigProvider>
  );
};

export default OurPartnersCard;
