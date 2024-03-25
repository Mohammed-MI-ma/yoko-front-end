import { Card } from "antd";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { useTranslation } from "react-i18next";
import Meta from "antd/es/card/Meta";

const OurPartners = () => {
  const language = useSelector((state) => state.application.language);
  const primaryRegularFont = useMemo(
    () => `Primary-Bold-${language}`,
    [language]
  );

  const { t } = useTranslation();
  // Define variables for the primary regular font and the special logo font,
  // incorporating the language into their names for localization purposes.

  // Styles
  const sectionStyle = {
    dir: language === "ar" ? "rtl" : "ltr",
    fontFamily: primaryRegularFont,
    fontSize: "50px",
    paddingTop: "70px",
  };

  return (
    <section
      className={`w-full flex flex-col `}
      style={{
        background: "white",
      }}
    >
      <h1 className={`text-center`} style={sectionStyle}>
        Discover our yoko
      </h1>
      <div
        className="grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-3 gap-10 items-center flex-grow "
        style={{ margin: "0 auto" }}
      >
        <div className="text-center " style={{ color: "white" }}>
          <Card
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
            hoverable
            style={{
              width: 240,
              background: "var(--color-primary)",
              color: "white",
              fontFamily: primaryRegularFont,
            }}
          >
            <Meta
              title="YOKO Eat"
              className="w-full h-full"
              style={{ color: "white" }}
            />
          </Card>
        </div>
        <div className="text-center " style={{ color: "white" }}>
          <Card
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
            hoverable
            style={{
              width: 240,
              background: "var(--color-primary)",
              color: "white",
              fontFamily: primaryRegularFont,
            }}
          >
            <Meta
              title="YOKO Eat"
              className="w-full h-full"
              style={{ color: "white" }}
            />
          </Card>
        </div>
        <div className="text-center " style={{ color: "white" }}>
          <Card
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
            hoverable
            style={{
              width: 240,
              background: "var(--color-primary)",
              color: "white",
              fontFamily: primaryRegularFont,
            }}
          >
            <Meta
              title="YOKO Eat"
              className="w-full h-full"
              style={{ color: "white" }}
            />
          </Card>
        </div>
        <div className="text-center " style={{ color: "white" }}>
          <Card
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
            hoverable
            style={{
              width: 240,
              background: "var(--color-primary)",
              color: "white",
              fontFamily: primaryRegularFont,
            }}
          >
            <Meta
              title="YOKO Eat"
              className="w-full h-full"
              style={{ color: "white" }}
            />
          </Card>
        </div>
      </div>
    </section>
  );
};

export default OurPartners;
