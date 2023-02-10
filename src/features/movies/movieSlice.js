import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi"
import {APIKey} from "../../common/apis/movieApiKey"


// đối số đầu tiên là 1 strings để nhận biết action creator (component nào tạo ra và gửi action đi)
// đối số thứ 2 là payload creator callback function
// hàm này sẽ chờ fetch data xong mới return data lên reducer
export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', async (term)=> {
	const response = await movieApi.get(`?apiKey=${APIKey}&s=${term}&type=movie`)
	return addMovies(response.data)
})

export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows', async (term)=> {
	const response = await movieApi.get(`?apiKey=${APIKey}&s=${term}&type=series`)
	return addMovies(response.data)
})

export const fetchAsyncMovieOrShowsDetail = createAsyncThunk('movies/fetchAsyncMovieOrShowsDetail', 
	async (id)=> {
		const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`)
		return response.data
})

const initialState = {
	movies: {},
	shows: {},
	selectMovieOrShows: {},
}

const movieSlice = createSlice({
	name: "movies",
	initialState,
	reducers: {
		addMovies: (state, {payload}) => {
			state.movies = payload;
		},
		removeSelectedMovieOrShow: (state) => {
			state.selectMovieOrShows = {}
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAsyncMovies.fulfilled, (state, {payload}) => {
			console.log("Fetched Successfully!")
			return {...state,movies: payload.payload}
		});
		builder.addCase(fetchAsyncShows.fulfilled, (state, {payload}) => {
			console.log("Fetched Successfully!")
			return {...state,shows: payload.payload}
		});
		builder.addCase(fetchAsyncMovies.pending, () => {
			console.log("Pending...")
		});
		builder.addCase(fetchAsyncMovies.rejected, () => {
			console.log("Rejected!")
		});
		builder.addCase(fetchAsyncMovieOrShowsDetail.fulfilled, (state, {payload}) => {
			return {...state, selectMovieOrShows: payload}
		});
	}
})

export const {addMovies, removeSelectedMovieOrShow} = movieSlice.actions
export const getAllMovies = (state) => state.movies.movies  // movie thứ nhất là name of Slice, movie thứ 2 là name of properties (cái lưu trong initialState)
export const getAllShows = (state) => state.movies.shows
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShows
export default movieSlice.reducer