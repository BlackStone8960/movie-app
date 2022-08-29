import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { omitBy } from "lodash";
import query from "query-string";
import { ContentsState, FetchMoviesParams } from "../../types/movie";
import { isNullOrUndefined } from "../../utils/lodashExtensions";

const initialState: ContentsState = {
  result: null,
  status: "idle",
  searchTitle: "",
};

export const fetchMovies = createAsyncThunk(
  "movie/fetchMovies",
  async (params: FetchMoviesParams) => {
    const defaultUrl = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}`;
    const queryObject = omitBy(params, isNullOrUndefined);
    const paramsString = query.stringify(queryObject);
    const url = `${defaultUrl}&${paramsString}`;
    const { data } = await axios.get(url);
    return data;
  }
);

export const contentsSlice = createSlice({
  name: "contents",
  initialState,
  reducers: {
    setContents: (state, action) => {
      state.result = action.payload;
    },
    setSearchTitle: (state, action) => {
      state.searchTitle = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "idle";
        contentsSlice.caseReducers.setContents(state, action);
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setContents, setSearchTitle } = contentsSlice.actions;
export default contentsSlice.reducer;
