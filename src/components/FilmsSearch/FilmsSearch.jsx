import React from 'react';
import commonStyle from "../../assets/css/common.module.css";
import style from "./FilmsSearch.module.css";
import Films from "../Films/Films";
import omdbAPI from "../../api/api";
import Preloader from "../Preloader/Preloader";
import {connect} from "react-redux";
import {searchFilms, searchInputChanged} from "../../redux/films-reducer";

class FilmsSearch extends React.Component{
    constructor(props){
        super(props);

        this.searchSubmit = this.searchSubmit.bind(this);
        this.inputHandle = this.inputHandle.bind(this);
    }

    searchSubmit(e){
        e.preventDefault();

        let query = '';

        for(let key in this.props.query){
            if(this.props.query[key]){
                query += `&${key}=${this.props.query[key]}`
            }
        }

        this.props.searchFilms(query);
    }

    inputHandle(e){
        this.props.searchInputChanged([[e.currentTarget.name], e.currentTarget.value]);
    }

    render(){
        return (
            <main className={style.main}>
                <div className={commonStyle.container}>

                    <form onSubmit={this.searchSubmit} className={style.searchForm}>
                        <fieldset>
                            <legend>Find movies</legend>
                            <input type="text" name="s" value={this.props.query.s} onChange={this.inputHandle} placeholder="Search"/>
                            <input type="text" name="t" className={this.props.formFieldsError ? style.inputError : ''} value={this.props.query.t} onChange={this.inputHandle} placeholder="Title"/>
                            <input type="text" name="i"  value={this.props.query.i} onChange={this.inputHandle} placeholder="IMDb ID"/>
                            <input type="number" name="y" value={this.props.query.y} onChange={this.inputHandle} placeholder="Year"/>

                            <button>Search</button>
                        </fieldset>
                    </form>

                    {this.props.isLoading && <Preloader />}

                    {!this.props.isLoading && (
                            <>
                                {this.props.error ? (<p><b>Error: </b> {this.props.error}</p>) : null}

                                {!this.props.error && this.props.films.length > 0 &&
                                    <div>
                                        <Films data={this.props.films}/>
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

let mapStateToProps = (state) => {
    return {
        films: state.films.films,
        totalCount: state.films.totalCount,
        currentPage: state.films.currentPage,
        error: state.films.error,
        query: state.films.query,
        formFieldsError: state.films.formFieldsError,
        isLoading: state.films.isLoading
    }
}

export default connect(mapStateToProps, {searchInputChanged, searchFilms})(FilmsSearch);