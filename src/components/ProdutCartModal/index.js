import { Button, Modal, Tabs, message } from "antd";
import React, { useState } from "react";
import CenteredContainer from "../CenteredContainer";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import useFontFamily from "../../utils/useFontFamily";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../reducers/applicationService/marketPlace/marketPlaceSlice";
const ProdutCartModal = ({ isModalOpen, handleCancel, product }) => {
  const [counters, setCounters] = useState(
    Array(product?.variants?.length).fill(1)
  ); // Array of counters, initialized with 1 for each variant
  const { i18n } = useTranslation();
  const fontFamilyBold = useFontFamily(i18n.language, "bold");
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const handleCounterChange = (index, value) => {
    const newCounters = [...counters];
    newCounters[index] = value;
    setCounters(newCounters);
  };

  const addToCart = async (productId, variantId, quantity) => {
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
      console.log("rrrrrrrrrrrr", response.status);
      if (response.status === 200) {
        message.success("Ajouté avec success");
        retreiveCart(userInfo?.id);
      } else {
        // Handle unexpected response status
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          message.success("Produit non  ajouté au panier");
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
  const retreiveCart = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URI_DEV}api/application/cart/${userInfo?.id}`
      );
      if (response.status === 200) {
        message.success("Pnier retrouvé avec success");
        dispatch(setCart(response?.data?.items));
      } else {
        // Handle unexpected response status
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          message.success("Produit non  ajouté au panier");
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
  const items = product?.variants?.map((item, index) => ({
    key: index,
    label: item?.attributes?.capacity,
    children: (
      <CenteredContainer style={{ flexDirection: "column" }}>
        <div>
          <img
            src={item?.images[0]?.response?.downloadURL}
            width={"150px"}
            alt=""
          />
        </div>
        <p>{product?.description}</p>
        <div className="flex justify-center items-center gap-10">
          <Button
            className="flex justify-center items-center"
            disabled={counters[index] === 0}
            shape="circle"
            onClick={() => handleCounterChange(index, counters[index] - 1)}
          >
            <FaMinus />
          </Button>
          <h1 style={{ fontFamily: fontFamilyBold }}>{counters[index]}</h1>
          <Button
            disabled={counters[index] === 50}
            className="flex justify-center items-center"
            shape="circle"
            onClick={() => handleCounterChange(index, counters[index] + 1)}
          >
            <FaPlus />
          </Button>
        </div>
        <br />
        <Button
          style={{
            width: "396px",
            background: "var(--color-primary)",
            color: "white",
            fontFamily: fontFamilyBold,
            border: "none",
          }}
          onClick={() => {
            addToCart(product?._id, item?._id, counters[index]);
          }}
        >
          Ajouter au panier
        </Button>
      </CenteredContainer>
    ),
  }));

  return (
    <Modal
      title={null}
      open={isModalOpen}
      footer={null}
      onCancel={handleCancel}
      style={{ width: "561px" }}
    >
      <Tabs defaultActiveKey="1" items={items} />
    </Modal>
  );
};

export default ProdutCartModal;
