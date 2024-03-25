import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import FooterListContainer from "./FooterListContainer";

const FootTopNv = () => {
  const language = useSelector((state) => state.application.language);
  const { t } = useTranslation();

  const footerData = [
    {
      data: [t("Legal Notices"), t("Legislative Texts")],
      header: t("LegalInformation"),
    },
    {
      data: [t("AllServices"), t("AllProcedures")],
      header: t("ServicesAndProcedures"),
    },
    {
      data: [t("homePage"), t("AboutOurSite"), t("FAQS")],
      header: t("Logo1"),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {footerData.map((item, index) => (
        <FooterListContainer
          key={index}
          data={item.data}
          language={language}
          header={item.header}
        />
      ))}
    </div>
  );
};

export default FootTopNv;
