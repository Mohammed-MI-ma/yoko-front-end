// useDynamicWidth.js
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setDynamicWidth } from "../reducers/applicationService/applicationSlice";

const useDynamicWidth = () => {
  const dispatch = useDispatch();
  const divRef = useRef(null);

  useEffect(() => {
    const updateWidth = () => {
      if (divRef.current) {
        const width = divRef.current.offsetWidth;
        dispatch(setDynamicWidth(width));
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, [dispatch]);

  return divRef;
};

export default useDynamicWidth;
