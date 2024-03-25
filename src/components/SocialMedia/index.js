import React from "react";
import PropTypes from "prop-types";
import { Button, Space, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const SocialMediaButton = ({ platform, color, icon, tooltip }) => {
  const { t } = useTranslation();

  // Handle missing translations
  const title = t(tooltip) || tooltip;

  // Render button
  return (
    <Tooltip title={title}>
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

const SocialMediaButtons = () => {
  return (
    <Space>
      <SocialMediaButton
        platform="facebook"
        color="var(--color-primary)"
        icon={<FaFacebookF size={"large"} className="shadow-lg" />}
        tooltip="facebook"
      />
      <SocialMediaButton
        platform="twitter"
        color="var(--color-primary)"
        icon={<FaTwitter size={"large"} className="shadow-lg" />}
        tooltip="twitter"
      />
      <SocialMediaButton
        platform="instagram"
        color="var(--color-primary)"
        icon={<FaInstagram size={"large"} className="shadow-lg" />}
        tooltip="instagram"
      />
    </Space>
  );
};

SocialMediaButton.propTypes = {
  platform: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  tooltip: PropTypes.string.isRequired,
};

export default SocialMediaButtons;
