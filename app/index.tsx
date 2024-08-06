import { View } from "react-native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { MarkerView } from "@rnmapbox/maps";

import { useGetCurrentLocation } from "@/hooks/useGetLocation";
import { fetchRideRequests } from "@/store/slices/rideRequestSlice";
import { AppDispatch, RootState } from "@/store/store";
import { TRideRequest } from "@/types";
import { isCoordinateWithinDistance } from "@/utils";
import { MapView, RideRequestMarker } from "@/components";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const rideRequests = useSelector<RootState>(
    (state) => state.rideRequest.rideRequests
  ) as TRideRequest[];

  const currentLocation = useGetCurrentLocation();

  useEffect(() => {
    dispatch(fetchRideRequests());
  }, [currentLocation?.coords]);

  return (
    <MapView>
      {currentLocation &&
        rideRequests.map((req, index) => (
          <RideRequestMarker
            key={index}
            currentLocation={currentLocation}
            rideRequest={req}
          />
        ))}
    </MapView>
  );
}
