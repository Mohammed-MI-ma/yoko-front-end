import React from "react";
import DrawerGeneric from "../DrawerGeneric";
import DeliveryBoyDetails from "../DeliveryBoyDetails";
import CenteredContainer from "../CenteredContainer";
import { TruckOutlined } from "@ant-design/icons";
import AnimatesIcon from "../../components/AnimatesIcon";
import useFontFamily from "../../utils/useFontFamily";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { updateDeliveryBoy } from "../../reducers/applicationService/delivery/deliveryActions";

const DeliveryBoyEditionDrawer = ({ title, open, onClose }) => {
  const dispatch = useDispatch();

  const onSave = ({ id, deliveryBoyData }) => {
    dispatch(updateDeliveryBoy({ id, deliveryBoyData }));
  };

  const { i18n } = useTranslation();

  const fontFamilyBold = useFontFamily(i18n.language, "bold");

  return (
    <DrawerGeneric
      onClose={onClose}
      titre={
        <CenteredContainer
          style={{
            justifyContent: "left",
            gap: "1rem",
            textTransform: "uppercase",
          }}
        >
          <AnimatesIcon icon={<TruckOutlined />} />
          <h1 style={{ fontFamily: fontFamilyBold }}>{title}</h1>
        </CenteredContainer>
      }
      open={open}
    >
      <div
        className={
          "flex-col w-full gap-10 overflow-auto justify-start bordered shadow-md p-5 "
        }
        style={{
          borderRadius: "var(--border-radius-large)",
        }}
      >
        <DeliveryBoyDetails onSave={onSave} />
      </div>
    </DrawerGeneric>
  );
};

export default DeliveryBoyEditionDrawer;
