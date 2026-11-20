import commonStyle from "../../assets/css/common.module.css";
import {NavLink} from "react-router-dom";
import style from '../FilmDetail/FilmDetail.module.css';

 const Contacts = () => {
    return (
        <div className={commonStyle.container}>
            <NavLink to='/' className={style.backBtn}>Back to main</NavLink>

            <div>
                <h1>Contacts</h1>
            </div>
        </div>
    );
}

export default Contacts;