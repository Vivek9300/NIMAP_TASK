import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  category: "popular",
  searchInput : ""
}

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {

movieCategory : (state,actions)=>{
        state.category = actions.payload
    },

movieSearchResult : (state,actions)=>{
    state.searchInput = actions.payload;
}  


    
  },
})
export const {movieCategory,movieSearchResult} = movieSlice.actions

export default movieSlice.reducer