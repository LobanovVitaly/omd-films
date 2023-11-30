import style from './FilmItem.module.css';
import {NavLink} from "react-router-dom";

const FilmItem = ({data}) => {
    //console.log(data)
    return (
        <NavLink className={style.filmItem} to={data.imdbID}>
            <img src={data.Poster} alt={data.Title}/>

            <p className={style.title}>{data.Title}</p>
            <p className={style.year}>{data.Year}</p>
        </NavLink>
    );
}

export default FilmItem;
