import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { auth, provider } from "../../firebase";

import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";

import axios from "axios";

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
import { FaGoogle } from "react-icons/fa6";

import {
  setIsLoggedIn,
  setUserLoginFulfilled,
  setUserLoginPending,
  setUserLoginRejected,
} from "../../reducers/authService/authSlice";

import { Bike_low, LogoB } from "../../images";

import ButtonWithStyles from "../../components/ButtonWithStyles";

import { sendOTP } from "../../reducers/authService/authActions";

import style from "./loginPage.module.css";

const LoginPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //__states
  const [email, setEmail] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [otp, setOtp] = useState("");

  //__isLoggedIn
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  //__fonts
  const fontFamilylight = useFontFamily(i18n.language, "normal");
  const fontFamilyBold = useFontFamily(i18n.language, "bold");

  //__direction
  const direction = useDirection(i18n.language);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  //__functions

  //__1__InputEmail
  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    setIsValidEmail(validator.isEmail(value));
  };

  //__2__modalOTP
  const closeModal = () => {
    setOtp("");
    setModalOpen(false);
  };

  //__3__sendOTP2Mail
  const sendOtp = () => {
    dispatch(sendOTP({ email, t }));
  };
  //__4__isEmailExists
  const isEmailExists = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API_URI_DEV}api/auth/findUserByEmail`,
        { email: email, role: "user" }
      );

      if (response.status === 200) {
        if (response.data.result) {
          //If the user is connected
          sendOtp();
          setModalOpen(true);
        }
      } else {
        message.error(t("Unexpected response status"));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          message.warning(t("userNotFound"));
          sendOtp();
          setModalOpen(true);
        } else if (error.response.status === 429) {
          //__to_Many_Requests
          message.error(t("tooManyRequests"));
        } else {
          //__serverError
          message.error(t("serverError", { status: error.response.status }));
        }
      } else if (error.request) {
        // The request was made but no response was received
        message.error(t("serverUnreachable"));
      } else {
        // Something happened in setting up the request that triggered an error
        message.error("An error occurred", error.request);
      }
    }
  };
  //__5__search if exists
  const simpleSearchEmailInDatabase = async (myEmail) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API_URI_DEV}api/auth/findUserByEmail`,
        { email: myEmail, role: "user" }
      );

      if (response.status === 200) {
        if (
          response.data.result &&
          response.data.user?.provider === "internal"
        ) {
          message.error(t("sorry already existed with inertnal"));
          return { response: false, status: 352 };
        } else if (
          response.data.result &&
          response.data.user?.provider === "firebase"
        ) {
          message.success(t("user already regitred"));
          return { response: true, status: 353 };
        }
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          //__user_not_found means first time registred
          message.success(t("Welcome to YOKO"));
          return { response: true, status: 200 };
        } else if (error.response.status === 429) {
          //__too_many_request
          message.error(t("tooManyRequests"));
          return { response: false, status: 429 };
        } else {
          // Other server error
          message.error(t("serverError", { status: error.response.status }));
          return { response: false, status: 500 };
        }
      } else if (error.request) {
        //__request_was_made_but_no_response_was_received
        message.error(t("serverUnreachable"));
        return { response: false, status: 500 };
      } else {
        //__something_happened_in_setting_up_the_request_that_triggered_an_error
        message.error("An error occurred", error.request);
        return { response: false, status: 500 };
      }
    }
  };
  const revokeRefreshToken = async (accessToken) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API_URI_DEV}api/auth/revokeRefreshTokens`,
        { accessToken: accessToken }
      );
      if (response.status === 200) {
        if (response.data.result) {
          message.success(t("sorry alreadt existed"));
          return true;
        }
      } else {
        return false;
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          return false;
        } else if (error.response.status === 429) {
          // Too many requests
          message.error(t("tooManyRequests"));
          return false;
        } else {
          // Other server error
          message.error(t("serverError", { status: error.response.status }));
          return false;
        }
      } else if (error.request) {
        // The request was made but no response was received
        message.error(t("serverUnreachable"));
        return false;
      } else {
        // Something happened in setting up the request that triggered an error
        message.error("An error occurred", error.request);
        return false;
      }
    }
  };

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then(async (result) => {
        const user = result.user;
        const retrievedEmail = user?.email;

        try {
          const { response, status } = await simpleSearchEmailInDatabase(
            retrievedEmail
          );
          const idToken = await user.getIdToken();

          if (!response && status === 352) {
            //__Bloqued_the_new_user_loggedIn_using_the_provider
            await revokeRefreshToken(idToken);
          } else if (response && status === 353) {
            const resss = await axios.post(
              `${process.env.REACT_APP_BASE_API_URI_DEV}api/auth/findUserByEmail`,
              { email: user.email, role: "user" }
            );
            const cart = await axios.get(
              `${process.env.REACT_APP_BASE_API_URI_DEV}api/application/cart/${resss?.data?.user?._id}`
            );
            dispatch(
              setUserLoginFulfilled({
                user: {
                  ...resss?.data?.user,
                  id: resss?.data?.user?._id,
                  cart: cart?.data?.cart,
                },
                access_token: idToken,
                refreshToken: "sdqsdqsd",
              })
            );
            dispatch(setIsLoggedIn(true));
            localStorage.setItem("userData", JSON.stringify(resss?.data?.user));
            localStorage.setItem("access_token", idToken);
            localStorage.setItem("refreshToken", "qsdqsd");
            message.success("connected succes ");
          } else if (response && status === 200) {
            //add the user to the databse insert it and return a serialized user
            const resss = await axios.post(
              `${process.env.REACT_APP_BASE_API_URI_DEV}api/auth/addUser`,
              { user: user }
            );
            dispatch(
              setUserLoginFulfilled({
                user: resss?.data?.user,
                access_token: idToken,
                refreshToken: "sdqsdqsd",
              })
            );

            dispatch(setIsLoggedIn(true));
            localStorage.setItem("userData", JSON.stringify(resss?.data?.user));
            localStorage.setItem("access_token", idToken);
            localStorage.setItem("refreshToken", "qsdqsd");
            message.success("created user suuccc ");
          }
        } catch (error) {
          console.error("Error searching email in database:", error);
        }
        try {
          const idToken = await user.getIdToken();
          console.log("ID Token:", idToken);
          // Use the ID token as needed
        } catch (error) {
          console.error("Error getting ID token:", error);
        }
      })
      .catch((error) => {
        // Handle sign-in errors
        console.error("Sign-in error:", error);
      });
  };

  useEffect(() => {
    if (otp.length === 4) {
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
            message.success("created user suuccc");
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
            <div
              style={{ maxWidth: "62.5rem" }}
              className={`bg-cover h-full relative w-full `}
            >
              <div className={`flex flex-col ${style.containerExtend}`}>
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
                        dir={direction}
                        placeholder={t("adresse électronique")}
                        style={{
                          fontFamily: fontFamilylight,
                        }}
                      />
                      <Button
                        disabled={!isValidEmail}
                        ghost={!isValidEmail}
                        className="w-full"
                        size="large"
                        style={{
                          background: "var(--color-primary)",
                          fontFamily: fontFamilyBold,
                          color: "white",
                        }}
                        onClick={isEmailExists} // Call searchEmailInDatabase function on button click
                      >
                        {t("continue")}
                      </Button>
                      <Divider
                        style={{
                          fontFamily: fontFamilylight,
                          fontSize: "0.75rem",
                        }}
                      >
                        {t("orWith")}
                      </Divider>
                      <ButtonWithStyles
                        onClickHandler={() => signInWithGoogle()}
                        icon={<FaGoogle />}
                        style={{
                          fontFamily: fontFamilylight,
                          fontWeight: "700",
                        }}
                      >
                        {t("signInWithGoogle")}
                      </ButtonWithStyles>

                      <p
                        style={{
                          fontSize: "var(--font-extra-small-size)",
                          fontFamily: fontFamilylight,
                        }}
                      >
                        {t("termsAndPrivacy")}
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
      {/**Modal OTP LOGIN 4 DIGIT */}
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
            Saisissez le code à 4 chiffres que nous avons envoyé à votre adresse
            électronique <b>{email}</b>
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
          <CenteredContainer style={{ gap: "1rem", justifyContent: "start" }}>
            <p>Toujours rien? Renvoyer le code dans une minute</p>{" "}
            {/* <Countdown value={deadline} format="mm:ss" />*/}
          </CenteredContainer>
        </Space>
      </Modal>
    </>
  );
};

export default LoginPage;
