import React from "react";
import { MarkerView } from "@rnmapbox/maps";
import { TLocationCoordinates } from "@/types";
import { FontAwesome } from "@expo/vector-icons";

type TDestinationMarkerProps = {
  rideRequestDestination: TLocationCoordinates;
};

const DestinationMarker = ({
  rideRequestDestination,
}: TDestinationMarkerProps) => {
  return (
    <MarkerView
      coordinate={[
        rideRequestDestination.longitude,
        rideRequestDestination.latitude,
      ]}
      allowOverlapWithPuck={true}
    >
      <FontAwesome name="map-marker" size={32} color={"green"} />
    </MarkerView>
  );
};

export { DestinationMarker };
