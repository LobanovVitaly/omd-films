import style from './FilmItem.module.css';
import {NavLink} from "react-router-dom";
import noPicture from './../../../assets/img/no-picture.png';

const FilmItem = ({data}) => {
    return (
        <NavLink className={style.filmItem} to={data.imdbID}>
            <img src={(data.Poster !== 'N/A' )? data.Poster : noPicture} alt={data.Title}/>

            <span className={style.title}>{data.Title}</span>
            <span className={style.year}>{data.Year}</span>
        </NavLink>
    );
}

export default FilmItem;
