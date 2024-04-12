import React from "react";
import CenteredContainer from "../CenteredContainer";
const CardProduct = ({ key, product }) => {
  return (
    <div
      key={key}
      style={{
        margin: "1rem",
        height: "20.4375rem", // Converted from 327px to rem (327 / 16)
        width: "15rem", // Converted from 236px to rem (236 / 16)
        borderRadius: "1.875rem", // Converted from 30px to rem (30 / 16)
        border: "0.125rem solid #D9D9D9", // Converted from 2px to rem (2 / 16)
        display: "flex", // Use flexbox
        flexDirection: "column", // Stack children vertically
      }}
    >
      <CenteredContainer style={{ height: "200px", color: "black" }}>
        <img src={product?.thumbnail} width={"80%"} alt={product?.alt} />
      </CenteredContainer>
      <footer style={{ flexGrow: 1, color: "black" }}>
        <div>{product?.description}</div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div>10 MAD</div>
          <div>
            <p>qsdqs</p>
            <p>rrr</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CardProduct;
