import { useEffect, useState } from "react";

const useDirection = (language) => {
  const [direction, setDirection] = useState("ltr");

  useEffect(() => {
    if (language === "ar") {
      setDirection("rtl");
    } else {
      setDirection("ltr");
    }
  }, [language]);

  return direction;
};

export default useDirection;
