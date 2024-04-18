import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { useTranslation } from "react-i18next";

import OtpInput from "react-otp-input";

import validator from "validator";

import { Button, ConfigProvider, Input, Modal, Space, message } from "antd";
import useDirection from "../../utils/useDirection";
import CenteredContainer from "../../components/CenteredContainer";
import useFontFamily from "../../utils/useFontFamily";

import {
  setIsLoggedIn,
  setUserLoginFulfilled,
  setUserLoginPending,
  setUserLoginRejected,
} from "../../reducers/authService/authSlice";

import style from "./adminLoginPage.module.css";
import { Bike_low, LogoB } from "../../images";
import { sendOtpAdmin } from "../../reducers/authService/authActions";

const AdminLoginPage = ({ fixedHeight }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const fontFamilylight = useFontFamily(i18n.language, "normal");
  const fontFamilyBold = useFontFamily(i18n.language, "bold");
  const direction = useDirection(i18n.language);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [, setEmailExists] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const closeModal = () => {
    setOtp("");
    setModalOpen(false);
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    setIsValidEmail(validator.isEmail(value));
  };

  //__AXIOS
  const searchEmailInDatabase = async () => {
    try {
      console.log(process.env.REACT_APP_BASE_API_URI_DEV);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API_URI_DEV}api/auth/findUserByEmail`,
        { email, role: "admin" }
      );
      if (response.status === 200) {
        if (response.data.result) {
          setModalOpen(true);
          setEmailExists(true);
          sendOtp();
          message.success(t("userFoundSuccess"));
        }
      } else {
        message.error("Unexpected response status");
        setModalOpen(false);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          message.warning(t("userNotFound"));
          setModalOpen(false);
        } else if (error.response.status === 429) {
          message.error(t("tooManyRequests"));
          setModalOpen(false);
        } else {
          setModalOpen(false);
          message.error(t("serverError", { status: error.response.status }));
        }
      } else if (error.request) {
        message.error(t("serverUnreachable"));
        setModalOpen(false);
      } else {
        message.error("An error occurred", error.request);
        console.log("popo", error);
        setModalOpen(false);
      }
      setEmailExists(false);
    }
  };
  const sendOtp = () => {
    dispatch(sendOtpAdmin({ email, t }));
  };

  useEffect(() => {
    if (otp?.length === 6) {
      dispatch(setUserLoginPending());

      axios
        .post(`${process.env.REACT_APP_BASE_API_URI_DEV}api/auth/verifyCode`, {
          code: otp,
        })
        .then((response) => {
          if (response.status === 200) {
            dispatch(setUserLoginFulfilled(response.data));
            dispatch(setIsLoggedIn(true));
            localStorage.setItem(
              "userData",
              JSON.stringify(response.data.user)
            );
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            setOtp("");
            setModalOpen(false);
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 429) {
              message.error(t("tooManyRequests"));
            } else {
              message.error(t("serverError"));
            }
          } else if (error.request) {
            message.error(t("serverUnreachable"));
          } else {
            message.error("An error occurred", error.request);
            dispatch(setUserLoginRejected(error));
          }
        });
    }
  }, [dispatch, otp, t]);

  return (
    <>
      <section className={`w-full`}>
        <div>
          <div className={style.container}>
            <div style={{ maxWidth: "62.5rem", display: "flex" }}>
              <div className={`flex flex-col`}>
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 w-full flex-grow ${style.grid}`}
                  dir={direction}
                >
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: "#65b44a",
                        borderRadius: 10,
                        fontSize: 10,
                        colorBorder: "#65b44a",
                      },
                      components: {
                        Button: {
                          defaultActiveBorderColor: "var(--color-primary)",
                        },
                      },
                    }}
                  >
                    <CenteredContainer className="text-center gap-2 flex-col">
                      <h1
                        style={{ fontSize: "2rem", fontFamily: fontFamilyBold }}
                      >
                        {t("welcome")} {t("Admin")}
                      </h1>
                      <p
                        style={{
                          fontFamily: fontFamilylight,
                        }}
                      >
                        {t("emailAddress")}
                      </p>
                      <Input
                        value={email}
                        onChange={handleEmailChange}
                        size="large"
                        allowClear
                        dir={direction}
                        placeholder={t("adresse électronique")}
                        style={{
                          fontFamily: fontFamilylight,
                        }}
                      />

                      <Button
                        disabled={!isValidEmail} // Disable the button if email is invalid
                        ghost={!isValidEmail}
                        className="w-full"
                        size="large"
                        style={{
                          background: "var(--color-primary)",
                          fontFamily: fontFamilyBold,
                          color: "white",
                        }}
                        onClick={searchEmailInDatabase} // Call searchEmailInDatabase function on button click
                      >
                        {t("continue")}
                      </Button>

                      <p
                        style={{
                          fontSize: "var(--font-extra-small-size)",
                          fontFamily: fontFamilylight,
                        }}
                      >
                        Authentication en deux étapes: Protégez votre compte
                        avec une double vérification de sécurité.
                      </p>
                    </CenteredContainer>
                  </ConfigProvider>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      className={`flex justify-center relative p-10 items-start flex-col h-40 w-full ${style.rect}`}
                    >
                      <img
                        src={LogoB}
                        style={{ width: " 50% " }}
                        alt={t("logoText")}
                      />
                      <p
                        style={{
                          fontSize: "8px",
                          color: "var(--color-primary)",
                        }}
                      >
                        STAY COMFORTABLE
                      </p>
                      <img
                        width={350}
                        src={Bike_low}
                        className={style.bike}
                        alt={t("bike")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal
        open={modalOpen}
        centered
        footer={null}
        closable
        onCancel={closeModal}
      >
        <Space direction="vertical" size="middle">
          <h1
            style={{
              fontFamily: fontFamilyBold,
              fontWeight: "700",
              fontSize: "2rem",
            }}
          >
            Saisissez le code
          </h1>
          <p>
            Saisissez le code à 6 chiffres que nous avons envoyé à votre adresse
            électronique <b>{email}</b>
          </p>
          <OtpInput
            value={otp}
            inputType="number"
            inputStyle={{
              width: 40,
              height: 40,
              fontFamily: fontFamilyBold,
              fontSize: "2rem",
              border: "2px solid var(--color-primary)",
              borderRadius: "15px",
            }}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>&nbsp;</span>}
            renderInput={(props) => <input {...props} />}
          />
          <CenteredContainer style={{ gap: "1rem", justifyContent: "start" }}>
            <p>Toujours rien? Renvoyer le code dans une minute</p>{" "}
          </CenteredContainer>
        </Space>
      </Modal>
    </>
  );
};

export default AdminLoginPage;
