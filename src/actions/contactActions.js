// actions/contactActions.js

import axios from "axios";
import {
  setContactInfo,
  setLoading,
  setError,
} from "../reducers/applicationService/contact/contactSlice";

export const fetchContactInfo = () => async (dispatch) => {
  try {
    dispatch(setLoading(true)); // Set loading state to true

    const response = await axios.get(
      `${process.env.REACT_APP_BASE_API_URI_DEV}api/application/contact-application/`
    );
    const contactInfo = response.data;

    dispatch(setContactInfo(contactInfo)); // Set contact information in the store
    dispatch(setLoading(false)); // Set loading state to false
  } catch (error) {
    dispatch(setError(error.message)); // Set error state and loading state to false
    dispatch(setLoading(false));
  }
};
