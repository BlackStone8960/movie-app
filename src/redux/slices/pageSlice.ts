import { createSlice } from "@reduxjs/toolkit";
import { PageState } from "../../types/page";

const initialState: PageState = {
  current: 1,
};

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
