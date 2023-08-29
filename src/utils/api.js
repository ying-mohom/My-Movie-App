import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjkxZWU3MjcxMjczNzhhNmY4NjY3N2QyMjBlN2Q0ZSIsInN1YiI6IjY0ZWMxOGM2YzNjODkxMDBlMzYxM2EwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XpAyJjak5hjOtsajDc8UyVvSe7orsMSZYFOFXTzP_LE";


const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
    try {
        const response = await axios.get(BASE_URL + url, {
            headers,
            params
        })
        console.log("Data From Api.js:", response.data);
        return response.data;
    } catch (err) {
        console.log(err);
        return err;
    }
}