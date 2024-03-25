import { Button } from "antd";
import React from "react";

const ActionButton = ({ font, action, children }) => {
  return (
    <Button
      onClick={action}
      className={`
  text-white
  px-20
  py-3
  text-xl
  rounded-full
  border-none
  h-auto
  w-fit-content
  z-100000
  bg-cover
  flex
  flex-col-reverse
  lg:flex-row
  items-center
  shadow-lg     
`}
      style={{
        background: "var(--color-primary)",
        fontFamily: font,
        fontSize: "var(--font-large-size)",
      }}
    >
      {children}
    </Button>
  );
};

export default ActionButton;
