import { useEffect } from "react";

const useSimulatedWindowResize = () => {
  useEffect(() => {
    const handleWindowResize = () => {
      const timeoutId = setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 3);

      return () => clearTimeout(timeoutId);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
};

export default useSimulatedWindowResize;
