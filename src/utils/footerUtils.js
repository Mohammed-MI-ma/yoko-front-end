export const getHeader = (id, t) => {
  switch (id) {
    case 2:
      return t("contact us");
    case 3:
      return t("Discover our yoko");
    case 4:
      return t("follow us");
    default:
      return "";
  }
};
