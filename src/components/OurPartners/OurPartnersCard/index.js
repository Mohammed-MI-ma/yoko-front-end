import { Badge, Card, ConfigProvider } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import ProgressiveImage from "../ProgressiveImage";

const OurPartnersCard = ({ badge, lowQualitySrc, highQualitySrc, alt }) => {
  console.log("badge", badge);
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
          borderRadiusLG: 30,
          headerHeight: 0,
          headerHeightSM: 0,
          colorText: "white",
        },
      }}
    >
      <Badge.Ribbon text={badge} color={"var(--color-secondary)"}>
        <Card
          className="shadow-lg"
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
            cursor: "not-allowed",
            height: 300,
            background: "var(--color-secondary)",
            position: "relative",
          }}
        >
          <Meta
            title={alt}
            style={{
              color: "white",
              fontFamily: "Primary-Regular-fr",
              fontWeight: "700",
            }}
          />{" "}
        </Card>
      </Badge.Ribbon>
    </ConfigProvider>
  );
};

export default OurPartnersCard;
