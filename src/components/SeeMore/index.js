import { Button } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

const SeeMore = ({ font }) => {
  const { t } = useTranslation();
  return (
    <Button
      type="Link"
      className="text-white px-10 py-3 text-xl rounded-full mt-10 h-auto w-fit-content border-none"
      style={{
        fontFamily: font,
        fontSize: "var(--font-large-size)",
      }}
    >
      {t("seeMore")}
    </Button>
  );
};

export default SeeMore;
