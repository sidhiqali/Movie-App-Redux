import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import movieReducer from './movieSlice';
import userReducer from './userSlice';

const middleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    users: userReducer,
  },
  middleware,
});