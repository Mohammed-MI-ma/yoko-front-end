import React, { useEffect, useState } from "react";

const EatCard = ({
  descriptionContent,
  highDefinitionImgUrl,
  backgroundImageUrl,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState(backgroundImageUrl); // Set your initial lightweight image URL here

  useEffect(() => {
    if (!imageLoaded) {
      // Load your high definition image here
      const highDefinitionImageUrl = highDefinitionImgUrl; // Set your high definition image URL here
      const img = new Image();
      img.src = highDefinitionImageUrl;

      // Inside the image onload event handler
      img.onload = () => {
        // Clear any existing timeout
        clearTimeout(timeoutId);

        // Update the state with the high definition image URL
        setImageUrl(highDefinitionImageUrl);
        setImageLoaded(true);
      };

      // Set a timeout to handle slow network conditions
      const timeoutId = setTimeout(() => {
        // Fallback to default image or display placeholder
        setImageUrl(null); // Set your default image URL here
        setImageLoaded(true);
      }, 5000); // Set the timeout duration (in milliseconds) as needed
    }
  }, [imageLoaded, highDefinitionImgUrl]);
  return (
    <div className="flex md:w-full flex-grow justify-center items-center relative">
      <div
        className="w-full"
        style={{
          height: "288px",
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "60px",
        }}
      >
        {descriptionContent}
      </div>
    </div>
  );
};

export default EatCard;
