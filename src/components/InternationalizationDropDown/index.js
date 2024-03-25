import React from "react";
import { GrLanguage } from "react-icons/gr";
import { ReactSVG } from "react-svg";
import fr from "../../assets/images/fr.svg";
import ma from "../../assets/images/ma.svg";
import { useTranslation } from "react-i18next";
import { FaUser } from "react-icons/fa";
import { Dropdown } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  setLanguage,
  setSiteDirection,
} from "../../reducers/applicationService/applicationSlice";
import { useNavigate } from "react-router-dom";

const InternationalizationDropDown = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = [
    {
      key: "1",
      icon: <ReactSVG src={ma} />,
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => {
            changeLanguage("ar");
          }}
        >
          <span style={{ fontFamily: "Primary-Regular-ar" }}>
            {t("arabic")}
          </span>
        </div>
      ),
    },
    {
      key: "2",
      icon: <ReactSVG src={fr} />,
      label: (
        <div
          onClick={() => {
            changeLanguage("fr");
          }}
        >
          <span style={{ fontFamily: "Primary-Regular-ar" }}>
            {" "}
            {t("french")}
          </span>
        </div>
      ),
    },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    dispatch(setLanguage(lng));
    dispatch(setSiteDirection(lng === "ar" ? "rtl" : "ltr"));
    if (lng === "ar") {
      navigate(window.location.pathname.replace(/^\/(fr|en)/, "/ar"));
    } else if (lng === "fr") {
      navigate(window.location.pathname.replace(/^\/(ar|en)/, "/fr"));
    }
  };
  const language = useSelector((state) => state.application.language);

  const handleClick = () => {
    // Navigate to the login page when the button is clicked
    navigate(`/${language}/moachirkom/account/log-in`);
  };
  return (
    <Dropdown.Button
      onClick={handleClick}
      type="text "
      arrow={true}
      menu={{ items }}
      icon={<GrLanguage style={{ cursor: "pointer" }} />}
    >
      <FaUser color={"var(--color-theme)"} />
    </Dropdown.Button>
  );
};

export default InternationalizationDropDown;
