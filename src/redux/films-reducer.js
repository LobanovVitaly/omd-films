import omdbAPI from "../api/api";

const SET_LOADING = 'films-reducer/SET_LOADING';
const SET_FILMS = 'films-reducer/SET_FILMS';
const SET_ERROR = 'films-reducer/SET_ERROR';
const SET_SEARCH_QUERY = 'films-reducer/SET_SEARCH_QUERY';

let initialState = {
    films: [],
    totalCount: null,
    currentPage: 1,
    error: '',
    query: {
        s: '',
        t: '',
        i: '',
        y: ''
    },
    formFieldsError: false,
    isLoading: false
};

const filmsReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case SET_FILMS:
            return {
                ...state,
                films: action.films,
                error: ''
            }
        case SET_ERROR:
            return {
                ...state,
                error: action.error
            }
        case SET_SEARCH_QUERY:
            return {
                ...state,
                query: {
                    ...state.query,
                    [action.inputData[0]]: action.inputData[1]
                }
            }
        default: {
            return state;
        }
    }
}

export const toggleLoading =  (isLoading) => {
    return {
        type: SET_LOADING,
        isLoading
    }
};

export const searchInputChanged = (inputData) => {
    return {
        type: SET_SEARCH_QUERY,
        inputData
    }
}

export const setFilms = (films) => {
    return {
        type: SET_FILMS,
        films
    }
};

export const setError = (error) => {
    return {
        type: SET_ERROR,
        error
    }
};

export const searchFilms = (query) => {
    return (dispatch, state) => {
        toggleLoading(true);

        omdbAPI.getFilms(query)
            .then((response) => {
                console.log(response)
                if(response.data.Response === "False"){
                    dispatch(setError(response.data.Error));
                }
                else if(!response.data.Search && !response.data.Error && response.data.imdbID){
                    dispatch(setFilms([response.data]));
                }
                else{
                    dispatch(setFilms([...response.data.Search]));
                }
                toggleLoading(false);
            });
    }
}

export default filmsReducer;