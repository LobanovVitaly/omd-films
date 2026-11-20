import axios from "axios";

const apiKey = '42ddf470';
const omdbAPI = {
    baseURL: `https://www.omdbapi.com/?apikey=${apiKey}`,

    getFilms(query){
        return axios.get(`${this.baseURL}${query}`);
    }
};

export default omdbAPI;