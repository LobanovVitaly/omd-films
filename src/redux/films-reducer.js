import omdbAPI from "../api/api";

const SET_LOADING = 'films-reducer/SET_LOADING';
const SET_FILMS = 'films-reducer/SET_FILMS';
const SET_ERROR = 'films-reducer/SET_ERROR';
const SET_SEARCH_QUERY = 'films-reducer/SET_SEARCH_QUERY';
const SET_FORM_FIELDS_ERROR = 'films-reducer/SET_FORM_FIELDS_ERROR';
const SET_TOTAL_RESULTS = 'films-reducer/SET_TOTAL_RESULTS';
const SET_CURRENT_PAGE = 'films-reducer/SET_CURRENT_PAGE';

let initialState = {
    films: [],
    totalResults: null,
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
        case SET_FORM_FIELDS_ERROR:
            return {
                ...state,
                formFieldsError: action.formFieldsError
            }
        case SET_TOTAL_RESULTS:
            return {
                ...state,
                totalResults: action.totalResults
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
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
};

export const setFormFieldsError = (formFieldsError) => {
    return {
        type: SET_FORM_FIELDS_ERROR,
        formFieldsError
    }
};

export const setFilms = (films) => {
    return {
        type: SET_FILMS,
        films
    }
};

export const setTotalResults = (totalResults) => {
    return {
        type: SET_TOTAL_RESULTS,
        totalResults
    }
}

export const setError = (error) => {
    return {
        type: SET_ERROR,
        error
    }
};

export const setCurrentPage = (number) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage: number
    }
};


export const searchFilms = (query) => {
    return (dispatch) => {
        dispatch(setFormFieldsError(false));
        dispatch(toggleLoading(true));

        omdbAPI.getFilms(query)
            .then((response) => {
                if(response.data.Response === "False"){
                    dispatch(setError(response.data.Error));
                }
                else if(!response.data.Search && !response.data.Error && response.data.imdbID){
                    dispatch(setFilms([response.data]));
                }
                else{
                    dispatch(setFilms([...response.data.Search]));
                    dispatch(setTotalResults(response.data.totalResults));
                }
                dispatch(toggleLoading(false));
            });
    }
}

export default filmsReducer;