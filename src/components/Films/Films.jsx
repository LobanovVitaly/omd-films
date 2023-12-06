import style from './Films.module.css';
import FilmItem from "./FilmItem/FilmItem";
import React from "react";

const Films = ({data, currentPage}) => {

    let filmsElems = data.map((elem) => {
        return (
            <FilmItem key={elem.imdbID} data={elem}/>
        );
     });

    return (
        <>
            <p className={style.searchResultTitle}>Search results{currentPage !== 1 && `, page ${currentPage}`}</p>
            <div className={style.films}>
                {filmsElems}
            </div>
        </>
    );
}

export default Films;
