import React from "react";
import DrawerGeneric from "../DrawerGeneric";
import DeliveryBoyDetails from "../DeliveryBoyDetails";
import CenteredContainer from "../CenteredContainer";
import { TruckOutlined } from "@ant-design/icons";
import AnimatesIcon from "../AnimatesIcon";
import useFontFamily from "../../utils/useFontFamily";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { addDeliveryBoy } from "../../reducers/applicationService/delivery/deliveryActions";

const DeliveryBoyAddDrawer = ({
  title,
  open,
  onClose,
  closeDrawerFunction,
}) => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const fontFamilyBold = useFontFamily(i18n.language, "bold");

  const onSave = ({ deliveryBoyData }) => {
    // dispatch(searchDeliveryBoyMeiliSearch({ query: "", t }));
    dispatch(addDeliveryBoy({ deliveryBoyData }));
    closeDrawerFunction();
  };

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
        {/* Add form */}
        <DeliveryBoyDetails onSave={onSave} flag={1} />
      </div>
    </DrawerGeneric>
  );
};

export default DeliveryBoyAddDrawer;
