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

  //__YOKO_Specialities__CARD
  const [fixedWidth, setFixedWidth] = useState("17.5rem"); // 280px / 16px = 17.5rem
  const [fixedHeight, setFixedHeight] = useState("auto"); // Ne nécessite pas de conversion
  const [fixedBorderRadius, setFixedBorderRadius] = useState("3.563rem"); // 57px / 16px = 3.563rem
  const [fixedGap, setFixedGap] = useState("2rem"); // Ne nécessite pas de conversion
  const [fixedFontSize, setFixedFontSize] = useState("1.125rem"); // Ne nécessite pas de conversion

  //__YOKO_Product__CARD
  const [fixedFontSize_ProductCard, setFixedFontSize_ProductCard] =
    useState("1.125rem"); // Ne nécessite pas de conversion

  //__Product__MONTH__CARD
  const [fixedWidthProductMonth, setFixedWidthProductMonth] =
    useState("30.5rem"); // 280px / 16px = 17.5rem
  const [fixedHeightProductMonth, setFixedHeightProductMonth] =
    useState("399px"); // Ne nécessite pas de conversion

  const [fixedDirectionProductMonth, setFixedDirectionProductMonth] = useState({
    dire: "column",
    alig: "center",
  }); // Ne nécessite pas de conversion

  // TODO:
  //__FOOTER
  //__FOOTER__LOGO

  //**width
  const [fixedWidthLogo, setFixedWidthLogo] = useState("");
  //**gap
  const [fixedGapFooter, setFixedGapFooter] = useState("");
  //**padding
  const [fixedPaddingFooter, setFixedPaddingFooter] = useState("");
  //**fontSize
  const [fixedFontSize_Footer__Header, setFixedFontSize_Footer__Header] =
    useState("var(--font-extra-large-size)");
  //**fontSize__Li
  const [fixedFontSize_Footer__Li, setFixedFontSize_Footer__Li] = useState(
    "var(--font-medium-size)"
  );
  //**alignements
  const [
    fixedFontSize_Footer__alignements,
    setFixedFontSize_Footer__alignements,
  ] = useState("center");

  // FIXME: Implement ComingSoonCard component
  const [fixedFontSizeTitleComingSoon, setFixedFontSizeTitleComingSoon] =
    useState("10vw");
  const [fixedPaddingTitleComingSoon, setFixedPaddingTitleComingSoon] =
    useState("1.25rem");
  const [fixedBorderRadiusComingSoon, setFixedBorderRadiusComingSoon] =
    useState("1.6875rem");

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
      setIsMobile(window.innerWidth <= 388);
      setIsSmallDevice(window.innerWidth > 389 && window.innerWidth <= 575);
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
  // Define fixed width and height based on device size
  // Calculate fixed width and height based on screen size
  // Calculate fixed width and height based on screen size
  useEffect(() => {
    if (isMobile) {
      setFixedWidth("280px");
      setFixedBorderRadius("57px");
      setFixedGap("10rem");
      setFixedFontSize("1.5rem");
      setFixedWidthProductMonth("280px");

      //__FOOTER_MOBILE
      setFixedWidthLogo("60%");
      setFixedGapFooter("0.3125rem");
      setFixedPaddingFooter("2.5rem");

      //
    } else if (isSmallDevice) {
      setFixedWidth("333px");
      setFixedBorderRadius("57px");
      setFixedGap("10rem");
      setFixedFontSize("1.5rem");
      setFixedWidthProductMonth("333px");

      //__FOOTER_SMALL
      setFixedWidthLogo("60%");
      setFixedGapFooter("1rem");
      setFixedPaddingFooter("2.5rem");
    } else if (
      isMediumDevice ||
      isLargeDevice ||
      isExtraLargeDevice ||
      isExtraExtraLargeDevice
    ) {
      setFixedWidth("180px");
      const aspectRatio = 1 / 2; // Width / Height ratio
      setFixedGap("1rem");

      setFixedBorderRadius(Math.floor(parseInt("57px") * aspectRatio));
      setFixedFontSize("1.125rem");
      setFixedFontSize_ProductCard("0.7125rem");
      setFixedWidthProductMonth("300px");

      //__FOOTER__LARGE
      setFixedWidthLogo("80%");
      setFixedGapFooter("1rem");
      setFixedPaddingFooter("0rem");
      setFixedFontSize_Footer__Header("var(--font-small-size)");
      setFixedFontSize_Footer__alignements("left");
      setFixedFontSize_Footer__Li("var(--font-small-size)");

      // TODO: Implement Card component for large screens.
      setFixedFontSizeTitleComingSoon("4rem");
      setFixedPaddingTitleComingSoon("3.125rem");
      setFixedBorderRadiusComingSoon("57px");

      setFixedDirectionProductMonth({
        dire: null,
        alig: null,
      });
    }
  }, [
    isMobile,
    isSmallDevice,
    isMediumDevice,
    isLargeDevice,
    isExtraLargeDevice,
    isExtraExtraLargeDevice,
  ]);

  useEffect(() => {
    const aspectRatio = 309 / 270; // Width / Height ratio

    const calculatedHeight = Math.floor(parseInt(fixedWidth) * aspectRatio);
    const calculatedHeightProductMonth = Math.floor(
      parseInt(fixedWidthProductMonth) * aspectRatio
    );

    setFixedHeight(`${calculatedHeight}px`);
    setFixedHeightProductMonth(`${calculatedHeightProductMonth}px`);
  }, [fixedHeightProductMonth, fixedWidth, fixedWidthProductMonth]);
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
    fixedWidth,
    fixedHeight,
    fixedBorderRadius,
    fixedGap,
    fixedFontSize,
    fixedFontSize_ProductCard,
    fixedHeightProductMonth,
    fixedWidthProductMonth,

    //FOOTER_EXPORTS
    fixedWidthLogo,
    fixedGapFooter,
    fixedPaddingFooter,
    fixedFontSize_Footer__Header,
    fixedFontSize_Footer__Li,
    fixedFontSize_Footer__alignements,
    fixedDirectionProductMonth,
    // TODO: ComingSoon Card.
    fixedFontSizeTitleComingSoon,
    fixedPaddingTitleComingSoon,
    fixedBorderRadiusComingSoon,
  };
};

export default useResponsiveState;
