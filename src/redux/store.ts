import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import contentsReducer from "./slices/contentsSlice";
import pageReducer from "./slices/pageSlice";

export const store = configureStore({
  reducer: {
    contents: contentsReducer,
    page: pageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
