import React, { useState } from "react";

const ProgressiveImage = ({ lowQualitySrc, highQualitySrc, alt }) => {
  const [highQualityLoaded, setHighQualityLoaded] = useState(false);

  const handleHighQualityLoad = () => {
    setHighQualityLoaded(true);
  };

  return (
    <img
      style={{ height: "200px" }}
      src={highQualityLoaded ? highQualitySrc : lowQualitySrc}
      onLoad={handleHighQualityLoad}
      alt={alt}
    />
  );
};

export default ProgressiveImage;
