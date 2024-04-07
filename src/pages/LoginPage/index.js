import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import { useTranslation } from "react-i18next";

import OtpInput from "react-otp-input";

import validator from "validator";

import {
  Button,
  ConfigProvider,
  Divider,
  Input,
  Modal,
  Space,
  message,
} from "antd";
import useDirection from "../../utils/useDirection";
import CenteredContainer from "../../components/CenteredContainer";
import useFontFamily from "../../utils/useFontFamily";

import { FaGoogle, FaFacebookF } from "react-icons/fa6";

import {
  setIsLoggedIn,
  setUserLoginFulfilled,
  setUserLoginPending,
  setUserLoginRejected,
} from "../../reducers/authService/authSlice";

import style from "./loginPage.module.css";
import { Bike_low, LogoB } from "../../images";
import ButtonWithStyles from "../../components/ButtonWithStyles";
import { sendOTP } from "../../reducers/authService/authActions";

const LoginPage = ({ fixedHeight, language }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const fontFamilylight = useFontFamily(i18n.language, "normal");
  const fontFamilyBold = useFontFamily(i18n.language, "bold");
  const direction = useDirection(i18n.language);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dynamicWidth = useSelector((state) => state.application.dynamicWidth);
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

  //__STYLING
  const containerStyles = {
    backgroundPosition: "top",
    backgroundSize: "cover",
    borderBottom: "0px",
    width: dynamicWidth,
    height: fixedHeight || "auto",
    position: "relative",
    backgroundColor: "white",
    minHeight: "75vh",
    margin: "0 auto",
  };

  //__AXIOS
  const searchEmailInDatabase = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/findUserByEmail`,
        { email, role: "user" }
      );
      if (response.status === 200) {
        // Check if the user was found in the database
        if (response.data.result) {
          // User found
          setEmailExists(true);

          message.success(t("userFoundSuccess"));
        }
      } else {
        // Handle unexpected response status
        message.error("Unexpected response status");
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        if (error.response.status === 404) {
          // User not found
          message.warning(t("userNotFound"));
          sendOtp();
          setModalOpen(true);
        } else if (error.response.status === 429) {
          // Too many requests
          message.error(t("tooManyRequests"));
        } else {
          // Other server error
          message.error(t("serverError", { status: error.response.status }));
        }
      } else if (error.request) {
        // The request was made but no response was received
        message.error(t("serverUnreachable"));
      } else {
        // Something happened in setting up the request that triggered an error
        message.error("An error occurred", error.request);
      }
      setEmailExists(false);
    }
  };
  const sendOtp = () => {
    dispatch(sendOTP({ email, t }));
  };

  useEffect(() => {
    if (otp.length === 4) {
      // Trigger the verification Axios request
      // Replace this with your actual verification logic
      dispatch(setUserLoginPending());

      axios
        .post("http://localhost:5000/api/auth/verifyCode", {
          code: otp,
        })
        .then((response) => {
          if (response.status === 200) {
            // Store tokens in local storage
            dispatch(setUserLoginFulfilled(response.data));
            dispatch(setIsLoggedIn(true));

            // Store tokens in local storage
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
            message.success("created user suuccc");
            setOtp("");
            setModalOpen(false);
          }
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            if (error.response.status === 429) {
              // Too many requests
              message.error(t("tooManyRequests"));

              /*  setDeadline(
                error.response.data.timeRemaining + 1000 * 30 + Date.now()
              );*/
            } else {
              // Other server error
              message.error(t("serverError"));
            }
          } else if (error.request) {
            // The request was made but no response was received
            message.error(t("serverUnreachable"));
          } else {
            // Something happened in setting up the request that triggered an error
            message.error("An error occurred", error.request);
            // Dispatch the setUserLoginRejected action to handle the error
            dispatch(setUserLoginRejected(error));
          }
        });
    }
  }, [dispatch, otp]);

  return (
    <div
      className={`flex flex-col ${style.containerExtend}`}
      style={containerStyles}
    >
      <div
        className={`grid grid-cols-1 md:grid-cols-2 w-full flex-grow ${style.gridExtend}`}
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
            <h1 style={{ fontSize: "2rem", fontFamily: fontFamilyBold }}>
              {t("welcome")}
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
            <Divider
              style={{ fontFamily: fontFamilylight, fontSize: "0.75rem" }}
            >
              {t("orWith")}
            </Divider>
            <ButtonWithStyles
              icon={<FaGoogle />}
              style={{ fontFamily: fontFamilylight, fontWeight: "700" }}
            >
              {t("signInWithGoogle")}
            </ButtonWithStyles>
            <ButtonWithStyles
              icon={<FaFacebookF />}
              style={{ fontFamily: fontFamilylight, fontWeight: "700" }}
            >
              {t("signInWithFacebook")}
            </ButtonWithStyles>
            <p
              style={{
                fontSize: "var(--font-extra-small-size)",
                fontFamily: fontFamilylight,
              }}
            >
              {t("termsAndPrivacy")}
              <Link to={`/yoko/account/log-in-admin`}> {t("AdminPanel")}</Link>
            </p>
          </CenteredContainer>
        </ConfigProvider>

        <CenteredContainer>
          <div
            id="rect"
            className="flex justify-center p-10 items-start flex-col h-40 w-full relative"
            style={{
              background: "var(--color-secondary)",
              borderRadius: "1.875rem",
              gap: "var(--spacing-small)",
            }}
          >
            <img src={LogoB} style={{ width: " 50% " }} alt={t("logoText")} />
            <p style={{ fontSize: "8px", color: "var(--color-primary)" }}>
              STAY COMFORTABLE
            </p>
            <img
              width={350}
              src={Bike_low}
              style={{
                position: "absolute",
                top: 0,
                transform: "translate(15%,-30%)",
                objectFit:
                  "contain" /* or object-fit: cover; depending on your needs */,
              }}
              alt={t("logoText")}
            />
          </div>
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
                Saisissez le code à 4 chiffres que nous avons envoyé à votre
                adresse électronique <b>{email}</b>
              </p>
              <OtpInput
                value={otp}
                inputType="number"
                inputStyle={{
                  width: 62,
                  height: 62,
                  fontFamily: fontFamilyBold,
                  fontSize: "2rem",
                  border: "2px solid var(--color-primary)",
                  borderRadius: "15px",
                }}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span>&nbsp;</span>}
                renderInput={(props) => <input {...props} />}
              />
              <CenteredContainer
                style={{ gap: "1rem", justifyContent: "start" }}
              >
                <p>Toujours rien? Renvoyer le code dans une minute</p>{" "}
                {/* <Countdown value={deadline} format="mm:ss" />*/}
              </CenteredContainer>
            </Space>
          </Modal>
        </CenteredContainer>
      </div>
    </div>
  );
};

export default LoginPage;
