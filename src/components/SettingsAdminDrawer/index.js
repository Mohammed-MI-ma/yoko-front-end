import React from "react";
import DrawerGeneric from "../DrawerGeneric";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../../reducers/authService/authSlice";
import { useNavigate } from "react-router-dom";
import { setDrawerOpenSettings } from "../../reducers/applicationService/applicationSlice";
import useFontFamily from "../../utils/useFontFamily";
import { useTranslation } from "react-i18next";
import useDirection from "../../utils/useDirection";

const SettingsAdminDrawer = ({ openSettings, onClose }) => {
  const { t, i18n } = useTranslation();

  const direction = useDirection(i18n.language);

  const navigate = useNavigate();
  const fontFamilybold = useFontFamily(i18n.language, "bold");

  const d = useDispatch();
  const logoutHandler = () => {
    d(logout());
    d(setDrawerOpenSettings(false));
    navigate("/");
  };
  return (
    <DrawerGeneric
      open={openSettings}
      onClose={onClose}
      titre={
        <h1 dir={direction} style={{ fontFamily: fontFamilybold }}>
          {t("settings")}
        </h1>
      }
    >
      <Button
        onClick={logoutHandler}
        className="w-full"
        danger
        style={{
          fontFamily: fontFamilybold,
        }}
      >
        {t("Se déconnecter")}
      </Button>
    </DrawerGeneric>
  );
};

export default SettingsAdminDrawer;
