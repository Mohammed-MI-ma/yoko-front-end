import React from "react";
import DrawerGeneric from "../DrawerGeneric";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../../reducers/authService/authSlice";
import { useNavigate } from "react-router-dom";
import { setDrawerOpenSettings } from "../../reducers/applicationService/applicationSlice";

const SettingsAdminDrawer = ({ openSettings, onClose, t }) => {
  const navigate = useNavigate();

  const d = useDispatch();
  const logoutHandler = () => {
    d(logout());
    d(setDrawerOpenSettings(false));
    navigate("/");
  };
  return (
    <DrawerGeneric open={openSettings} onClose={onClose} titre={t("settings")}>
      <Button onClick={logoutHandler}>disconnect</Button>
    </DrawerGeneric>
  );
};

export default SettingsAdminDrawer;
