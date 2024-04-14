import React from "react";
import DrawerGeneric from "../DrawerGeneric";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartDrawer = ({ openCart, onCloseCart, t }) => {
  const navigate = useNavigate();

  const d = useDispatch();

  return (
    <DrawerGeneric
      open={openCart}
      onClose={onCloseCart}
      titre={t("mon panier")}
    >
      My cart
    </DrawerGeneric>
  );
};

export default CartDrawer;
