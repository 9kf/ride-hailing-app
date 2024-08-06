import { StyleSheet, Text, View } from "react-native";
import React, { forwardRef, useEffect, useState } from "react";
import * as Location from "expo-location";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Button } from "./Button";
import { TRideRequest } from "@/types";

type TRideRequestDetailsProps = {
  rideRequest: TRideRequest;
  onClose?: () => void;
};

const RideRequestDetails = forwardRef<BottomSheet, TRideRequestDetailsProps>(
  ({ rideRequest, onClose }, ref) => {
    const [pickupAddress, setPickupAddress] = useState("");
    const [destinationAddress, setDestinationAddress] = useState("");

    const reverseGeocodeAddresses = async () => {
      const pickupAddressObj = await Location.reverseGeocodeAsync({
        latitude: rideRequest.pickupLocation.latitude,
        longitude: rideRequest.pickupLocation.longitude,
      });

      const destinationAddressObj = await Location.reverseGeocodeAsync({
        latitude: rideRequest.destination.latitude,
        longitude: rideRequest.destination.longitude,
      });

      setPickupAddress(
        pickupAddressObj[0].formattedAddress
          ?.split(",")
          .splice(0, 2)
          .join(", ") || ""
      );
      setDestinationAddress(
        destinationAddressObj[0].formattedAddress
          ?.split(",")
          .splice(0, 2)
          .join(", ") || ""
      );
    };

    useEffect(() => {
      reverseGeocodeAddresses();
    }, []);

    return (
      <BottomSheet
        ref={ref}
        snapPoints={["45%"]}
        handleIndicatorStyle={{ display: "none" }}
        onClose={() => onClose?.()}
        enablePanDownToClose={true}
      >
        <BottomSheetView style={styles.container}>
          <View style={styles.userContainer}>
            <FontAwesome name="user-circle" size={60} color="gray" />
            <View>
              <Text style={styles.userName}>{rideRequest.user.name}</Text>
              <Text style={styles.userEmail}>{rideRequest.user.email}</Text>
            </View>
          </View>

          <View style={styles.additionalInfoContainer}>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>{`Pickup at: `}</Text>
              <Text style={styles.value}>{pickupAddress}</Text>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.label}>{`Drop off at: `}</Text>
              <Text style={styles.value}>{destinationAddress}</Text>
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <Button label="Accept" type="success" />
            <Button label="Decline" type="danger" />
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  userName: { fontSize: 24, fontWeight: "bold" },
  userEmail: { fontSize: 12, fontWeight: "500", color: "gray" },
  additionalInfoContainer: { marginBottom: 24 },
  infoContainer: { flexDirection: "row" },
  label: { fontSize: 16 },
  value: {
    fontSize: 16,
    textDecorationLine: "underline",
    fontWeight: "600",
    flexWrap: "wrap",
  },
  buttonsContainer: { gap: 8 },
});

export { RideRequestDetails };
