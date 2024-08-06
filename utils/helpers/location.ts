import * as Location from "expo-location";

import { TLocationCoordinates } from "@/types";

/**
 * function that returns random coordinates that is within 10km radius of the given lat and long.
 */
export const getRandomCoordinates = (
  latitude: number,
  longitude: number,
  radiusKm: number = 5,
  numPoints: number = 10
): TLocationCoordinates[] => {
  const randomCoordinates: TLocationCoordinates[] = [];
  const earthRadiusKm = 6371;

  for (let i = 0; i < numPoints; i++) {
    const randomDistance = Math.random() * radiusKm;
    const randomBearing = Math.random() * 2 * Math.PI;

    const distanceRadians = randomDistance / earthRadiusKm;

    const latitudeRad = latitude * (Math.PI / 180);
    const longitudeRad = longitude * (Math.PI / 180);

    const newLatitudeRad = Math.asin(
      Math.sin(latitudeRad) * Math.cos(distanceRadians) +
        Math.cos(latitudeRad) *
          Math.sin(distanceRadians) *
          Math.cos(randomBearing)
    );

    const newLongitudeRad =
      longitudeRad +
      Math.atan2(
        Math.sin(randomBearing) *
          Math.sin(distanceRadians) *
          Math.cos(latitudeRad),
        Math.cos(distanceRadians) -
          Math.sin(latitudeRad) * Math.sin(newLatitudeRad)
      );

    const newLatitude = newLatitudeRad * (180 / Math.PI);
    const newLongitude = newLongitudeRad * (180 / Math.PI);

    randomCoordinates.push({
      latitude: newLatitude,
      longitude: newLongitude,
    });
  }

  return randomCoordinates;
};

export const getCurrentLocation = async () => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      return;
    }

    const loc = await Location.getCurrentPositionAsync({
      accuracy: Location.LocationAccuracy.High,
    });

    return loc;
  } catch (error) {
    console.error("Error requesting location permission:", error);
  }
};

export const haversineDistance = (
  coord1: TLocationCoordinates,
  coord2: TLocationCoordinates
): number => {
  const earthRadiusKm = 6371;

  const dLat = (coord2.latitude - coord1.latitude) * (Math.PI / 180);
  const dLon = (coord2.longitude - coord1.longitude) * (Math.PI / 180);

  const lat1Rad = coord1.latitude * (Math.PI / 180);
  const lat2Rad = coord2.latitude * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(lat1Rad) *
      Math.cos(lat2Rad);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
};

export const isCoordinateWithinDistance = (
  currentCoordinates: TLocationCoordinates,
  comparedCoordinates: TLocationCoordinates,
  minDistanceKm: number = 2
): boolean => {
  return (
    haversineDistance(currentCoordinates, comparedCoordinates) < minDistanceKm
  );
};

export const filterCoordinatesWithinDistance = (
  latitude: number,
  longitude: number,
  coordinates: TLocationCoordinates[],
  minDistanceKm: number = 2
): TLocationCoordinates[] => {
  return coordinates.filter(
    (coord) => haversineDistance({ latitude, longitude }, coord) > minDistanceKm
  );
};
