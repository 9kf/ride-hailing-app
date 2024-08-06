import { TRideRequest } from "@/types";
import { getRandomCoordinates } from "@/utils";
import { getCurrentLocation } from "@/utils";

const names = [
  "John Doe",
  "Ahmad Austin",
  "Jessica Ramos",
  "Carina Fritz",
  "Krista Riley",
  "Lexi Sparks",
  "Mara Randall",
  "Lily Duarte",
  "Ulises Pena",
  "Jovanny Ramos",
];

export const getRideRequests = async (): Promise<
  TRideRequest[] | undefined
> => {
  try {
    const currentLoc = await getCurrentLocation();

    if (!currentLoc) return [];

    const randomPickupCoordinates = getRandomCoordinates(
      currentLoc?.coords.latitude,
      currentLoc?.coords.longitude
    );

    const randomDestinationCoordinates = getRandomCoordinates(
      currentLoc?.coords.latitude,
      currentLoc?.coords.longitude
    );

    const rideRequests: TRideRequest[] = [];

    for (const [
      index,
      pickupCoordinates,
    ] of randomPickupCoordinates.entries()) {
      rideRequests.push({
        id: index,
        user: {
          id: index,
          name: names[index],
          email: `${names[index].split(" ").join().toLowerCase()}@email.com`,
        },
        driverId: null,
        pickupLocation: pickupCoordinates,
        destination: randomDestinationCoordinates[index],
        status: "pending",
        pickupTime: new Date().toISOString(),
        timeStamp: new Date().toISOString(),
      });
    }

    return rideRequests;
  } catch (error) {
    console.log(error);
  }
};
