import style from './FilmDetail.module.css'
import React from "react";
import withRouter from "../../hocs/withRouter";
import omdbAPI from "../../api/api";
import commonStyle from "../../assets/css/common.module.css";
import Preloader from "../common/Preloader/Preloader";
import {NavLink} from "react-router-dom";
import noPicture from './../../assets/img/no-picture.png';


class FilmDetail extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            film: {},
            error: '',
            isLoading: true
        };
    }
    componentDidMount() {
        omdbAPI.getFilms(`&i=${this.props.router.location.pathname.slice(1)}`)
            .then((response) => {
                if(response.data.Response === "False"){
                    this.setState({
                        film: {},
                        error: response.data.Error,
                        isLoading: false
                    });
                }
                else{
                    this.setState({
                        film: {...response.data},
                        error: '',
                        isLoading: false
                    });
                }
            });
    }

    render() {
        let data = this.state.film;
        let filmInfo = [];

        for (let key in data) {
            if (key === 'Title' ||
                key === 'Ratings' ||
                key === 'Poster') continue;

            filmInfo.push([key, data[key]]);
        }

        let filmInfoItems = filmInfo.map((item) => {
            if(item[1] !== 'N/A'){
                return (
                    <>
                        <p><b>{item[0]}:</b> {item[1]}</p>
                    </>
                );
            }
        });

        return (
            <div className={commonStyle.container}>
                <NavLink to='/' className={style.backBtn}>Back to list</NavLink>

                {this.state.isLoading && <Preloader />}
                {!this.state.isLoading && (
                    <div className={style.filmDetail}>
                        {
                            <>
                                <img src={(data.Poster != 'N/A' )? data.Poster : noPicture} alt={data.Title}/>

                                <div className={style.filmInfo}>
                                    <p className={style.title}>{data.Title}</p>

                                    {filmInfoItems}
                                </div>
                            </>
                        }
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(FilmDetail);