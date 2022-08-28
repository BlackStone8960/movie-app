import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { omitBy } from "lodash";
import query from "query-string";
import { isNullOrUndefined } from "../utils/lodashExtensions";

export type MovieState = {
  contents: any;
  status: "idle" | "loading" | "failed";
  searchTitle: string;
  page: number;
};

export type FetchMoviesParams = {
  s: string;
  type?: string;
  y?: string;
  plot?: string;
  page?: number;
};

const initialState: MovieState = {
  contents: null,
  status: "idle",
  searchTitle: "",
  page: 1,
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

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setContents: (state, action) => {
      state.contents = action.payload;
    },
    setSearchTitle: (state, action) => {
      state.searchTitle = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "idle";
        movieSlice.caseReducers.setContents(state, action);
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setContents, setSearchTitle, setPage } = movieSlice.actions;
export default movieSlice.reducer;
