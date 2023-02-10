import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	movies: [],
}

const movieSlice = createSlice({
	name: "movies",
	initialState,
	reducers: {
		addMovies: (state, {payload}) => {
			state.movies = payload;
		}
	}
})

export const {addMovies} = movieSlice.actions
export const getAllMovies = (state) => state.movies.movies  // movie thứ nhất là name of Slice, movie thứ 2 là name of properties (cái lưu trong initialState)
export default movieSlice.reducer