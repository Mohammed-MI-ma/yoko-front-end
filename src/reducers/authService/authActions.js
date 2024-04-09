import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { useTranslation } from "react-i18next";

const BASE_URL = "http://localhost:5000/api/auth";

export const sendOTP = createAsyncThunk(
  "auth/sendOTP",
  async ({ email, t }, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/sendOTP`,
        { email },
        config
      );
      if (response.status === 200) {
        message.success(t("otpEmailSentSuccess"));
        return response.data;
      } else {
        message.error(t("unexpectedError"));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 429) {
          message.error(t("tooManyRequests"));
        } else {
          message.error(t("serverError"));
        }
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        message.error(t("serverUnreachable"));
      } else {
        message.error(t("unexpectedError"));
      }
      console.error("An error occurred:", error);
    }
  }
);
export const sendOtpAdmin = createAsyncThunk(
  "auth/sendOTPAdmin",
  async ({ email, t }, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/sendOTPAdmin`,
        { email },
        config
      );
      if (response.status === 200) {
        message.success(t("otpEmailSentSuccessTO admin"));
        return response.data;
      } else {
        message.error(t("unexpectedErrorTO admin"));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 429) {
          message.error(t("tooManyRequests"));
        } else {
          message.error(t("serverError"));
        }
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        message.error(t("serverUnreachable"));
      } else {
        message.error(t("unexpectedError"));
      }
      console.error("An error occurred:", error);
    }
  }
);

export const verifyCode = createAsyncThunk(
  "auth/verifyCode",
  async ({ code, email }, { rejectWithValue }) => {
    const { t } = useTranslation();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/sendOTP`,
        { email },
        config
      );
      if (response.status === 200 && response.data.success) {
        message.success(t("otpEmailSentSuccess"));
      } else {
        // Handle error or display error message if necessary
        message.error(t("unexpectedError"));
      }
    } catch (error) {
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
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        message.error(t("serverUnreachable"));
      } else {
        // Something happened in setting up the request that triggered an error
        message.error(t("unexpectedError"));
      }
      // Log the error for debugging purposes
      console.error("An error occurred:", error);
    }
  }
);
