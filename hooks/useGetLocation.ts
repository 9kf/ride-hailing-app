import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { getCurrentLocation } from "@/utils";

export const useGetCurrentLocation = () => {
  const [locationObject, setLocationObject] = useState<
    Location.LocationObject | undefined
  >();

  const setCurrentLocation = async () => {
    const currentLoc = await getCurrentLocation();
    setLocationObject(currentLoc);
  };

  useEffect(() => {
    setCurrentLocation();
  }, []);

  return locationObject;
};
