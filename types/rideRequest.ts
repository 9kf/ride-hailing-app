import { TUser } from "./user";

export type TLocationCoordinates = {
  longitude: number;
  latitude: number;
};

export type TRideRequest = {
  id: number;
  user: TUser;
  driverId: number | null;
  pickupLocation: TLocationCoordinates;
  destination: TLocationCoordinates;
  status:
    | "pending"
    | "accepted"
    | "declined"
    | "started"
    | "picked-up"
    | "dropped-off";
  pickupTime: string; // datestring;
  timeStamp: string; // datestring;
};
