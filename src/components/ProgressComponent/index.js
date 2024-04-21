import { Button, Modal, Progress } from "antd";
import React, { useState, useEffect } from "react";
import CenteredContainer from "../CenteredContainer";
import { useTranslation } from "react-i18next";
import useFontFamily from "../../utils/useFontFamily";

const ProgressComponent = ({ isModalOpen, handleOk, handleCancel }) => {
  const [percentage, setPercentage] = useState(0);
  const { t, i18n } = useTranslation();
  const fontFamilyLight = useFontFamily(i18n.language, "normal");
  let interval;

  useEffect(() => {
    if (isModalOpen) {
      interval = setInterval(() => {
        setPercentage((prevPercentage) => {
          if (prevPercentage < 100) {
            return prevPercentage + 1;
          } else {
            clearInterval(interval);
            handleCancel();
            return prevPercentage;
          }
        });
      }, 60);
    } else {
      setPercentage(0);
    }

    return () => clearInterval(interval);
  }, [isModalOpen, interval]); // Include interval in the dependency array

  const abort = () => {
    clearInterval(interval);
    handleCancel();
  };

  return (
    <Modal
      centered
      footer={null}
      title={null}
      visible={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <CenteredContainer style={{ flexDirection: "column", gap: "2rem" }}>
        <Progress
          type="circle"
          size={200}
          percent={percentage}
          format={() => (
            <div
              style={{
                color: "var(--color-secondary)",
                fontSize: "var(--font-small-size)",
                fontFamily: fontFamilyLight,
              }}
            >
              {t("Message de vérification vous sera envoyé dans 6 secondes")}
            </div>
          )}
          trailColor="rgba(0, 0, 0, 0.06)"
          strokeWidth={2}
          strokeColor={"var(--color-secondary)"}
        />
        <Button style={{ width: "100%" }} onClick={abort}>
          Modifier Commande
        </Button>
      </CenteredContainer>
    </Modal>
  );
};

export default ProgressComponent;
