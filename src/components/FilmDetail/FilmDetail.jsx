import style from './FilmDetail.module.css'
import React, {useEffect, useState} from "react";
import withRouter from "../../hocs/withRouter";
import omdbAPI from "../../api/api";
import commonStyle from "../../assets/css/common.module.css";
import Preloader from "../common/Preloader/Preloader";
import {NavLink} from "react-router-dom";
import noPicture from './../../assets/img/no-picture.png';


const FilmDetail = (props) => {
    const [film, setFilm]= useState({});
    const [error, setError]= useState('');
    const [isLoading, setIsLoading]= useState(true);

    useEffect(()=>{
        omdbAPI.getFilms(`&i=${props.router.location.pathname.slice(1)}`)
            .then((response) => {
                setFilm(response.data.Response === "False" ? {} : {...response.data});
                setError(response.data.Response === "False" ? response.data.Error : '');
                setIsLoading(false);
            });
    }, []);

    if(error !==''){
        return (
            <div className={commonStyle.container}>
                <p><b>Error:</b> {error}</p>
            </div>
        );
    }

    let filmInfo = [];

    for (let key in film) {
        if (key === 'Title' ||
            key === 'Ratings' ||
            key === 'Poster') continue;

        filmInfo.push([key, film[key]]);
    }

    let filmInfoItems = filmInfo.map((item) => {
        if(item[1] !== 'N/A'){
            return (
                <>
                    <p key={`key_${item[1]}`}><b>{item[0]}:</b> {item[1]}</p>
                </>
            );
        }
        return <></>;
    });

    return (
        <div className={commonStyle.container}>
            <NavLink to='/' className={style.backBtn}>Back to list</NavLink>

            {isLoading && <Preloader />}
            {!isLoading && (
                <div className={style.filmDetail}>
                        <img src={(film.Poster !== 'N/A' )? film.Poster : noPicture} alt={film.Title}/>

                        <div className={style.filmInfo}>
                            <p className={style.title}>{film.Title}</p>

                            {filmInfoItems}
                        </div>
                </div>
            )}
        </div>
    );
}

export default withRouter(FilmDetail);