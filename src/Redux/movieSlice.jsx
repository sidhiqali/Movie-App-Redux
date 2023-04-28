import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
    movies : {},
}

const movieSlice = createSlice({
    name : "movies",
    initialstate,
    reducers : {
        addMovies: (state, {payload})=>{
            state.movies = payload
        },
    },  

})

export const {addMovies} = movieSlice.actions;
export const getAllmovies = (state)=>state.movies.movies;
export default movieSlice.reducer;
