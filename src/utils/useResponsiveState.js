import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

const useResponsiveState = () => {
  const isMobileInitial = useMediaQuery({ maxWidth: 388 });
  const isSmallDeviceInitial = useMediaQuery({ minWidth: 389, maxWidth: 575 });
  const isMediumDeviceInitial = useMediaQuery({ minWidth: 576, maxWidth: 767 });
  const isLargeDeviceInitial = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isExtraLargeDeviceInitial = useMediaQuery({
    minWidth: 992,
    maxWidth: 1199,
  });
  const isExtraExtraLargeDeviceInitial = useMediaQuery({ minWidth: 1200 });

  const [isMobile, setIsMobile] = useState(isMobileInitial);
  const [isSmallDevice, setIsSmallDevice] = useState(isSmallDeviceInitial);
  const [isMediumDevice, setIsMediumDevice] = useState(isMediumDeviceInitial);
  const [isLargeDevice, setIsLargeDevice] = useState(isLargeDeviceInitial);
  const [isExtraLargeDevice, setIsExtraLargeDevice] = useState(
    isExtraLargeDeviceInitial
  );
  const [isExtraExtraLargeDevice, setIsExtraExtraLargeDevice] = useState(
    isExtraExtraLargeDeviceInitial
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 390);
      setIsSmallDevice(window.innerWidth > 391 && window.innerWidth <= 575);
      setIsMediumDevice(window.innerWidth >= 576 && window.innerWidth <= 767);
      setIsLargeDevice(window.innerWidth >= 768 && window.innerWidth <= 991);
      setIsExtraLargeDevice(
        window.innerWidth >= 992 && window.innerWidth <= 1199
      );
      setIsExtraExtraLargeDevice(window.innerWidth >= 1200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    isMobile,
    isSmallDevice,
    isMediumDevice,
    isLargeDevice,
    isExtraLargeDevice,
    isExtraExtraLargeDevice,
    setIsMobile,
    setIsSmallDevice,
    setIsLargeDevice,
    setIsExtraLargeDevice,
    setIsMediumDevice,
    setIsExtraExtraLargeDevice,
  };
};

export default useResponsiveState;
