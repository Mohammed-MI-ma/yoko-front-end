import React, { useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdLocalGroceryStore } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { HiHomeModern } from "react-icons/hi2";

import { useTranslation } from "react-i18next";
import LazyLoadedOurPartnersCard from "./LazyLoadedOurPartnersCard";
import { TbClick } from "react-icons/tb";

import {
  Delivery_low,
  Tagine_low,
  YOKOMarket_low,
  YokoEat_low,
} from "../../images";
import { motion } from "framer-motion";
import { Avatar, Button } from "antd";

const OurPartners = () => {
  const language = useSelector((state) => state.application.language);
  const primaryRegularFont = useMemo(
    () => `Primary-Bold-${language}`,
    [language]
  );

  const { t } = useTranslation();

  const [activeButton, setActiveButton] = useState("my button1");

  const handleButtonClick = (buttonId) => {
    console.log(buttonId);
    setActiveButton(buttonId);
  };
  const isButtonActive = (buttonId) => {
    return buttonId === activeButton;
  };
  const sectionStyle = {
    dir: language === "ar" ? "rtl" : "ltr",
    fontFamily: primaryRegularFont,
    fontSize: "2rem",
    color: "var(--color-secondary)",
    paddingTop: "70px",
  };

  return (
    <section
      className={`w-full flex flex-col mb-10 items-center `}
      style={{
        background: "white",
      }}
    >
      <h1 className={`text-center `} style={sectionStyle}>
        {t("Discover our yoko")}?
      </h1>
      <p
        style={{ textAlign: "center", maxWidth: "400px" }}
        className={`mb-10 `}
      >
        Chez Yoko, nous sommes passionnés par la préservation et la célébration
        de la richesse culinaire du Maroc, offrant à nos clients une expérience
        culinaire inoubliable à chaque bouchée
      </p>
      <div
        className="grid  lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-3 gap-10 items-center flex-grow "
        style={{ margin: "0 auto" }}
      >
        {[1, 2, 3, 4].map((id) => (
          <div
            key={id}
            className="text-center"
            style={{ color: "white", position: "relative" }}
          >
            <div>
              <Button
                type="primary"
                size={"large"}
                shape="circle"
                style={{
                  position: "absolute",
                  zIndex: 3000,
                  transform: "translate(-25%,-25%)",
                  left: 0,
                  top: 0,
                  background: "var(--color-secondary)",
                }}
                icon={<TbClick />}
                id={`my button${id}`}
                onClick={() => handleButtonClick(`my button${id}`)}
              ></Button>
            </div>
            <div className="flex flex-row relative ">
              <motion.div
                initial={{ x: 0, opacity: 1 }}
                animate={
                  isButtonActive(`my button${id}`)
                    ? { opacity: 1 }
                    : { opacity: 0.25 }
                }
                transition={{ type: "tween", duration: 0.5 }}
              >
                <LazyLoadedOurPartnersCard
                  font={primaryRegularFont}
                  lowQualitySrc={getImageLowQualitySrc(id)}
                  highQualitySrc={getImageHighQualitySrc(id)}
                  alt={getImageAlt(id)}
                  // eslint-disable-next-line no-useless-concat
                  badge={getBadge(id)}
                />
              </motion.div>
              <motion.div
                style={{
                  position: "absolute",
                  bottom: 0,
                  color: "black",
                  width: "100%",
                  transform: "translate(10px,100%)",
                }}
                initial={{ x: 0, opacity: 1 }}
                animate={
                  isButtonActive(`my button${id}`)
                    ? { opacity: 1 }
                    : { opacity: 0 }
                }
                transition={{ type: "tween", duration: 0.5 }}
              ></motion.div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const getImageLowQualitySrc = (id) => {
  switch (id) {
    case 3:
      return YokoEat_low;
    case 2:
      return YOKOMarket_low;
    case 1:
      return Delivery_low;
    case 4:
      return Tagine_low;
    default:
      return "";
  }
};

const getImageHighQualitySrc = (id) => {
  switch (id) {
    case 3:
      return "https://raw.githubusercontent.com/Mohammed-MI-ma/assets-YOKO/main/YokoEat.jpg";
    case 2:
      return "https://raw.githubusercontent.com/Mohammed-MI-ma/assets-YOKO/main/YOKOMarket.jpg";
    case 1:
      return "https://raw.githubusercontent.com/Mohammed-MI-ma/assets-YOKO/main/Delivery.jpg";
    case 4:
      return "https://raw.githubusercontent.com/Mohammed-MI-ma/assets-YOKO/main/Le-tajine.jpg";
    default:
      return "";
  }
};
const getBadge = (id) => {
  switch (id) {
    case 1:
      return "désormais disponible";
    default:
      return "bientôt disponible";
  }
};
const getImageAlt = (id) => {
  switch (id) {
    case 1:
      return (
        <div className="flex justify-between items-center gap-2 w-full">
          <div className="flex flex-col  items-start">
            <h1>YOKO : livraison</h1>
            <p>
              <small>Disponible</small>
            </p>
          </div>
          <Avatar
            size={48}
            icon={<CiDeliveryTruck />}
            MdLocalGroceryStore
            className="shadow-lg"
          />
        </div>
      );
    case 2:
      return (
        <div className="flex justify-between items-center gap-2 w-full">
          <div className="flex flex-col  items-start">
            <h1>YOKO : Marché</h1>
            <p>
              <small>Bientôt disponible</small>
            </p>
          </div>
          <Avatar
            size={48}
            icon={<MdLocalGroceryStore />}
            MdLocalGroceryStore
            className="shadow-lg"
          />
        </div>
      );
    case 3:
      return (
        <div className="flex justify-between items-center gap-2 w-full">
          <div className="flex flex-col  items-start">
            <h1>YOKO : Mangez</h1>
            <p>
              <small>Bientôt disponible</small>
            </p>
          </div>
          <Avatar
            size={48}
            icon={<IoFastFoodOutline />}
            className="shadow-lg"
          />
        </div>
      );

    case 4:
      return (
        <div className="flex justify-between items-center gap-2 w-full">
          <div className="flex flex-col  items-start">
            <h1>YOKO : Traditional </h1>
            <p>
              <small>Bientôt disponible</small>
            </p>
          </div>
          <Avatar size={48} icon={<HiHomeModern />} className="shadow-lg" />
        </div>
      );
    default:
      return "";
  }
};

export default OurPartners;
