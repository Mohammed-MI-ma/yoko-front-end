// imageUtils.js
import {
  Delivery_low,
  Tagine_low,
  YOKOMarket_low,
  YokoEat_low,
} from "../images";

export const getImageLowQualitySrc = (id) => {
  switch (id) {
    case 3:
      return YokoEat_low;
    case 2:
      return YOKOMarket_low;
    case 1:
      return Delivery_low;
    case 4:
      return Tagine_low;
    default:
      return "";
  }
};

export const getImageHighQualitySrc = (id) => {
  switch (id) {
    case 3:
      return "https://raw.githubusercontent.com/Mohammed-MI-ma/assets-YOKO/main/YokoEat.jpg";
    case 2:
      return "https://raw.githubusercontent.com/Mohammed-MI-ma/assets-YOKO/main/YOKOMarket.jpg";
    case 1:
      return "https://raw.githubusercontent.com/Mohammed-MI-ma/assets-YOKO/main/Delivery.jpg";
    case 4:
      return "https://raw.githubusercontent.com/Mohammed-MI-ma/assets-YOKO/main/Le-tajine.jpg";
    default:
      return "";
  }
};
export const getImageAlt = (id) => {
  switch (id) {
    case 1:
      return "YOKO livraison";

    case 2:
      return "YOKO Marché";

    case 3:
      return "YOKO Mangez";

    case 4:
      return "YOKO Traditional";
    default:
      return "";
  }
};
export const getAction = (id) => {
  switch (id) {
    case 1:
      return "web/guest/delivery";
    case 2:
      return "web/guest/market";
    case 3:
      return "web/guest/eat";
    case 4:
      return "web/guest/traditional";
    default:
      return "";
  }
};
