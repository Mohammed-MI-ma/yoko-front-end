import { Button, Divider, Input, Radio, Segmented } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useFontFamily from "../../utils/useFontFamily";
import { FaCar, FaMotorcycle, FaTruckPickup } from "react-icons/fa";
import { RiBikeLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import {
  Label,
  TemplateTransaportation,
  transportationOptions,
} from "../../utils/deliveryBoyUtils";

const useSpecificObject = () => {
  const specificObject = useSelector((state) => state.delivery.specificObject);
  return specificObject;
};

const DeliveryBoyDetails = ({ onSave, flag }) => {
  const { t, i18n } = useTranslation();
  const fontFamilyLight = useFontFamily(i18n.language, "normal");
  const loading = useSelector((state) => state.delivery.loadingDeliveryBoy);

  const specificObject = useSpecificObject();
  const [cnie, setCnie] = useState(specificObject?.cnie);
  const [firstName, setFirstName] = useState(specificObject?.firstName);
  const [lastName, setLastName] = useState(specificObject?.lastName);
  const [sex, setSex] = useState(specificObject?.sex);
  const [email, setEmail] = useState(specificObject?.email);
  const [phone, setPhone] = useState(specificObject?.phone);
  const [transport, setTransport] = useState(specificObject?.vehicleType);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setCnie(specificObject?.cnie);
    setFirstName(specificObject?.firstName);
    setLastName(specificObject?.lastName);
    setSex(specificObject?.sex);
    setEmail(specificObject?.email);
    setPhone(specificObject?.phone);
    setTransport(specificObject?.vehicleType);
  }, [specificObject]);

  const options = transportationOptions.map((option) => ({
    label: getTransportation(option.index, t),
    value: option.value,
  }));

  useEffect(() => {
    const isValid = firstName && lastName && email && phone && transport;
    setIsFormValid(isValid);
  }, [cnie, firstName, lastName, email, phone, transport]);

  const handleSave = () => {
    setCnie("");
    setFirstName("");
    setLastName("");
    setSex(1);
    setEmail("");
    setPhone("");
    setTransport("car");
    onSave(
      flag === 1
        ? {
            deliveryBoyData: {
              cnie: cnie,
              firstName: firstName,
              lastName: lastName,
              sex: sex === 1 ? "homme" : "femme",
              email: email,
              phone: phone,
              vehicleType: transport,
            },
          }
        : {
            id: specificObject._id,
            deliveryBoyData: {
              cnie: cnie,
              firstName: firstName,
              lastName: lastName,
              sex: sex === 1 ? "homme" : "femme",
              email: email,
              phone: phone,
              vehicleType: transport,
            },
          }
    );
  };

  return (
    <>
      <Divider style={{ fontFamily: fontFamilyLight, margin: 0 }}>
        1-{t("personnalInfo")}
      </Divider>

      <Label>{t("CNIE")}</Label>
      <Input
        style={{ fontFamily: fontFamilyLight }}
        placeholder={t("n° CNIE")}
        maxLength={10}
        name="cnie"
        value={cnie}
        disabled={flag !== 1}
        onChange={(e) => setCnie(e.target.value)}
      />

      <Label>{t("Nom")}*</Label>
      <Input
        allowClear
        style={{ fontFamily: fontFamilyLight }}
        placeholder={t("Nom")}
        name="nom"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <Label>{t("Prenom")}*</Label>
      <Input
        allowClear
        placeholder={t("Prenom")}
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <Label>{t("Sexe")}*</Label>
      <Radio.Group value={sex} onChange={(e) => setSex(e.target.value)}>
        <Radio value={1}>{t("Homme")}</Radio>
        <Radio value={2}>{t("Femme")}</Radio>
      </Radio.Group>

      <Divider
        style={{
          fontFamily: fontFamilyLight,
          marginTop: "var(--spacing-medium)",
        }}
      >
        2-{t("coordonnées")}
      </Divider>

      <Label>{t("Adresse électronique")}*</Label>
      <Input
        allowClear
        placeholder={t("Adresse électronique")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Label>{t("GSM")}*</Label>
      <Input
        allowClear
        placeholder={t("Numéro de téléphone")}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <Label>{t("chooseTransport")}*</Label>
      <Segmented
        value={transport}
        onChange={(value) => setTransport(value)}
        size="large"
        options={options}
      />

      <Button
        loading={loading}
        onClick={handleSave}
        disabled={!isFormValid}
        className="w-full mt-20"
        style={{
          fontFamily: fontFamilyLight,
          background: "var(--color-secondary)",
          color: "white",
        }}
      >
        {flag !== 1 ? <>Mettre a jour livreur</> : <>Ajouter livreur</>}
      </Button>
    </>
  );
};

export default DeliveryBoyDetails;

const getTransportation = (id, t) => {
  switch (id) {
    case 1:
      return <TemplateTransaportation text={t("car")} icon={<FaCar />} />;
    case 2:
      return <TemplateTransaportation text={t("Vélo")} icon={<RiBikeLine />} />;
    case 3:
      return (
        <TemplateTransaportation text={t("Moto")} icon={<FaMotorcycle />} />
      );
    case 4:
      return (
        <TemplateTransaportation text={t("Pickup")} icon={<FaTruckPickup />} />
      );

    default:
      return "";
  }
};
