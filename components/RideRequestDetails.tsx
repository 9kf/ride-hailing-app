import { StyleSheet, Text, View } from "react-native";
import React, { forwardRef, useEffect, useState } from "react";
import * as Location from "expo-location";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Button } from "./Button";
import { TRideRequest } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  acceptRideRequest,
  declineRideRequest,
  droppedOffRideRequest,
  pickedUpRideRequest,
  startRideRequest,
} from "@/store/slices/rideRequestSlice";
import { showToast } from "@/store/slices/toastSlice";

type TRideRequestDetailsProps = {
  rideRequest: TRideRequest;
  onClose?: () => void;
  onDeclineRequestCallback?: (refetch?: boolean) => void;
};

const RideRequestDetails = forwardRef<BottomSheet, TRideRequestDetailsProps>(
  ({ rideRequest, onClose, onDeclineRequestCallback }, ref) => {
    const dispatch = useDispatch<AppDispatch>();
    const acceptedRideRequest = useSelector<RootState>(
      (state) => state.rideRequest.acceptedRideRequest
    ) as TRideRequest | undefined;

    const [pickupAddress, setPickupAddress] = useState("");
    const [destinationAddress, setDestinationAddress] = useState("");

    const reverseGeocodeAddresses = async () => {
      try {
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
      } catch (error) {
        dispatch(
          showToast({
            type: "error",
            message:
              "There was a problem retrieving the address of the ride request. Please try again.",
          })
        );
      }
    };

    const handleAcceptRideRequest = () => {
      dispatch(acceptRideRequest(rideRequest));
    };

    const handleDeclineRequest = () => {
      dispatch(declineRideRequest(rideRequest));
      onDeclineRequestCallback?.(rideRequest.status !== "pending");
    };

    const handleStartRideRequest = () => {
      dispatch(startRideRequest());
    };

    const handlePickedUpRideRequest = () => {
      dispatch(pickedUpRideRequest());
    };

    const handleDroppedOffRideRequest = () => {
      dispatch(droppedOffRideRequest());
      onDeclineRequestCallback?.(true);
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
        enablePanDownToClose={!!acceptedRideRequest ? false : true}
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
            {(rideRequest.status === "pending" ||
              rideRequest.status === "accepted") && (
              <>
                {rideRequest.status === "accepted" ? (
                  <Button
                    label="Start"
                    type="success"
                    onPress={handleStartRideRequest}
                  />
                ) : (
                  <Button
                    label="Accept"
                    type="success"
                    onPress={handleAcceptRideRequest}
                  />
                )}
                <Button
                  label="Decline"
                  type="danger"
                  onPress={handleDeclineRequest}
                />
              </>
            )}

            {rideRequest.status === "started" && (
              <Button
                label="Picked up"
                type="warning"
                onPress={handlePickedUpRideRequest}
              />
            )}

            {rideRequest.status === "picked-up" && (
              <Button
                label="Drop off"
                type="success"
                onPress={handleDroppedOffRideRequest}
              />
            )}
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
