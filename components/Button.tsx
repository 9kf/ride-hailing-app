import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

type TButtonProps = {
  label: string;
  type?: "success" | "danger" | "warning";
  onPress?: () => void;
};

const Button = ({ label, type = "success", onPress }: TButtonProps) => {
  const buttonColor =
    type === "success" ? "green" : type === "danger" ? "red" : "orange";

  return (
    <TouchableOpacity
      onPress={() => onPress?.()}
      style={{
        ...styles.buttonContainer,
        backgroundColor: buttonColor,
      }}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  label: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export { Button };
