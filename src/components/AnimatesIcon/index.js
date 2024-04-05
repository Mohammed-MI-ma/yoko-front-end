import React from "react";

const AnimatesIcon = ({ icon }) => {
  return (
    <div className="animate__animated animate__tada animate__slower animate__infinite ">
      {icon}
    </div>
  );
};

export default AnimatesIcon;
