import axios from "axios";
const API_BASE_SEARCH_PATH = "http://localhost:2000/api/search/"
const API_ARTIST_PATH = "http://localhost:2000/api/search/artist/"
const API_ALBUM_PATH = "http://localhost:2000/api/search/album/"

export const getArtist = async (artist) => {
    if (artist === "") return {discogsQuery: [], loading: false};
    return await axios.get(API_ARTIST_PATH+artist);
}

export const getAlbum = async (album) => {
    if (album === "") return {discogsQuery: [], loading: false};
    return await axios.get(API_ALBUM_PATH+album);
}



