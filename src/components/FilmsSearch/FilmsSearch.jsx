import React from 'react';
import commonStyle from "../../assets/css/common.module.css";
import style from "./FilmsSearch.module.css";
import Films from "../Films/Films";
import omdbAPI from "../../api/api";
import Preloader from "../Preloader/Preloader";

class FilmsSearch extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            films: [],
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

        this.searchSubmit = this.searchSubmit.bind(this);
        this.inputHandle = this.inputHandle.bind(this);
    }

    searchSubmit(e){
        e.preventDefault();

        let query = '';

        for(let key in this.state.query){
            if(this.state.query[key]){
                query += `&${key}=${this.state.query[key]}`
            }
        }

        if(!this.state.query.s && (!this.state.query.i && !this.state.query.t)){
            this.setState({
                formFieldsError: true
            });
        }

        else{
            this.setState(
                {isLoading: true}
            );
            omdbAPI.getFilms(query)
                .then((response) => {
                    console.log(response)
                    if(response.data.Response === "False"){
                        this.setState({
                            films: {},
                            error: response.data.Error,
                            isLoading: false
                        });
                    }
                    else if(!response.data.Search && !response.data.Error && response.data.imdbID){
                        this.setState({
                            films: [response.data],
                            error: '',
                            isLoading: false
                        });
                    }
                    else{
                        this.setState({
                            films: [...response.data.Search],
                            error: '',
                            isLoading: false
                        });
                    }
                });
        }
    }

    inputHandle(e){
        this.setState({
            query: {
                ...this.state.query,
                [e.currentTarget.name]: e.currentTarget.value,
            },
            formFieldsError: false
        });
    }

    render(){
        return (
            <main className={style.main}>
                <div className={commonStyle.container}>

                    <form onSubmit={this.searchSubmit} className={style.searchForm}>
                        <fieldset>
                            <legend>Find movies</legend>
                            <input type="text" name="s" value={this.state.query.s} onChange={this.inputHandle} placeholder="Search"/>
                            <input type="text" name="t" className={this.state.formFieldsError ? style.inputError : ''} value={this.state.query.t} onChange={this.inputHandle} placeholder="Title"/>
                            <input type="text" name="i"  value={this.state.query.i} onChange={this.inputHandle} placeholder="IMDb ID"/>
                            <input type="number" name="y" value={this.state.query.y} onChange={this.inputHandle} placeholder="Year"/>

                            <button>Search</button>
                        </fieldset>
                    </form>

                    {this.state.isLoading && <Preloader />}

                    {!this.state.isLoading && (
                            <>
                                {this.state.error ? (<p><b>Error: </b> {this.state.error}</p>) : null}

                                {!this.state.error && this.state.films.length > 0 &&
                                    <div>
                                        <Films data={this.state.films}/>
                                        {/*<FilmDetail data={this.state.films} /> */}
                                    </div>
                                }
                            </>
                        )
                    }
                </div>
            </main>
        );
    }
}

export default FilmsSearch;