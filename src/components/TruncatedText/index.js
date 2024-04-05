import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Checkbox, Modal } from "antd";
import DrawerGeneric from "../DrawerGeneric";
import useFontFamily from "../../utils/useFontFamily";
import style from "./truncatedText.module.css";
const TruncatedText = ({ text, maxLength, children, title, skip }) => {
  const { t, i18n } = useTranslation();
  const fontFamilyBold = useFontFamily(i18n.language, "bold");

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
  const onChangeCheckBox = () => {};
  return (
    <div>
      <p>{truncatedText}...</p>
      {shouldDisplayButton && (
        <button
          onClick={skip ? () => toggleDrawer(true) : toggleExpanded}
          style={{ fontFamily: fontFamilyBold }}
        >
          {skip ? t("start") : t("Read More")}
        </button>
      )}
      {expanded && (
        <Modal
          visible={expanded}
          footer={null}
          onCancel={toggleExpanded}
          centered
        >
          <section className={`${style.modalContent}`}>
            <p>{text}</p>
            <Checkbox onChange={onChangeCheckBox}>{t("hide")}</Checkbox>
            <Button
              onClick={() => {
                toggleDrawer(true);
              }}
            >
              {t("start")}
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
