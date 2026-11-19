import commonStyle from "../../assets/css/common.module.css";
import {NavLink} from "react-router-dom";
import style from '../FilmDetail/FilmDetail.module.css';

 const About = () => {
    return (
        <div className={commonStyle.container}>
            <NavLink to='/' className={style.backBtn}>Back to main</NavLink>

            <div>
                <p>API by Brian Fritz.</p>
                <p> All content licensed under CC BY-NC 4.0.</p>
                <p>This site is not endorsed by or affiliated with IMDb.com.</p>
            </div>
        </div>
    );
}

export default About;