import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BottomSheet from "@gorhom/bottom-sheet";

import { useGetCurrentLocation } from "@/hooks/useGetLocation";
import { fetchRideRequests } from "@/store/slices/rideRequestSlice";
import { AppDispatch, RootState } from "@/store/store";
import { TRideRequest } from "@/types";
import {
  MapView,
  RideRequestMarker,
  DestinationMarker,
  RideRequestDetails,
} from "@/components";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const rideRequests = useSelector<RootState>((state) =>
    state.rideRequest.rideRequests.filter((rr) => rr.status !== "declined")
  ) as TRideRequest[];
  const acceptedRideRequest = useSelector<RootState>(
    (state) => state.rideRequest.acceptedRideRequest
  ) as TRideRequest | undefined;

  const currentLocation = useGetCurrentLocation();
  const bottomSheetRef = useRef<BottomSheet | null>(null);

  const [selectedRideRequest, setSelectedRideRequest] =
    useState<TRideRequest>();

  useEffect(() => {
    dispatch(fetchRideRequests());
  }, [currentLocation?.coords]);

  useEffect(() => {
    if (!acceptedRideRequest) return;

    setSelectedRideRequest(acceptedRideRequest);
  }, [acceptedRideRequest]);

  const handleRideRequestPressed = (rideRequest: TRideRequest) => {
    bottomSheetRef.current?.expand();
    setSelectedRideRequest(rideRequest);
  };

  const handleRideRequestDetailsClosed = () => {
    setSelectedRideRequest(undefined);
  };

  const handleDeclineRequestCallback = (refetch?: boolean) => {
    bottomSheetRef.current?.close();
    setSelectedRideRequest(undefined);

    if (refetch) {
      dispatch(fetchRideRequests());
    }
  };

  return (
    <>
      <MapView>
        {currentLocation &&
          rideRequests.map((req, index) => (
            <RideRequestMarker
              key={index}
              currentLocation={currentLocation}
              rideRequest={req}
              isSelected={
                !!selectedRideRequest ? selectedRideRequest.id === req.id : true
              }
              onPress={handleRideRequestPressed}
            />
          ))}

        {selectedRideRequest && (
          <DestinationMarker
            rideRequestDestination={selectedRideRequest.destination}
          />
        )}
      </MapView>
      {selectedRideRequest && (
        <RideRequestDetails
          ref={bottomSheetRef}
          rideRequest={selectedRideRequest}
          onClose={handleRideRequestDetailsClosed}
          onDeclineRequestCallback={handleDeclineRequestCallback}
        />
      )}
    </>
  );
}
