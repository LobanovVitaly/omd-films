import style from './FilmItem.module.css';
import {NavLink} from "react-router-dom";
import noPicture from './../../../assets/img/no-picture.png';
import {useContext} from "react";
import {ThemeContext} from "../../../context/ThemeContext";

const FilmItem = ({data}) => {
    let theme = useContext(ThemeContext);
    return (
        <NavLink className={`${style.filmItem} ${theme}`} to={data.imdbID}>
            <img src={(data.Poster !== 'N/A' )? data.Poster : noPicture} alt={data.Title}/>

            <span className={style.title}>{data.Title}</span>
            <span className={style.year}>{data.Year}</span>
        </NavLink>
    );
}

export default FilmItem;
