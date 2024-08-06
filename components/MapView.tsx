import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import Mapbox from "@rnmapbox/maps";

import { useGetCurrentLocation } from "@/hooks/useGetLocation";

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || null);

type TMapViewProps = {
  onPress?: (feat: GeoJSON.Feature) => void;
};

export const MapView = ({
  onPress,
  children,
}: PropsWithChildren<TMapViewProps>) => {
  const currentLocation = useGetCurrentLocation();

  return (
    <View style={styles.container}>
      <Mapbox.MapView
        projection="mercator"
        style={styles.map}
        zoomEnabled={true}
        onPress={onPress}
        scaleBarEnabled={false}
        logoEnabled={false}
      >
        <Mapbox.Camera
          defaultSettings={{
            zoomLevel: 10,
          }}
          {...(currentLocation && {
            centerCoordinate: [
              currentLocation.coords.longitude,
              currentLocation.coords.latitude,
            ],
          })}
          allowUpdates={true}
          animationMode="easeTo"
          animationDuration={1}
        />
        <Mapbox.LocationPuck />

        {children}
      </Mapbox.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  map: {
    flex: 1,
  },
});
