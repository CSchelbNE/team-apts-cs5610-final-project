import { createSlice } from "@reduxjs/toolkit";
import {findAllListingsThunk, getAlbumsThunk} from "../services/discogs-thunk";

const initialState = {
    discogsQuery: [],
    discogsAlbumQuery: [],
    listings: [],
    loading: false
}


const discogsSlice = createSlice({
    name: "discogs",
    initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
    extraReducers: {
        [getAlbumsThunk.fulfilled]:
            (state, {payload}) => {
                state.loading = false;
                const json = JSON.parse(JSON.stringify(payload));
                state.discogsAlbumQuery = json;
                console.log(state.discogsAlbumQuery);
            },
        [findAllListingsThunk.fulfilled]:
            (state, {payload}) => {
                state.listings = payload;
            }
    }
});

export default discogsSlice.reducer;