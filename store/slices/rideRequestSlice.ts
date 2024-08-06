import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getRideRequests } from "@/api/getRideRequests";
import { TRideRequest } from "@/types";

export type TRideRequestSlice = {
  rideRequests: TRideRequest[];
  isFetching: boolean;
};

const initialState: TRideRequestSlice = {
  rideRequests: [],
  isFetching: false,
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
  reducers: {},
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

export default rideRequestSlice.reducer;
