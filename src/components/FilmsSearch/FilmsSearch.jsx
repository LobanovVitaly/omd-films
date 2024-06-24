import React from 'react';
import commonStyle from "../../assets/css/common.module.css";
import style from "./FilmsSearch.module.css";
import Films from "../Films/Films";
import Preloader from "../common/Preloader/Preloader";
import Pagination from "../common/Pagination/Pagination";
import {connect} from "react-redux";
import {searchFilms, searchInputChanged, setCurrentPage, setFormFieldsError} from "../../redux/films-reducer";

class FilmsSearch extends React.Component{
    constructor(props){
        super(props);

        this.searchSubmit = this.searchSubmit.bind(this);
        this.inputHandle = this.inputHandle.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.generateSearchQuery = this.generateSearchQuery.bind(this);
    }

    generateSearchQuery(page = 1){
        let query = '';

        for(let key in this.props.query){
            if(this.props.query[key]){
                query += `&${key}=${this.props.query[key]}`
            }
        }
        query += `&page=${page}`;

        return query;
    }

    searchSubmit(e){
        e.preventDefault();

        if(!this.props.query.s && !this.props.query.i && !this.props.query.t){
            this.props.setFormFieldsError(true);
        }
        else{
            let query = this.generateSearchQuery();
            this.props.searchFilms(query);
            this.props.setCurrentPage(1);
        }
    }

    inputHandle(e){
        this.props.searchInputChanged([[e.currentTarget.name], e.currentTarget.value]);

        if(this.props.query.s || this.props.query.i || this.props.query.t){
            this.props.setFormFieldsError(false);
        }
    }

    onPageChange(number){
        this.props.setCurrentPage(number);

        let query = this.generateSearchQuery(number);
        this.props.searchFilms(query);
    }

    render(){
        return (
            <main className={style.main}>
                <div className={commonStyle.container}>

                    <form onSubmit={this.searchSubmit} className={style.searchForm}>
                        <fieldset>
                            <legend>Find movies</legend>
                            <input type="text"
                                   name="s"
                                   value={this.props.query.s}
                                   onChange={this.inputHandle}
                                   placeholder="Search"
                            />
                            <input type="text"
                                   name="t"
                                   className={this.props.formFieldsError ? style.inputError : ''}
                                   value={this.props.query.t}
                                   onChange={this.inputHandle}
                                   placeholder="Title"
                            />
                            <input type="text" name="i" className={this.props.formFieldsError ? style.inputError : ''} value={this.props.query.i} onChange={this.inputHandle} placeholder="IMDb ID"/>
                            <input type="number" name="y" value={this.props.query.y} onChange={this.inputHandle} placeholder="Year"/>

                            <button>Search</button>

                            {this.props.formFieldsError &&
                                <p>Enter one of the fields - Title or IMDb ID</p>
                            }
                        </fieldset>
                    </form>

                    {this.props.isLoading && <Preloader />}

                    {!this.props.isLoading && (
                            <>
                                {this.props.error ? (<p><b>Error: </b> {this.props.error}</p>) : null}

                                {!this.props.error && this.props.films.length > 0 &&
                                    <Films data={this.props.films} currentPage={this.props.currentPage}/>
                                }
                            </>
                        )
                    }
                    <Pagination currentPage={this.props.currentPage}
                                totalResults={this.props.totalResults}
                                onPageChange={this.onPageChange}
                    />
                </div>
            </main>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        films: state.films.films,
        totalResults: state.films.totalResults,
        currentPage: state.films.currentPage,
        pageSize: state.films.pageSize,
        error: state.films.error,
        query: state.films.query,
        formFieldsError: state.films.formFieldsError,
        isLoading: state.films.isLoading
    }
}

export default connect(mapStateToProps, {searchInputChanged, setFormFieldsError, setCurrentPage, searchFilms})(FilmsSearch);