import { useEffect, useState, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import axios from "axios";

import { Button, Image, message } from "antd";

import { IoIosAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

import useFontFamily from "../../utils/useFontFamily";

import { updateProductQuantity } from "../../reducers/applicationService/marketPlace/marketPlaceSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [isPending, startTransition] = useTransition();

  const [variantRecovered, setVariantRecovered] = useState({});
  const [quantity, setQuantity] = useState(item?.quantity);

  const user = useSelector((state) => state.auth.userInfo);

  const fontFamilyBold = useFontFamily(i18n.language, "bold");
  const fontFamilyLight = useFontFamily(i18n.language, "normal");

  const handleQuantityChange = (productId, quantity) => {
    dispatch(updateProductQuantity(productId, quantity));
  };

  const handleRemoveFromCart = (productId) => {
    // dispatch(removeFromCart(productId));
  };

  useEffect(() => {
    if (item && item.product && item.product.variants) {
      for (let i = 0; i < item.product.variants.length; i++) {
        if (item.product.variants[i]?._id === item.variant) {
          setVariantRecovered(item.product.variants[i]);
          break;
        }
      }
    }
  }, [item]);

  return (
    <div className="border rounded flex p-5 m-2 bg-white p-10">
      <Image
        width={60}
        src={variantRecovered?.images?.[0]?.response?.downloadURL?.[0]}
      />
      <div className="w-full">
        <div
          style={{
            height: "80%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h1
            style={{
              fontSize: "var(--font-medium-size)",
              fontFamily: fontFamilyLight,
            }}
          >
            {item?.product?.description}
          </h1>
          {!isPending && (
            <div style={{}}>
              <Button
                type="text"
                icon={<FaTrash color="red" />}
                onClick={() => handleRemoveFromCart(item.product._id)}
              />
              <div className="flex items-center">
                <Button
                  icon={<FiMinus />}
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                      updateCart(
                        item?.product._id,
                        variantRecovered._id,
                        quantity - 1,
                        user
                      );

                      startTransition(() =>
                        handleQuantityChange(item?.product._id, quantity)
                      );
                    }
                  }}
                />
                &nbsp;&nbsp; <p>{quantity}</p> &nbsp;&nbsp;
                <Button
                  icon={<IoIosAdd />}
                  onClick={() => {
                    if (quantity <= 50) {
                      setQuantity(quantity + 1);
                      updateCart(
                        item?.product._id,
                        variantRecovered._id,
                        quantity + 1,
                        user
                      );
                      startTransition(() =>
                        handleQuantityChange(item?.product._id, quantity)
                      );
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <footer
          style={{
            fontSize: "var(--font-large-size)",
            fontFamily: fontFamilyBold,
            color: "var(--color-primary)",
          }}
        >
          {variantRecovered?.price} {t("MAD")}
        </footer>
      </div>
    </div>
  );
};

export default CartItem;
const updateCart = async (productId, variantId, quantity, userInfo) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_BASE_API_URI_DEV}api/application/cart/${userInfo?.id}`,
      {
        items: [
          {
            product: productId,
            variant: variantId,
            quantity: quantity,
          },
        ],
      }
    );
    if (response.status === 200) {
      message.success("Mise à jour faite avec succes");
    } else {
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        message.success("Mise à jour echouée");
      } else if (error.response.status === 429) {
        // Handle too many requests
      } else {
        // Handle other server errors
      }
    } else if (error.request) {
      // Handle server unreachable
    } else {
      // Handle other errors
    }
  }
};
