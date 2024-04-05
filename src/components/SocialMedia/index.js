import React from "react";
import { Button, Space, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import useFontFamily from "../../utils/useFontFamily";

const SocialMediaButton = ({ color, icon, tooltip }) => {
  const { t, i18n } = useTranslation();
  const fontFamilyLight = useFontFamily(i18n.language, "normal");

  const title = t(tooltip);
  return (
    <Tooltip title={<p style={{ fontFamily: fontFamilyLight }}>{title}</p>}>
      <Button
        shape="circle"
        className="flex items-center justify-center border-none"
        style={{ color }}
      >
        {icon}
      </Button>
    </Tooltip>
  );
};

const SocialMediaButtons = ({ color, size = "large" }) => {
  return (
    <Space>
      <SocialMediaButton
        color={color}
        icon={<FaFacebookF size={size} />}
        tooltip={"facebook"}
      />
      <SocialMediaButton
        color={color}
        icon={<FaTwitter size={size} />}
        tooltip="twitter"
      />
      <SocialMediaButton
        color={color}
        icon={<FaInstagram size={size} />}
        tooltip="Instagram"
      />
    </Space>
  );
};

export default SocialMediaButtons;
