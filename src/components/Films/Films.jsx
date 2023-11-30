import style from './Films.module.css';
import FilmItem from "./FilmItem/FilmItem";
import React from "react";

const Films = ({data}) => {

    let filmsElems = data.map((elem) => {
        return (
            <FilmItem key={elem.imdbID} data={elem}/>
        );
     });

    return (
        <>
            <p className={style.searchResultTitle}>Search results</p>
            <div className={style.films}>
                {filmsElems}
            </div>
        </>
    );
}

export default Films;
