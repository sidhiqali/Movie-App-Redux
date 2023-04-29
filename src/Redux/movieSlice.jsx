import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Movieapi from '../api/Movieapi';
import { APIkey } from '../api/MovieapiKey';


export const fetchAsyncMovies = createAsyncThunk(
  'movies/fetchAsyncMovies',
  async (value) => {
    const response = await Movieapi.get(
      `?apikey=${APIkey}&s=${value}&type=movie`
    );
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  'movies/fetchAsyncShows',
  async (value) => {
    const response = await Movieapi.get(
      `?apikey=${APIkey}&s=${value}&type=series`
    );
    return response.data;
  }
);
export const fetchAsyncDetails = createAsyncThunk(
  'movies/fetchAsyncDetails',
  async (imdbID) => {
    const response = await Movieapi.get(
      `?apikey=${APIkey}&i=${imdbID}&plot=full`
    );
    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  details:{},
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    removeDetails: (state)=>{
      state.details = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.pending, (state) => {
        console.log('pending');
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
        console.log('data fetched succesfully');
        state.movies = payload;
      })
      .addCase(fetchAsyncMovies.rejected, (state) => {
        console.log('rejected');
      })
      .addCase(fetchAsyncShows.fulfilled, (state, { payload }) => {
        console.log('data fetched succesfully');
        state.shows = payload;
      })
      .addCase(fetchAsyncDetails.fulfilled, (state, { payload }) => {
        console.log('details fetched succesfully');
        state.details = payload;
      });
  },
});

export const { removeDetails } = movieSlice.actions;
export const getAllmovies = (state) => state.movies.movies;
export const getAllshows = (state) => state.movies.shows;
export const getAllDetails= (state)=> state.movies.details;
export default movieSlice.reducer;
