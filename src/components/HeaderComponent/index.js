import { Button } from "antd";
import style from "./HeaderComponent.module.css";
import { useTranslation } from "react-i18next";
import useFontFamily from "../../utils/useFontFamily";
import { Link } from "react-router-dom";

const HeaderComponent = ({ children, toPage }) => {
  const { t, i18n } = useTranslation();
  const fontFamilyBold = useFontFamily(i18n.language, "bold");
  return (
    <div className={style.headerStyle}>
      <h1
        style={{
          color: "var(--color-text)",
          fontSize: "var(--font-extra-large-size)",
          fontFamily: fontFamilyBold,
        }}
      >
        {children}
      </h1>
      <Link to={toPage}>
        <Button
          className="text-white px-10 py-3 text-xl rounded-full mt-3 mb-3"
          style={{
            fontSize: "var(--font-medium-size)",
            height: "46px",
            width: "fit-content",
            border: "none",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "var(--color-primary)",
            alignItems: "center",
            fontFamily: fontFamilyBold,
          }}
        >
          {t("seeMore")}
        </Button>
      </Link>
    </div>
  );
};
export default HeaderComponent;
