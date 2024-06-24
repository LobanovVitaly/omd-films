import axios from "axios";

const omdbAPI = {
    baseURL: 'https://www.omdbapi.com/?apikey=42ddf470',

    getFilms(query){
        return axios.get(`${this.baseURL}${query}`);
    }
};

export default omdbAPI;