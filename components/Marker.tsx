import { FontAwesome } from "@expo/vector-icons";
import { MarkerView } from "@rnmapbox/maps";
import { LocationObject } from "expo-location";
import { TouchableOpacity } from "react-native";

import { TRideRequest } from "@/types";
import { isCoordinateWithinDistance } from "@/utils";

type TRideRequestMarkerProps = {
  rideRequest: TRideRequest;
  currentLocation?: LocationObject;
  isSelected?: boolean;
  onPress?: (rideRequest: TRideRequest) => void;
};

export const RideRequestMarker = ({
  rideRequest,
  currentLocation,
  isSelected,
  onPress,
}: TRideRequestMarkerProps) => {
  const isNearby = currentLocation
    ? isCoordinateWithinDistance(
        {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        },
        {
          latitude: rideRequest.pickupLocation.latitude,
          longitude: rideRequest.pickupLocation.longitude,
        }
      )
    : false;

  return (
    <>
      <MarkerView
        coordinate={[
          rideRequest.pickupLocation.longitude,
          rideRequest.pickupLocation.latitude,
        ]}
        allowOverlapWithPuck={true}
      >
        <TouchableOpacity
          onPress={() => {
            onPress?.(rideRequest);
          }}
        >
          <FontAwesome
            name="map-marker"
            size={32}
            color={isNearby ? "darkorange" : "red"}
            style={{
              opacity: isSelected ? 1 : 0.2,
            }}
          />
        </TouchableOpacity>
      </MarkerView>
    </>
  );
};
