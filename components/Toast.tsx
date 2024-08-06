import {
  hideToast,
  TOAST_HIDE_DELAY,
  TToastSlice,
} from "@/store/slices/toastSlice";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const Toast = () => {
  const {
    type: toastType,
    isVisible,
    message,
  } = useSelector<RootState>((state) => state.toast) as TToastSlice;
  const dispatch = useDispatch<AppDispatch>();

  const backgroundColor = useMemo(() => {
    if (toastType === "success") {
      return "green";
    }
    if (toastType === "error") {
      return "orange";
    }

    return "red";
  }, [toastType]);

  useEffect(() => {
    if (!isVisible) return;

    setTimeout(() => {
      dispatch(hideToast());
    }, TOAST_HIDE_DELAY);
  }, [isVisible]);

  return (
    <View style={{ ...styles.container, backgroundColor }}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 48,
    right: 32,
    left: 32,
    padding: 12,
    borderRadius: 12,
  },
  message: {
    fontSize: 16,
    color: "white",
  },
});

export { Toast };
