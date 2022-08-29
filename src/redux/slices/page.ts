import { createSlice } from "@reduxjs/toolkit";
import { PageState } from "../../types/redux/page";

const initialState: PageState = {
  current: 1,
};

// Slice to store current page
export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.current = action.payload;
    },
  },
});

export const { setPage } = pageSlice.actions;
export default pageSlice.reducer;
