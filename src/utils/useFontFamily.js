import { useEffect, useState } from "react";

const useFontFamily = (language, fontWeight = "normal") => {
  const [fontFamily, setFontFamily] = useState("");

  useEffect(() => {
    let selectedFontFamily = "";

    // Determine font family based on the language and font weight
    switch (language + "-" + fontWeight) {
      case "ar-normal":
        selectedFontFamily = "Primary-Regular-ar";
        break;
      case "ar-bold":
        selectedFontFamily = "Primary-Bold-ar";
        break;
      case "fr-normal":
        selectedFontFamily = "Primary-Regular-fr";
        break;
      case "fr-bold":
        selectedFontFamily = "Primary-Bold-fr";
        break;
      // Add more cases for other languages and font weights as needed
      default:
        selectedFontFamily = "Primary-Bold-fr";
    }

    setFontFamily(selectedFontFamily);
  }, [fontWeight, language]);

  return fontFamily;
};

export default useFontFamily;
