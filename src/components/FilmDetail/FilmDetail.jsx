import style from './FilmDetail.module.css'
import React from "react";
import withRouter from "../../Hoks/withRouter";
import omdbAPI from "../../api/api";
import commonStyle from "../../assets/css/common.module.css";
import Preloader from "../Preloader/Preloader";


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
            return (
                <>
                    <p><b>{item[0]}:</b> {item[1]}</p>
                </>
            );
        });

        return (
            <div className={commonStyle.container}>
                {this.state.isLoading && <Preloader />}
                {!this.state.isLoading && (
                    <div className={style.filmDetail}>
                        {
                            <>
                                <img src={data.Poster} alt={data.Title} title={data.Title}/>

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