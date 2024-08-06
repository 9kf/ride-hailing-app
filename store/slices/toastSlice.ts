import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TToastSlice = {
  isVisible: boolean;
  type: "success" | "error" | "warning";
  message: string;
};

const initialState: TToastSlice = {
  isVisible: false,
  type: "success",
  message: "",
};

export const TOAST_HIDE_DELAY = 3000;

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (
      state,
      action: PayloadAction<Omit<TToastSlice, "isVisible">>
    ) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.isVisible = true;
    },
    hideToast: (state) => {
      state.isVisible = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;
