import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getRideRequests } from "@/api/getRideRequests";
import { TRideRequest } from "@/types";

export type TRideRequestSlice = {
  rideRequests: TRideRequest[];
  isFetching: boolean;
  acceptedRideRequest?: TRideRequest;
};

const initialState: TRideRequestSlice = {
  rideRequests: [],
  isFetching: false,
  acceptedRideRequest: undefined,
};

export const fetchRideRequests = createAsyncThunk(
  "rideRequest/fetch",
  async () => {
    const rideRequestsResponse = await getRideRequests();

    if (!rideRequestsResponse) {
      // show error message
      return [];
    }

    return rideRequestsResponse;
  }
);

export const rideRequestSlice = createSlice({
  name: "rideRequest",
  initialState,
  reducers: {
    acceptRideRequest: (state, action: PayloadAction<TRideRequest>) => {
      state.rideRequests = [action.payload];
      state.acceptedRideRequest = { ...action.payload, status: "accepted" };
    },
    declineRideRequest: (state, action: PayloadAction<TRideRequest>) => {
      if (action.payload.status === "pending") {
        const newRideRequests = state.rideRequests.filter(
          (rr) => rr.id !== action.payload.id
        );
        state.rideRequests = newRideRequests;
        return;
      }

      state.acceptedRideRequest = undefined;
    },
    startRideRequest: (state) => {
      if (!state.acceptedRideRequest) return;

      state.acceptedRideRequest.status = "started";
    },
    pickedUpRideRequest: (state) => {
      if (!state.acceptedRideRequest) return;

      state.acceptedRideRequest.status = "picked-up";
    },
    droppedOffRideRequest: (state) => {
      state.rideRequests = [];
      state.acceptedRideRequest = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRideRequests.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(fetchRideRequests.fulfilled, (state, action) => {
      state.rideRequests = action.payload;
      state.isFetching = false;
    });
  },
});

export const {
  acceptRideRequest,
  declineRideRequest,
  startRideRequest,
  pickedUpRideRequest,
  droppedOffRideRequest,
} = rideRequestSlice.actions;

export default rideRequestSlice.reducer;
