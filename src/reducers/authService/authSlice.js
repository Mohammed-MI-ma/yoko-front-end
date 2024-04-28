import { createSlice } from "@reduxjs/toolkit";
import { sendOTP, verifyCode } from "./authActions";

const userToken = localStorage.getItem("access_token") || null;
const refreshToken = localStorage.getItem("refreshToken") || null;
const registerData = JSON.parse(localStorage.getItem("registerData")) || null;
const loginData = {};
const userInfo = JSON.parse(localStorage.getItem("userData")) || null;
const annexe = JSON.parse(localStorage.getItem("annexe")) || "0";

const initialState = {
  loading: false,
  userInfo,
  userToken,
  refreshToken, // Add refreshToken field
  registerData,
  loginData,
  error: null,
  success: false,
  forgotPasswordData: {}, // Add this field
  isLoggedIn: Boolean(userToken), // Initialize isLoggedIn based on userToken presence
  annexe,

  //Users
  usersArray: [],

  //OTP
  loadingOTP: false,

  //Preferences
  loadingPreferences: false,
  showModalForMoreDeliveryPerson: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refreshToken"); // Remove refreshToken from storage
      localStorage.removeItem("registerData");
      localStorage.removeItem("userData");
      localStorage.removeItem("is_logged_in");
      localStorage.removeItem("loginData");
      localStorage.removeItem("loginData");
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.refreshToken = null; // Clear refreshToken in state
      state.registerData = null;
      state.error = null;
      state.isLoggedIn = false;
    },
    setForgotPasswordData: (state, { payload }) => {
      state.forgotPasswordData = payload;
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
    setRegisterData: (state, { payload }) => {
      state.registerData = payload;
      localStorage.setItem("registerData", JSON.stringify(payload));
    },
    setLoginData: (state, { payload }) => {
      state.loginData = payload;
      localStorage.setItem("loginData", JSON.stringify(payload));
    },
    setRefreshToken: (state, { payload }) => {
      state.refreshToken = payload;
      localStorage.setItem("refreshToken", payload); // Store refreshToken in localStorage
    },
    resetRegisterData: (state) => {
      state.registerData = {}; // Reset registerData to an empty object
    },
    setIsLoggedIn: (state, { payload }) => {
      state.isLoggedIn = payload;
    },

    setUserToken: (state, { payload }) => {
      state.userToken = payload;
      localStorage.setItem("access_token", payload);
    },
    setUsersArray: (state, { payload }) => {
      state.usersArray = payload;
      localStorage.setItem("usersArray", JSON.stringify(payload));
    },
    updateUserByUsername: (state, { payload }) => {
      const updatedUsersArray = state.usersArray.map((user) => {
        if (user.username === payload.username) {
          // Update the user with the new data from the payload
          return { ...user, ...payload.updatedUser };
        }
        return user;
      });

      state.usersArray = updatedUsersArray;
      localStorage.setItem("usersArray", JSON.stringify(updatedUsersArray));
    },
    // Define your reducer actions here
    setUserLoginPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    setUserLoginFulfilled: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload.user;
      state.userToken = payload.access_token;
      state.refreshToken = payload.refreshToken; // Set refreshToken from the login response
    },
    setUserLoginRejected: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    setRegisterUserPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    setRegisterUserFulfilled: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    setRegisterUserRejected: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOTP.pending, (state) => {
        state.loadingOTP = true;
      })
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.loadingOTP = false;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.loadingOTP = false;
      })
      .addCase(verifyCode.pending, (state) => {
        state.loadingOTP = true;
      })
      .addCase(verifyCode.fulfilled, (state, action) => {
        state.loadingOTP = false;
      })
      .addCase(verifyCode.rejected, (state, action) => {
        state.loadingOTP = false;
      });
  },
});

export const {
  logout,
  updateUserByUsername,
  setUsersArray,
  setUserToken,
  setCredentials,
  setLoginData,
  setForgotPasswordData,
  setIsLoggedIn,
  setRegisterData,
  setRefreshToken,
  resetRegisterData,
  setUserLoginPending,
  setUserLoginFulfilled,
  setUserLoginRejected,
  setRegisterUserFulfilled,
  setRegisterUserRejected,
  loadingPreferences,
} = authSlice.actions;

export default authSlice.reducer;
