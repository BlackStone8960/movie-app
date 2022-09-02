import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { omitBy } from "lodash";
import query from "query-string";
import { ContentsState, FetchContentsParams } from "../../types/redux/movie";
import { isNullOrUndefined } from "../../utils/lodashExtensions";

const initialState: ContentsState = {
  result: null,
  status: "idle",
  searchTitle: "",
  searchType: "",
};

export const fetchContents = createAsyncThunk(
  "movie/fetchContents",
  async (params: FetchContentsParams) => {
    const defaultUrl = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}`;

    // Omit params that are null or undefined
    const queryObject = omitBy(params, isNullOrUndefined);

    // Create params string to search contents
    const paramsString = query.stringify(queryObject);
    const url = `${defaultUrl}&${paramsString}`;
    const { data } = await axios.get(url);
    return data;
  }
);

// Slice to store search results and the search term
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
    setSearchType: (state, action) => {
      state.searchType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContents.fulfilled, (state, action) => {
        state.status = "idle";
        contentsSlice.caseReducers.setContents(state, action);
      })
      .addCase(fetchContents.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setContents, setSearchTitle, setSearchType } =
  contentsSlice.actions;
export default contentsSlice.reducer;
