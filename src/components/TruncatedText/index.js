import React, { useState } from "react";

import { useTranslation } from "react-i18next";

import { Button, Checkbox, Modal } from "antd";

import DrawerGeneric from "../DrawerGeneric";
import useFontFamily from "../../utils/useFontFamily";
import useDirection from "../../utils/useDirection";

import style from "./truncatedText.module.css";

const TruncatedText = ({
  text,
  maxLength,
  children,
  title,
  skip,
  onChangeCheckBoxHandler,
}) => {
  const { t, i18n } = useTranslation();
  const fontFamilyBold = useFontFamily(i18n.language, "bold");
  const fontFamilyLight = useFontFamily(i18n.language, "normal");
  const direction = useDirection(i18n.language);

  const [expanded, setExpanded] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  const toggleDrawer = (e) => {
    setExpanded(false);
    setIsOpenDrawer(e);
  };

  const truncatedText = text.slice(0, maxLength);
  const shouldDisplayButton = text.length > maxLength;
  const onChangeCheckBox = (e) => onChangeCheckBoxHandler(e.target.checked);
  return (
    <div>
      <p
        style={{
          fontFamily: fontFamilyLight,
          fontSize: "var(--font-extra-small-size)",
        }}
      >
        {truncatedText}...
      </p>
      {shouldDisplayButton && (
        <button
          onClick={skip ? () => toggleDrawer(true) : toggleExpanded}
          style={{ fontFamily: fontFamilyBold }}
        >
          <u>{skip ? t("start") : t("Read More")}</u>
        </button>
      )}
      {expanded && (
        <Modal
          visible={expanded}
          footer={null}
          onCancel={toggleExpanded}
          centered
          title={<br></br>}
        >
          <section
            className={`${style.modalContent}`}
            style={{ direction: direction }}
          >
            <p style={{ fontFamily: fontFamilyLight }}>{text}</p>
            <Checkbox onChange={onChangeCheckBox}>
              <p style={{ fontFamily: fontFamilyLight }}>{t("hide")}</p>
            </Checkbox>
            <Button
              style={{ fontFamily: fontFamilyLight }}
              onClick={() => {
                toggleDrawer(true);
              }}
            >
              <p style={{ fontFamily: fontFamilyLight }}>{t("start")}</p>
            </Button>
          </section>
        </Modal>
      )}
      {/** Generic drawer*/}
      <DrawerGeneric
        titre={title}
        open={isOpenDrawer}
        onClose={() => toggleDrawer(false)}
      >
        {children}
      </DrawerGeneric>
    </div>
  );
};

export default TruncatedText;
