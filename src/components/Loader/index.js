import { Spin } from "antd";
import React from "react";

const Loader = ({ isLoading }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        color: "var(--color-theme)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin size="large" spinning={isLoading} />
    </div>
  );
};

export default Loader;
