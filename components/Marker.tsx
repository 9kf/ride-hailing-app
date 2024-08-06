import { TRideRequest } from "@/types";
import { isCoordinateWithinDistance } from "@/utils";
import { FontAwesome } from "@expo/vector-icons";
import { MarkerView } from "@rnmapbox/maps";
import { LocationObject } from "expo-location";

type TRideRequestMarkerProps = {
  rideRequest: TRideRequest;
  currentLocation: LocationObject;
};

export const RideRequestMarker = ({
  rideRequest,
  currentLocation,
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
    <MarkerView
      coordinate={[
        rideRequest.pickupLocation.longitude,
        rideRequest.pickupLocation.latitude,
      ]}
      allowOverlapWithPuck={true}
    >
      <FontAwesome
        name="map-marker"
        size={24}
        color={isNearby ? "green" : "red"}
      />
    </MarkerView>
  );
};
